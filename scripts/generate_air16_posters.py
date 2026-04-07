#!/usr/bin/env python3
from __future__ import annotations

import math
import shutil
import subprocess
import tempfile
from dataclasses import dataclass
from pathlib import Path
from textwrap import dedent
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "character-posters"
WIDTH = 1600
HEIGHT = 1600

CARD_BG = "#FFFFFF"
PAGE_BG = "#EEF3F8"
CARD_BORDER = "#D4DEE8"
SHADOW = "#DCE6F1"
OUTLINE = "#425466"
OUTLINE_SOFT = "#8091A5"
SKIN = "#F2C7A7"
SKIN_DARK = "#D79B73"
WHITE = "#FFFFFF"


@dataclass(frozen=True)
class Spec:
    code: str
    title_en: str
    title_zh: str
    scene: str
    accent: str
    accent2: str
    panel: str
    hair: str
    outfit: str
    outfit2: str


SPECS = [
    Spec("EOFP", "Glass Cannon", "玻璃大炮", "office", "#A7D9FF", "#FFB29E", "#F7FAFF", "#8D8C8A", "#D9D6CE", "#BFCBDA"),
    Spec("EOFH", "Human Bridge", "人脉桥梁", "network", "#FFCC79", "#8DD8FF", "#203C4A", "#6A4630", "#8A8578", "#FFFFFF"),
    Spec("EORP", "Final Stamp", "终审印章", "inspector", "#FF7970", "#C4D5E9", "#F6F8FB", "#45515D", "#6E8592", "#E7EDF5"),
    Spec("ESFP", "Taste Maker", "品味定义者", "designer", "#FF8ECC", "#7BCBFF", "#EFF4FB", "#645244", "#F7F2E7", "#55748D"),
    Spec("TOFP", "Bare Hand", "赤手行者", "pipes", "#88D8C0", "#A7B9D8", "#F6FAFC", "#554B42", "#6D8A91", "#D6E2E9"),
    Spec("EORH", "License Wall", "执照之墙", "licenses", "#CFA16C", "#9AB9D9", "#FBFCFE", "#4F4A46", "#22384D", "#F2EFEA"),
    Spec("ESFH", "Living Brand", "活体品牌", "spotlight", "#FF7BC4", "#8B73FF", "#241D43", "#49434A", "#8F8A94", "#F2D4E7"),
    Spec("ESRP", "Pressure Alchemist", "高压炼金师", "engineer", "#FF9B58", "#9ED6FF", "#FAFCFE", "#5C4B40", "#F28B4B", "#496A8D"),
    Spec("TOFH", "Signature Touch", "签名手艺人", "stylist", "#FFB080", "#F7D59B", "#FCFCFB", "#5C453B", "#9A6A46", "#E8CBA9"),
    Spec("TORP", "Steady Hand", "不颤之手", "precision", "#96D7FF", "#B4F1F3", "#FCFEFF", "#5B5F64", "#C2ECF4", "#E9F6FB"),
    Spec("TSFP", "Soul Craftsman", "灵魂匠人", "artisan", "#F6B06A", "#FFD38D", "#FFFDF8", "#5C4738", "#6F8D52", "#8A5A36"),
    Spec("ESRH", "Oracle", "神谕者", "oracle", "#FFD173", "#B4D8FF", "#203044", "#E7ECEF", "#2B3F56", "#20364A"),
    Spec("TORH", "Healing Hand", "疗愈之手", "doctor", "#7EDCCF", "#FFD993", "#FBFEFF", "#544E49", "#F6FFFF", "#6D93B7"),
    Spec("TSFH", "Irreplaceable", "不可替代者", "performer", "#FF77C7", "#8C8DFF", "#FFF8FB", "#544641", "#7E4DDB", "#FF83B2"),
    Spec("TSRP", "Last Call", "终极裁决者", "responder", "#FF8748", "#FFD06E", "#FBFBFC", "#3C424B", "#2D3746", "#F6893C"),
    Spec("TSRH", "Iron Fortress", "铁壁堡垒", "fortress", "#77D6C8", "#A8C6FF", "#FCFEFF", "#57504B", "#2E414F", "#E8EFF7"),
]


def fmt(value: float) -> str:
    return f"{value:.1f}"


def attrs(**kwargs: str) -> str:
    return " ".join(f'{key.replace("_", "-")}="{escape(str(value))}"' for key, value in kwargs.items())


def rect(x: float, y: float, w: float, h: float, **kwargs: str) -> str:
    return f'<rect x="{fmt(x)}" y="{fmt(y)}" width="{fmt(w)}" height="{fmt(h)}" {attrs(**kwargs)}/>'


def circle(cx: float, cy: float, r: float, **kwargs: str) -> str:
    return f'<circle cx="{fmt(cx)}" cy="{fmt(cy)}" r="{fmt(r)}" {attrs(**kwargs)}/>'


def ellipse(cx: float, cy: float, rx: float, ry: float, **kwargs: str) -> str:
    return f'<ellipse cx="{fmt(cx)}" cy="{fmt(cy)}" rx="{fmt(rx)}" ry="{fmt(ry)}" {attrs(**kwargs)}/>'


def line(x1: float, y1: float, x2: float, y2: float, **kwargs: str) -> str:
    return f'<line x1="{fmt(x1)}" y1="{fmt(y1)}" x2="{fmt(x2)}" y2="{fmt(y2)}" {attrs(**kwargs)}/>'


def polygon(points: list[tuple[float, float]], **kwargs: str) -> str:
    point_str = " ".join(f"{fmt(x)},{fmt(y)}" for x, y in points)
    return f'<polygon points="{point_str}" {attrs(**kwargs)}/>'


def path(d: str, **kwargs: str) -> str:
    return f'<path d="{escape(d)}" {attrs(**kwargs)}/>'


def group(content: str, **kwargs: str) -> str:
    return f'<g {attrs(**kwargs)}>{content}</g>'


def shadowed_card(accent: str, accent2: str, panel_fill: str = CARD_BG) -> str:
    return "".join([
        rect(56, 66, 1488, 1488, rx="58", fill=SHADOW, fill_opacity="0.55"),
        rect(40, 40, 1520, 1520, rx="58", fill=panel_fill, stroke=CARD_BORDER, stroke_width="4"),
        circle(1290, 250, 300, fill=accent, fill_opacity="0.10"),
        ellipse(235, 1180, 285, 360, fill=accent2, fill_opacity="0.08"),
    ])


def glow(cx: float, cy: float, r: float, color: str, opacity: float = 0.18) -> str:
    return circle(cx, cy, r, fill=color, fill_opacity=f"{opacity:.2f}")


def bubble_icon(cx: float, cy: float, r: float, fill: str, symbol: str = "heart") -> str:
    parts = [circle(cx, cy, r, fill=fill, fill_opacity="0.92", stroke=OUTLINE, stroke_width="5")]
    if symbol == "heart":
        parts.append(path(
            f"M {cx-12:.1f} {cy-2:.1f} C {cx-18:.1f} {cy-14:.1f} {cx-2:.1f} {cy-20:.1f} {cx:.1f} {cy-8:.1f} "
            f"C {cx+2:.1f} {cy-20:.1f} {cx+18:.1f} {cy-14:.1f} {cx+12:.1f} {cy-2:.1f} "
            f"C {cx+6:.1f} {cy+10:.1f} {cx:.1f} {cy+14:.1f} {cx:.1f} {cy+18:.1f} "
            f"C {cx:.1f} {cy+14:.1f} {cx-6:.1f} {cy+10:.1f} {cx-12:.1f} {cy-2:.1f} Z",
            fill=WHITE,
            stroke="none",
        ))
    else:
        parts.append(rect(cx - 13, cy - 13, 26, 26, rx="6", fill=WHITE, stroke="none"))
    return "".join(parts)


def person_arms(pose: str, sleeve: str) -> str:
    poses = {
        "open": [(-110, 180, -250, 240), (110, 180, 250, 240)],
        "bridge": [(-105, 180, -220, 225), (105, 180, 220, 225)],
        "stamp": [(-105, 180, -125, 60), (105, 180, 220, 200)],
        "point": [(-105, 180, -92, 62), (105, 180, 190, 205)],
        "hold": [(-105, 180, -130, 250), (105, 180, 130, 250)],
        "phone": [(-105, 180, -55, 95), (105, 180, 165, 210)],
        "guide": [(-105, 180, -200, 160), (105, 180, 250, 135)],
        "welcome": [(-105, 180, -200, 220), (105, 180, 200, 220)],
    }
    parts: list[str] = []
    for sx, sy, ex, ey in poses[pose]:
        cx = (sx + ex) / 2
        cy = min(sy, ey) - 28
        parts.append(path(
            f"M {sx} {sy} Q {cx:.1f} {cy:.1f} {ex} {ey}",
            fill="none",
            stroke=sleeve,
            stroke_width="44",
            stroke_linecap="round",
        ))
        parts.append(circle(ex, ey, 24, fill=SKIN, stroke=OUTLINE, stroke_width="5"))
    return "".join(parts)


def head(hair: str, style: str = "short", hat: str | None = None, glasses: bool = False, beard: bool = False) -> str:
    parts = [
        ellipse(0, 0, 80, 92, fill=SKIN, stroke=OUTLINE, stroke_width="6"),
        ellipse(-12, -20, 42, 18, fill="#FFFFFF", fill_opacity="0.14", stroke="none"),
    ]
    if style == "bob":
        parts.append(path("M -82 -4 Q -86 -88 0 -96 Q 84 -88 82 -2 L 62 70 Q 0 28 -62 70 Z", fill=hair, stroke=OUTLINE, stroke_width="6"))
    elif style == "long":
        parts.append(path("M -82 -12 Q -70 -92 0 -98 Q 72 -92 82 -12 L 70 150 Q 0 70 -70 150 Z", fill=hair, stroke=OUTLINE, stroke_width="6"))
    elif style == "messy":
        parts.append(path("M -82 -2 Q -64 -98 0 -96 Q 62 -102 82 -4 L 66 -56 L 26 -92 L -18 -84 L -52 -62 Z", fill=hair, stroke=OUTLINE, stroke_width="6"))
    elif style == "older":
        parts.append(path("M -80 2 Q -70 -92 0 -94 Q 70 -90 80 0 L 56 -40 Q 0 -70 -56 -40 Z", fill=hair, stroke=OUTLINE, stroke_width="6"))
        parts.append(path("M -46 22 Q -54 84 0 102 Q 54 84 46 22", fill=hair, stroke=OUTLINE, stroke_width="6"))
    else:
        parts.append(path("M -80 0 Q -64 -92 0 -96 Q 64 -92 80 0 L 56 -46 Q 0 -72 -56 -46 Z", fill=hair, stroke=OUTLINE, stroke_width="6"))
    if hat == "beret":
        parts.append(ellipse(10, -86, 84, 34, fill="#8F7D69", stroke=OUTLINE, stroke_width="6"))
        parts.append(circle(48, -94, 12, fill="#8F7D69", stroke=OUTLINE, stroke_width="5"))
    if hat == "cap":
        parts.append(path("M -78 -34 Q -18 -98 70 -58 L 80 -22 Q 10 -38 -86 -2 Z", fill="#667887", stroke=OUTLINE, stroke_width="6"))
        parts.append(path("M 10 -28 Q 60 -24 98 -2 Q 68 12 16 4 Z", fill="#536674", stroke=OUTLINE, stroke_width="6"))
    if hat == "helmet":
        parts.append(path("M -88 -10 Q -72 -112 0 -116 Q 72 -112 88 -10 L 66 -10 Q 0 -42 -66 -10 Z", fill="#F6A54C", stroke=OUTLINE, stroke_width="6"))
        parts.append(rect(-88, -10, 176, 30, rx="14", fill="#FFD08A", stroke=OUTLINE, stroke_width="6"))
    if glasses:
        parts.append(circle(-28, 6, 22, fill="none", stroke=OUTLINE, stroke_width="6"))
        parts.append(circle(28, 6, 22, fill="none", stroke=OUTLINE, stroke_width="6"))
        parts.append(line(-6, 6, 6, 6, stroke=OUTLINE, stroke_width="5"))
    if beard:
        parts.append(path("M -42 28 Q -38 92 0 106 Q 38 92 42 28", fill=hair, stroke=OUTLINE, stroke_width="6"))
    return "".join(parts)


def torso(outfit: str, outfit2: str, kind: str = "jacket", lanyard: bool = False) -> str:
    parts: list[str] = []
    if kind == "labcoat":
        parts.append(path("M -168 110 L 168 110 L 236 620 L -236 620 Z", fill=outfit, stroke=OUTLINE, stroke_width="6"))
        parts.append(path("M -56 112 L 0 270 L 56 112 L 34 520 Q 0 590 -34 520 Z", fill=WHITE, stroke=OUTLINE, stroke_width="6"))
    elif kind == "vest":
        parts.append(path("M -168 110 L 168 110 L 226 600 L -226 600 Z", fill=outfit2, stroke=OUTLINE, stroke_width="6"))
        parts.append(path("M -136 128 L 136 128 L 178 550 L -178 550 Z", fill=outfit, stroke=OUTLINE, stroke_width="6"))
        parts.append(line(0, 128, 0, 548, stroke="#F6F0E8", stroke_width="16"))
    elif kind == "scrubs":
        parts.append(path("M -160 110 L 160 110 L 210 590 L -210 590 Z", fill=outfit, stroke=OUTLINE, stroke_width="6"))
        parts.append(path("M -40 112 L 0 200 L 40 112", fill="none", stroke=outfit2, stroke_width="18", stroke_linecap="round"))
    elif kind == "apron":
        parts.append(path("M -152 110 L 152 110 L 202 590 L -202 590 Z", fill=outfit, stroke=OUTLINE, stroke_width="6"))
        parts.append(rect(-88, 180, 176, 300, rx="34", fill=outfit2, stroke=OUTLINE, stroke_width="6"))
    elif kind == "dress":
        parts.append(path("M -150 110 L 150 110 L 226 594 L -226 594 Z", fill=outfit, stroke=OUTLINE, stroke_width="6"))
        parts.append(path("M -38 112 L 0 206 L 38 112", fill="none", stroke=outfit2, stroke_width="18", stroke_linecap="round"))
    else:
        parts.append(path("M -164 110 L 164 110 L 228 602 L -228 602 Z", fill=outfit, stroke=OUTLINE, stroke_width="6"))
        parts.append(path("M -58 110 L 0 240 L 58 110 L 32 502 Q 0 562 -32 502 Z", fill=outfit2, stroke=OUTLINE, stroke_width="6"))
    parts.append(rect(-26, 82, 52, 36, rx="14", fill=SKIN, stroke=OUTLINE, stroke_width="5"))
    if lanyard:
        parts.append(path("M -32 120 Q -12 196 0 276 Q 12 196 32 120", fill="none", stroke="#E15759", stroke_width="10", stroke_linecap="round"))
        parts.append(rect(-34, 260, 68, 96, rx="18", fill="#F3F7FA", stroke=OUTLINE, stroke_width="6"))
        parts.append(rect(-18, 280, 36, 10, rx="5", fill="#B3C7DA", stroke="none"))
    return "".join(parts)


def standing_person(
    cx: float,
    cy: float,
    scale: float,
    hair: str,
    outfit: str,
    outfit2: str,
    pose: str = "open",
    hair_style: str = "short",
    kind: str = "jacket",
    hat: str | None = None,
    glasses: bool = False,
    beard: bool = False,
    lanyard: bool = False,
    chest_glow_color: str | None = None,
) -> str:
    parts = [
        ellipse(0, 640, 170, 42, fill="#B7C5D4", fill_opacity="0.35", stroke="none"),
        person_arms(pose, outfit),
        torso(outfit, outfit2, kind=kind, lanyard=lanyard),
    ]
    if chest_glow_color:
        parts.append(glow(0, 248, 88, chest_glow_color, 0.32))
        parts.append(path(
            "M -18 226 C -28 202 -2 188 0 210 C 2 188 28 202 18 226 C 6 250 0 252 0 268 C 0 252 -6 250 -18 226 Z",
            fill=WHITE,
            stroke="none",
        ))
    parts.append(head(hair, style=hair_style, hat=hat, glasses=glasses, beard=beard))
    return group("".join(parts), transform=f"translate({fmt(cx)} {fmt(cy)}) scale({scale})")


def desk_scene_person(spec: Spec) -> str:
    parts = [
        rect(132, 1040, 520, 182, rx="8", fill="#E2EDF5", stroke=OUTLINE, stroke_width="6"),
        polygon([(132, 1222), (652, 1222), (590, 1316), (68, 1316)], fill="#BFCFDD", stroke=OUTLINE, stroke_width="6"),
        rect(116, 1316, 28, 160, rx="8", fill="#5C6975", stroke=OUTLINE, stroke_width="6"),
        rect(522, 1274, 28, 204, rx="8", fill="#5C6975", stroke=OUTLINE, stroke_width="6"),
        rect(408, 924, 190, 132, rx="12", fill="#DCE6F1", stroke=OUTLINE, stroke_width="6"),
        polygon([(396, 1056), (610, 1056), (632, 1092), (384, 1092)], fill="#B6C5D5", stroke=OUTLINE, stroke_width="6"),
        rect(164, 1038, 158, 36, rx="8", fill="#77B8FF", stroke=OUTLINE, stroke_width="6"),
        rect(188, 1000, 142, 40, rx="8", fill="#FFFFFF", stroke=OUTLINE, stroke_width="6"),
        rect(204, 962, 128, 40, rx="8", fill="#E6F0D9", stroke=OUTLINE, stroke_width="6"),
        path("M 278 686 Q 366 648 426 716 L 430 958 L 238 958 Z", fill=spec.outfit, stroke=OUTLINE, stroke_width="6"),
        rect(314, 650, 36, 34, rx="12", fill=SKIN, stroke=OUTLINE, stroke_width="5"),
        ellipse(334, 536, 84, 98, fill=SKIN, stroke=OUTLINE, stroke_width="6"),
        path("M 256 534 Q 248 418 330 410 Q 430 410 414 536 L 394 500 Q 350 446 286 498 Z", fill=spec.hair, stroke=OUTLINE, stroke_width="6"),
        path("M 240 762 Q 216 684 178 632", fill="none", stroke=spec.outfit, stroke_width="48", stroke_linecap="round"),
        circle(174, 626, 24, fill=SKIN, stroke=OUTLINE, stroke_width="5"),
        path("M 420 764 Q 482 752 528 778", fill="none", stroke=spec.outfit, stroke_width="48", stroke_linecap="round"),
        circle(536, 782, 22, fill=SKIN, stroke=OUTLINE, stroke_width="5"),
        path("M 328 620 Q 274 636 238 694", fill="none", stroke=SKIN_DARK, stroke_width="12", stroke_linecap="round"),
    ]
    return "".join(parts)


def document_icon(x: float, y: float, w: float, h: float, accent: str, glow_color: str | None = None) -> str:
    parts = []
    if glow_color:
        parts.append(glow(x + w / 2, y + h / 2, max(w, h) * 0.65, glow_color, 0.22))
    parts.extend([
        polygon([(x, y), (x + w - 22, y), (x + w, y + 22), (x + w, y + h), (x, y + h)], fill=WHITE, stroke=OUTLINE_SOFT, stroke_width="5"),
        polygon([(x + w - 22, y), (x + w - 22, y + 22), (x + w, y + 22)], fill=accent, stroke=OUTLINE_SOFT, stroke_width="5"),
        rect(x + 20, y + 24, w - 48, 10, rx="5", fill=accent, stroke="none"),
        rect(x + 20, y + 48, w - 38, 8, rx="4", fill="#D7E2ED", stroke="none"),
        rect(x + 20, y + 68, w - 54, 8, rx="4", fill="#D7E2ED", stroke="none"),
    ])
    return "".join(parts)


def network_nodes(spec: Spec) -> str:
    coords = [(300, 292), (496, 222), (682, 196), (914, 182), (1108, 208), (1282, 274), (1196, 432), (986, 456), (744, 470), (534, 430), (312, 398)]
    lines = [(0, 3), (1, 3), (2, 4), (3, 5), (0, 8), (1, 8), (2, 7), (4, 7), (5, 6), (8, 9), (9, 10), (8, 10), (3, 8), (4, 8)]
    parts: list[str] = [rect(164, 122, 1272, 776, rx="40", fill=spec.panel, stroke="none")]
    for a, b in lines:
        x1, y1 = coords[a]
        x2, y2 = coords[b]
        parts.append(line(x1, y1, x2, y2, stroke=spec.accent2, stroke_width="6", stroke_opacity="0.72"))
    for idx, (x, y) in enumerate(coords):
        fill = "#F0BE75" if idx in {3, 8} else "#7CA3C7"
        parts.append(circle(x, y, 36, fill=fill, stroke=WHITE, stroke_width="6"))
        parts.append(ellipse(x, y - 8, 15, 18, fill="#5C453B" if idx in {3, 8} else "#8D684E", stroke="none"))
        parts.append(path(f"M {x-22} {y+28} Q {x} {y-4} {x+22} {y+28}", fill="#E7D7CA", stroke="none"))
    return "".join(parts)


def certificate_frame(x: float, y: float, w: float, h: float, accent: str) -> str:
    return "".join([
        rect(x, y, w, h, rx="16", fill="#F7F2E8", stroke="#8A704E", stroke_width="6"),
        rect(x + 18, y + 18, w - 36, h - 36, rx="10", fill=WHITE, stroke="#D4C0A0", stroke_width="4"),
        rect(x + 36, y + 36, w - 72, 10, rx="5", fill=accent, stroke="none"),
        rect(x + 36, y + 58, w - 92, 8, rx="4", fill="#D5DEE7", stroke="none"),
        rect(x + 36, y + 80, w - 108, 8, rx="4", fill="#D5DEE7", stroke="none"),
        circle(x + w - 54, y + h - 44, 16, fill="#E5C56B", stroke="#9B7B2B", stroke_width="5"),
    ])


def robot(x: float, y: float, scale: float = 1.0) -> str:
    parts = [
        ellipse(0, 0, 74, 88, fill="#D8E4EE", stroke=OUTLINE, stroke_width="6"),
        rect(-28, 84, 56, 32, rx="12", fill="#D8E4EE", stroke=OUTLINE, stroke_width="6"),
        path("M -122 118 L 122 118 L 162 512 L -162 512 Z", fill="#D8E4EE", stroke=OUTLINE, stroke_width="6"),
        line(-76, 148, -138, 260, stroke="#C0D0DB", stroke_width="28", stroke_linecap="round"),
        line(76, 148, 138, 260, stroke="#C0D0DB", stroke_width="28", stroke_linecap="round"),
        line(-56, 520, -70, 676, stroke="#C0D0DB", stroke_width="28", stroke_linecap="round"),
        line(56, 520, 70, 676, stroke="#C0D0DB", stroke_width="28", stroke_linecap="round"),
        circle(-18, 8, 8, fill="#9AB5C7", stroke="none"),
        circle(18, 8, 8, fill="#9AB5C7", stroke="none"),
        line(-18, 38, 18, 38, stroke="#9AB5C7", stroke_width="6", stroke_linecap="round"),
    ]
    return group("".join(parts), transform=f"translate({fmt(x)} {fmt(y)}) scale({scale})")


def wrench_icon(x: float, y: float, scale: float = 1.0, color: str = "#8897A7") -> str:
    parts = [
        path("M -18 -36 Q -2 -54 18 -40 L 0 -16 L 22 68 L 2 82 L -22 -4 L -44 -18 Z", fill=color, stroke=OUTLINE, stroke_width="5"),
        circle(4, 82, 18, fill="none", stroke=OUTLINE, stroke_width="5"),
    ]
    return group("".join(parts), transform=f"translate({fmt(x)} {fmt(y)}) scale({scale})")


def scissors_icon(x: float, y: float, scale: float = 1.0) -> str:
    parts = [
        circle(-16, 18, 18, fill="none", stroke=OUTLINE, stroke_width="5"),
        circle(16, 18, 18, fill="none", stroke=OUTLINE, stroke_width="5"),
        line(-4, 4, 56, -66, stroke=OUTLINE, stroke_width="5"),
        line(4, 4, 56, 74, stroke=OUTLINE, stroke_width="5"),
    ]
    return group("".join(parts), transform=f"translate({fmt(x)} {fmt(y)}) scale({scale})")


def color_wheel(cx: float, cy: float, r: float) -> str:
    colors = ["#FF6B6B", "#FFB84D", "#FFE66D", "#6BD17C", "#4DCEF5", "#7395FF", "#C17BFF", "#FF7EC3"]
    parts: list[str] = []
    for idx, color in enumerate(colors):
        a1 = math.radians(idx * 45 - 90)
        a2 = math.radians((idx + 1) * 45 - 90)
        p1 = (cx + math.cos(a1) * r, cy + math.sin(a1) * r)
        p2 = (cx + math.cos(a2) * r, cy + math.sin(a2) * r)
        parts.append(path(
            f"M {cx:.1f} {cy:.1f} L {p1[0]:.1f} {p1[1]:.1f} A {r:.1f} {r:.1f} 0 0 1 {p2[0]:.1f} {p2[1]:.1f} Z",
            fill=color,
            stroke="none",
        ))
    parts.append(circle(cx, cy, r, fill="none", stroke=OUTLINE, stroke_width="6"))
    parts.append(circle(cx, cy, r * 0.44, fill=WHITE, stroke="none"))
    return "".join(parts)


def swatch_fan(x: float, y: float) -> str:
    colors = ["#7236B3", "#9B46CF", "#D55DD0", "#FF7EB8"]
    parts = []
    for idx, color in enumerate(colors):
        angle = -26 + idx * 14
        parts.append(rect(x + idx * 24, y, 36, 132, rx="10", fill=color, stroke=OUTLINE, stroke_width="5", transform=f"rotate({angle} {fmt(x+18)} {fmt(y+120)})"))
    return "".join(parts)


def app_grid(x: float, y: float) -> str:
    parts = []
    for row in range(5):
        for col in range(5):
            rx = x + col * 112
            ry = y + row * 112
            parts.append(rect(rx, ry, 88, 88, rx="18", fill="#F1F6FB", stroke="#D6E0EA", stroke_width="4"))
            parts.append(rect(rx + 20, ry + 20, 48, 10, rx="5", fill="#D0E0F0", stroke="none"))
    return "".join(parts)


def gauge(x: float, y: float, accent: str) -> str:
    parts = [
        circle(x, y, 52, fill=WHITE, stroke=OUTLINE, stroke_width="6"),
        path(f"M {x-34} {y+12} A 36 36 0 0 1 {x+34} {y+12}", fill="none", stroke=accent, stroke_width="8"),
        line(x, y, x + 28, y - 12, stroke=OUTLINE, stroke_width="6"),
        rect(x - 28, y + 56, 56, 22, rx="10", fill="#FFFFFF", stroke="none"),
    ]
    return "".join(parts)


def building(x: float, y: float, w: float, h: float) -> str:
    parts = [
        rect(x, y, w, h, rx="8", fill="#C9D6E2", stroke=OUTLINE, stroke_width="6"),
    ]
    for row in range(3):
        for col in range(3):
            parts.append(rect(x + 22 + col * 42, y + 26 + row * 56, 22, 28, rx="4", fill="#EEF5FB", stroke="none"))
    parts.append(path(f"M {x+w-12} {y+16} L {x+w+34} {y-44}", fill="none", stroke=OUTLINE, stroke_width="6"))
    parts.append(path(f"M {x-10} {y+h-26} L {x-44} {y+h+20}", fill="none", stroke=OUTLINE, stroke_width="6"))
    return "".join(parts)


def bridge(x: float, y: float, scale: float = 1.0) -> str:
    parts = [
        line(-120, 80, 120, 80, stroke="#90A3B6", stroke_width="10"),
        line(-80, 0, -80, 80, stroke="#90A3B6", stroke_width="10"),
        line(80, 0, 80, 80, stroke="#90A3B6", stroke_width="10"),
        path("M -100 80 Q 0 -18 100 80", fill="none", stroke="#90A3B6", stroke_width="8"),
        line(-30, 46, -30, 80, stroke="#90A3B6", stroke_width="6"),
        line(30, 46, 30, 80, stroke="#90A3B6", stroke_width="6"),
    ]
    return group("".join(parts), transform=f"translate({fmt(x)} {fmt(y)}) scale({scale})")


def ecg_line(y: float, color: str) -> str:
    return path(
        f"M 120 {y} L 340 {y} L 418 {y-10} L 492 {y-110} L 566 {y+94} L 650 {y-180} L 734 {y+14} L 840 {y} L 1100 {y}",
        fill="none",
        stroke=color,
        stroke_width="10",
        stroke_linecap="round",
        stroke_linejoin="round",
    )


def shield_stack(cx: float, cy: float, accent: str, accent2: str) -> str:
    parts = [
        path(f"M {cx-180} {cy-70} Q {cx} {cy-220} {cx+180} {cy-70} L {cx+150} {cy+190} Q {cx} {cy+330} {cx-150} {cy+190} Z", fill="#E7EEF7", stroke=OUTLINE, stroke_width="8"),
        path(f"M {cx-112} {cy-28} Q {cx} {cy-122} {cx+112} {cy-28} L {cx+88} {cy+136} Q {cx} {cy+228} {cx-88} {cy+136} Z", fill=WHITE, stroke=OUTLINE_SOFT, stroke_width="6"),
    ]
    mini = [(-250, -50), (250, -30), (-290, 140), (292, 154), (0, -200)]
    for ox, oy in mini:
        x = cx + ox
        y = cy + oy
        parts.append(path(f"M {x-34} {y-14} Q {x} {y-44} {x+34} {y-14} L {x+24} {y+34} Q {x} {y+62} {x-24} {y+34} Z", fill=accent if oy < 0 else accent2, stroke=OUTLINE, stroke_width="5"))
    return "".join(parts)


def stage_spotlight(spec: Spec) -> str:
    return "".join([
        rect(160, 136, 1280, 1328, rx="40", fill=spec.panel, stroke="none"),
        polygon([(640, 136), (958, 136), (1180, 1200), (416, 1200)], fill="#FFB4E8", fill_opacity="0.24", stroke="none"),
        ellipse(800, 1202, 290, 86, fill="#F9A7E6", fill_opacity="0.40", stroke="none"),
    ])


def flames(x: float, y: float, scale: float = 1.0) -> str:
    parts = [
        path("M 0 220 C 40 150 10 94 44 24 C 90 70 108 126 98 180 C 140 120 154 62 206 -12 C 258 72 262 150 242 226 Z", fill="#FF944D", stroke="none"),
        path("M 52 220 C 80 174 70 132 96 84 C 122 118 126 154 116 196 C 146 162 154 124 186 76 C 214 130 212 172 194 220 Z", fill="#FFD06E", stroke="none"),
    ]
    return group("".join(parts), transform=f"translate({fmt(x)} {fmt(y)}) scale({scale})")


def bowl(x: float, y: float) -> str:
    parts = [
        path(f"M {x-88} {y} Q {x} {y+68} {x+88} {y} L {x+72} {y+58} Q {x} {y+92} {x-72} {y+58} Z", fill="#D7A87E", stroke=OUTLINE, stroke_width="6"),
        path(f"M {x-26} {y-24} Q {x-6} {y-84} {x+14} {y-34}", fill="none", stroke="#E9C37D", stroke_width="8", stroke_linecap="round"),
        path(f"M {x+18} {y-16} Q {x+34} {y-86} {x+54} {y-38}", fill="none", stroke="#E9C37D", stroke_width="8", stroke_linecap="round"),
    ]
    return "".join(parts)


def oracle_desk() -> str:
    return "".join([
        rect(172, 1010, 1256, 270, rx="20", fill="#36495C", stroke=OUTLINE, stroke_width="6"),
        rect(220, 1060, 1180, 54, rx="16", fill="#445B73", stroke="none"),
        rect(200, 178, 1200, 250, rx="26", fill="#2C4158", stroke="none"),
        rect(210, 470, 340, 320, rx="26", fill="#2C4158", stroke="none"),
        rect(1050, 470, 340, 320, rx="26", fill="#2C4158", stroke="none"),
    ])


def scene_eofp(spec: Spec) -> str:
    parts = [
        shadowed_card(spec.accent, spec.accent2),
        desk_scene_person(spec),
        document_icon(196, 246, 108, 140, "#B6D1F2"),
        document_icon(1034, 232, 108, 140, "#B6D1F2", spec.accent),
        document_icon(1178, 316, 128, 160, "#A2D7FF", spec.accent),
        document_icon(972, 404, 132, 176, "#C0D9F6", spec.accent),
    ]
    for x, y, color in [(184, 154, "#F6D05E"), (258, 130, "#56B7FF"), (350, 144, "#7CD992"), (1088, 132, "#8D7FFF"), (1182, 158, "#F0B36A"), (1256, 126, "#60D0E0")]:
        parts.append(rect(x, y, 18, 28, rx="4", fill=color, stroke="none", transform=f"rotate(24 {fmt(x+9)} {fmt(y+14)})"))
    return "".join(parts)


def scene_eofh(spec: Spec) -> str:
    parts = [
        shadowed_card(spec.accent, spec.accent2),
        network_nodes(spec),
        standing_person(804, 586, 0.96, spec.hair, "#8F867B", WHITE, pose="bridge", hair_style="messy", chest_glow_color=spec.accent),
        path("M 506 1194 L 442 1268", fill="none", stroke=OUTLINE, stroke_width="6"),
        path("M 1032 1194 L 1100 1268", fill="none", stroke=OUTLINE, stroke_width="6"),
    ]
    return "".join(parts)


def scene_eorp(spec: Spec) -> str:
    parts = [shadowed_card(spec.accent, spec.accent2)]
    for row in range(2):
        for col in range(3):
            parts.append(certificate_frame(808 + col * 186, 208 + row * 220, 160, 180, spec.accent2))
    parts.extend([
        line(148, 1128, 1450, 1128, stroke="#E04D44", stroke_width="14"),
        path("M 1000 312 L 1080 218", fill="none", stroke=OUTLINE, stroke_width="6"),
        path("M 1208 392 L 1260 306", fill="none", stroke=OUTLINE, stroke_width="6"),
        standing_person(818, 586, 0.92, spec.hair, spec.outfit, spec.outfit2, pose="stamp", hair_style="short", hat="cap", kind="jacket", lanyard=True),
        rect(610, 292, 86, 120, rx="18", fill="#7A4A2A", stroke=OUTLINE, stroke_width="6"),
        rect(598, 396, 112, 40, rx="16", fill="#BE8156", stroke=OUTLINE, stroke_width="6"),
    ])
    for idx in range(3):
        parts.append(rect(956 + idx * 28, 610 + idx * 12, 98, 18, rx="8", fill="#EAEFF5", stroke=OUTLINE_SOFT, stroke_width="4", transform=f"rotate(18 {fmt(1000 + idx * 28)} {fmt(620 + idx * 12)})"))
    return "".join(parts)


def scene_esfp(spec: Spec) -> str:
    parts = [
        shadowed_card(spec.accent, spec.accent2),
        app_grid(912, 148),
        standing_person(966, 612, 0.92, spec.hair, spec.outfit, spec.outfit2, pose="point", hair_style="bob", kind="jacket", hat="beret"),
        color_wheel(1278, 760, 150),
        swatch_fan(1006, 236),
        line(792, 762, 716, 986, stroke="#C18D5A", stroke_width="18", stroke_linecap="round"),
        line(840, 812, 804, 1038, stroke="#8D5E36", stroke_width="18", stroke_linecap="round"),
        circle(716, 986, 16, fill="#2C475E", stroke=OUTLINE, stroke_width="4"),
        circle(804, 1038, 16, fill="#F08A65", stroke=OUTLINE, stroke_width="4"),
    ]
    return "".join(parts)


def scene_tofp(spec: Spec) -> str:
    parts = [shadowed_card(spec.accent, spec.accent2)]
    for y in [498, 686, 874]:
        parts.append(rect(180, y, 438, 92, rx="30", fill="#D8E4ED", stroke=OUTLINE, stroke_width="6"))
        parts.append(rect(140, y + 26, 78, 40, rx="10", fill="#AFBEC9", stroke=OUTLINE, stroke_width="6"))
    parts.extend([
        line(420, 300, 420, 1128, stroke="#7A8B99", stroke_width="16"),
        rect(512, 1008, 72, 210, rx="18", fill="#91A3B2", stroke=OUTLINE, stroke_width="6"),
        robot(1108, 756, 0.68),
        path("M 180 530 Q 314 466 454 560", fill="none", stroke=SKIN, stroke_width="62", stroke_linecap="round"),
        circle(454, 560, 28, fill=SKIN, stroke=OUTLINE, stroke_width="5"),
        path("M 238 676 Q 392 628 504 764", fill="none", stroke=SKIN_DARK, stroke_width="62", stroke_linecap="round"),
        circle(504, 764, 28, fill=SKIN_DARK, stroke=OUTLINE, stroke_width="5"),
        wrench_icon(258, 280, 0.92, "#A0A6AC"),
    ])
    return "".join(parts)


def scene_eorh(spec: Spec) -> str:
    parts = [shadowed_card(spec.accent, spec.accent2)]
    for row in range(3):
        for col in range(3):
            parts.append(certificate_frame(216 + col * 280, 136 + row * 222, 236, 166, spec.accent))
    parts.extend([
        standing_person(806, 710, 0.95, "#2E2E31", spec.outfit, WHITE, pose="hold", hair_style="short", kind="jacket", glasses=True),
        rect(706, 812, 208, 276, rx="20", fill="#FFFDF7", stroke=OUTLINE, stroke_width="6"),
        rect(742, 854, 136, 16, rx="8", fill=spec.accent, stroke="none"),
        rect(742, 890, 112, 10, rx="5", fill="#D8E2EC", stroke="none"),
        rect(742, 920, 128, 10, rx="5", fill="#D8E2EC", stroke="none"),
        circle(810, 1002, 28, fill="#E0B34E", stroke="#9B7C2A", stroke_width="6"),
    ])
    return "".join(parts)


def scene_esfh(spec: Spec) -> str:
    parts = [
        shadowed_card(spec.accent, spec.accent2, panel_fill="#FBFBFD"),
        stage_spotlight(spec),
        standing_person(836, 680, 0.92, "#4E4650", "#70727C", "#9A9AA2", pose="phone", hair_style="short", kind="dress"),
        rect(854, 612, 58, 94, rx="16", fill="#222B42", stroke=WHITE, stroke_width="6"),
    ]
    for x, y, size in [(586, 650, 42), (1126, 572, 38), (1044, 758, 46), (654, 874, 42), (1182, 886, 42), (924, 928, 38)]:
        parts.append(bubble_icon(x, y, size, "#F26FB6", "heart"))
    for x in [504, 1200]:
        parts.append(standing_person(x, 760, 0.45, "#8C80A3", "#D7C9EB", "#C7B8E8", pose="welcome", hair_style="short", kind="dress"))
    return "".join(parts)


def scene_esrp(spec: Spec) -> str:
    parts = [
        shadowed_card(spec.accent, spec.accent2),
        building(994, 486, 230, 346),
        bridge(1348, 612, 0.74),
        gauge(1364, 940, "#E8753D"),
        standing_person(1022, 648, 0.88, "#4A4038", "#F28B4B", "#576C7B", pose="hold", hair_style="short", kind="vest", hat="helmet"),
    ]
    for idx in range(3):
        parts.append(rect(1064 + idx * 22, 772 - idx * 16, 82, 12, rx="6", fill=WHITE, stroke=OUTLINE_SOFT, stroke_width="4", transform=f"rotate(-12 {fmt(1104+idx*22)} {fmt(778-idx*16)})"))
    parts.append(path("M 1018 404 L 956 318", fill="none", stroke=OUTLINE, stroke_width="6"))
    parts.append(path("M 1252 414 L 1296 336", fill="none", stroke=OUTLINE, stroke_width="6"))
    return "".join(parts)


def scene_tofh(spec: Spec) -> str:
    parts = [
        shadowed_card(spec.accent, spec.accent2),
        standing_person(744, 680, 0.88, spec.hair, spec.outfit, spec.outfit2, pose="hold", hair_style="bob", kind="apron"),
        scissors_icon(958, 726, 0.88),
        circle(252, 804, 140, fill="#D9C6A6", fill_opacity="0.55", stroke="none"),
        path("M 256 906 Q 340 748 250 566 Q 340 520 414 598", fill="#D7B18A", fill_opacity="0.42", stroke="none"),
        circle(286, 1210, 32, fill="none", stroke=OUTLINE_SOFT, stroke_width="8"),
        wrench_icon(376, 1212, 0.82, "#9AA7B3"),
        glow(430, 748, 86, "#FFE1A6", 0.30),
    ]
    return "".join(parts)


def scene_torp(spec: Spec) -> str:
    parts = [
        shadowed_card(spec.accent, spec.accent2),
        ecg_line(596, "#C6DCE9"),
        ecg_line(930, "#B5D6E5"),
        path("M 170 1134 Q 416 890 690 768", fill="none", stroke="#E6F4FB", stroke_width="170", stroke_linecap="round"),
        path("M 280 1070 Q 512 842 770 744", fill="none", stroke="#A7DCE9", stroke_width="150", stroke_linecap="round"),
        path("M 780 756 Q 860 736 930 782", fill="none", stroke="#7FBCCF", stroke_width="24", stroke_linecap="round"),
        circle(938, 784, 48, fill="#F1E1BB", stroke=OUTLINE, stroke_width="6"),
    ]
    return "".join(parts)


def scene_tsfp(spec: Spec) -> str:
    parts = [
        shadowed_card(spec.accent, spec.accent2),
        standing_person(830, 742, 0.90, spec.hair, spec.outfit, spec.outfit2, pose="hold", hair_style="short", kind="apron"),
        bowl(918, 924),
        glow(1038, 722, 64, "#FFB36B", 0.28),
        path("M 1066 708 C 1040 680 1058 644 1090 652 C 1114 624 1154 638 1144 676 C 1134 702 1104 720 1090 744 C 1084 726 1076 720 1066 708 Z", fill="#FF8A7B", stroke="none"),
    ]
    return "".join(parts)


def scene_esrh(spec: Spec) -> str:
    parts = [
        shadowed_card(spec.accent, spec.accent2, panel_fill="#FAFBFD"),
        oracle_desk(),
        glow(1000, 216, 86, "#FFEB9F", 0.36),
        circle(998, 216, 54, fill="none", stroke="#FFEB9F", stroke_width="8", stroke_opacity="0.8"),
        standing_person(1020, 650, 0.90, "#E6E5E0", spec.outfit, "#1A2838", pose="hold", hair_style="older", kind="jacket", glasses=True, beard=True),
        circle(330, 1140, 82, fill="#E4EDF7", stroke=OUTLINE, stroke_width="6"),
        line(280, 1128, 380, 1128, stroke="#7A8FA4", stroke_width="6"),
        path("M 282 1128 L 256 1178 L 308 1178 Z", fill="#D5E1ED", stroke=OUTLINE, stroke_width="4"),
        path("M 378 1128 L 352 1178 L 404 1178 Z", fill="#D5E1ED", stroke=OUTLINE, stroke_width="4"),
        line(1326, 1116, 1326, 1240, stroke="#D6C289", stroke_width="8"),
        line(1260, 1242, 1392, 1242, stroke="#D6C289", stroke_width="8"),
    ]
    return "".join(parts)


def scene_torh(spec: Spec) -> str:
    parts = [
        shadowed_card(spec.accent, spec.accent2),
        rect(176, 268, 268, 180, rx="26", fill="#F1F7FC", stroke="#D7E4EF", stroke_width="5"),
        rect(488, 268, 268, 180, rx="26", fill="#F1F7FC", stroke="#D7E4EF", stroke_width="5"),
        rect(800, 268, 268, 180, rx="26", fill="#F1F7FC", stroke="#D7E4EF", stroke_width="5"),
        standing_person(706, 720, 0.92, spec.hair, spec.outfit, spec.outfit2, pose="open", hair_style="short", kind="labcoat"),
        line(272, 354, 348, 354, stroke="#F38A76", stroke_width="12"),
        path("M 348 354 L 380 322 L 420 388 L 462 286 L 498 354 L 554 354", fill="none", stroke="#F38A76", stroke_width="10", stroke_linecap="round", stroke_linejoin="round"),
        line(584, 356, 672, 356, stroke="#8EB4D6", stroke_width="10"),
        path("M 1142 1108 Q 1246 1054 1380 1116", fill="none", stroke=SKIN, stroke_width="56", stroke_linecap="round"),
        circle(1378, 1116, 26, fill=SKIN, stroke=OUTLINE, stroke_width="5"),
        path("M 228 1182 Q 352 1118 506 1168", fill="none", stroke=SKIN_DARK, stroke_width="56", stroke_linecap="round"),
        circle(226, 1182, 26, fill=SKIN_DARK, stroke=OUTLINE, stroke_width="5"),
    ]
    return "".join(parts)


def scene_tsfh(spec: Spec) -> str:
    parts = [
        shadowed_card(spec.accent, spec.accent2),
        rect(180, 138, 1240, 1284, rx="40", fill="#FFF6FA", stroke="none"),
        polygon([(188, 138), (842, 138), (614, 1422), (188, 1422)], fill="#FFBE64", fill_opacity="0.32", stroke="none"),
        polygon([(628, 138), (1416, 138), (1416, 1422), (866, 1422)], fill="#B98CFF", fill_opacity="0.16", stroke="none"),
        standing_person(814, 672, 0.88, spec.hair, spec.outfit, spec.outfit2, pose="guide", hair_style="messy", kind="dress"),
        path("M 660 892 Q 760 676 910 614 Q 1006 572 1092 652 Q 964 744 948 958 Q 798 1010 660 892 Z", fill="#FF77C7", fill_opacity="0.68", stroke="none"),
        standing_person(1124, 816, 0.44, "#B6B4C4", "#D7D6E4", "#C6C4D8", pose="welcome", hair_style="short", kind="dress"),
    ]
    return "".join(parts)


def scene_tsrp(spec: Spec) -> str:
    parts = [
        shadowed_card(spec.accent, spec.accent2),
        rect(172, 140, 586, 1280, rx="40", fill="#2C2F34", stroke="none"),
        rect(758, 140, 670, 1280, rx="40", fill="#FFFFFF", stroke="none"),
        flames(270, 826, 1.2),
        path("M 444 320 L 496 236", fill="none", stroke="#8A5D36", stroke_width="6"),
        path("M 320 252 L 262 146", fill="none", stroke="#8A5D36", stroke_width="6"),
        line(918, 824, 1384, 742, stroke="#0F1720", stroke_width="7"),
        line(924, 910, 1402, 910, stroke="#0F1720", stroke_width="7"),
        line(916, 996, 1364, 1084, stroke="#0F1720", stroke_width="7"),
        standing_person(848, 698, 0.88, spec.hair, spec.outfit, spec.outfit2, pose="guide", hair_style="short", kind="vest"),
    ]
    return "".join(parts)


def scene_tsrh(spec: Spec) -> str:
    parts = [
        shadowed_card(spec.accent, spec.accent2),
        shield_stack(1094, 884, spec.accent, spec.accent2),
        standing_person(1094, 742, 0.88, spec.hair, spec.outfit, WHITE, pose="hold", hair_style="short", kind="jacket"),
    ]
    return "".join(parts)


SCENES = {
    "office": scene_eofp,
    "network": scene_eofh,
    "inspector": scene_eorp,
    "designer": scene_esfp,
    "pipes": scene_tofp,
    "licenses": scene_eorh,
    "spotlight": scene_esfh,
    "engineer": scene_esrp,
    "stylist": scene_tofh,
    "precision": scene_torp,
    "artisan": scene_tsfp,
    "oracle": scene_esrh,
    "doctor": scene_torh,
    "performer": scene_tsfh,
    "responder": scene_tsrp,
    "fortress": scene_tsrh,
}


def render_svg(spec: Spec) -> str:
    body = SCENES[spec.scene](spec)
    return dedent(
        f"""
        <svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{HEIGHT}" viewBox="0 0 {WIDTH} {HEIGHT}">
          <rect x="0" y="0" width="{WIDTH}" height="{HEIGHT}" fill="{PAGE_BG}"/>
          {body}
        </svg>
        """
    ).strip() + "\n"


def write_docs() -> None:
    philosophy = dedent(
        """
        # Signal Illustration

        This series treats work as a set of instantly legible human scenes. Every image should feel like a meticulously crafted product illustration: light-filled, direct, clean, and deliberate. The composition explains the role through a human figure, a few supporting symbols, and a carefully tuned emotional cue, all arranged with painstaking attention so the image reads in one glance without becoming flat or generic.

        Space stays open and breathable. White and near-white fields do most of the structural work, while muted props and controlled accent colors carry the meaning. The result should look masterfully refined, with every line weight, rounded corner, glow, and shadow placed as though it had been revised over countless hours by someone operating at the top of their field.

        Figures are simplified but not childish. Faces can remain minimal or absent, yet posture, hair, gesture, and surrounding objects must make the scene emotionally specific. The craftsmanship should feel patient and exacting: crisp outlines, restrained gradients, clear silhouette hierarchy, and iconography that supports the story without cluttering it.

        The goal is not poster drama but lucid visual explanation. Each illustration should feel polished enough for a premium product site, onboarding flow, or report cover. Everything must appear painstakingly composed, deeply considered, and quietly impressive at both thumbnail and full-size scale.
        """
    ).strip() + "\n"
    readme_lines = [
        "# AIR 16 Reference-Style Illustrations",
        "",
        "Square PNG illustration set generated from `/Users/tao.shen/jobless/marketing/character-prompts.md` in a style aligned to the user-provided reference image.",
        "",
    ]
    for spec in SPECS:
        readme_lines.append(f"- `{spec.code}.png`: {spec.title_zh} / {spec.title_en}")
    readme_lines.append("")
    readme_lines.append("This folder intentionally contains rendered PNG assets plus supporting markdown files only.")
    (OUT_DIR / "README.md").write_text("\n".join(readme_lines) + "\n", encoding="utf-8")
    (OUT_DIR / "visual-philosophy.md").write_text(philosophy, encoding="utf-8")


def render_all() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    shutil.rmtree(OUT_DIR / "svg", ignore_errors=True)
    for png in OUT_DIR.glob("*.png"):
        png.unlink()
    write_docs()
    with tempfile.TemporaryDirectory() as tmp_dir:
        tmp = Path(tmp_dir)
        for spec in SPECS:
            svg_path = tmp / f"{spec.code}.svg"
            png_path = OUT_DIR / f"{spec.code}.png"
            svg_path.write_text(render_svg(spec), encoding="utf-8")
            subprocess.run(["magick", str(svg_path), str(png_path)], check=True)


def main() -> None:
    render_all()


if __name__ == "__main__":
    main()
