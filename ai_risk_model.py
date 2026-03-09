"""
AIR - AI替代风险评估模型

核心算法：基于多维度加权的替代风险评分和时间预测
"""

from dataclasses import dataclass, field
from typing import Dict, List, Optional
from datetime import datetime, timedelta
import math


@dataclass
class TaskAssessment:
    """单个任务评估"""
    任务名称: str
    重复性: int  # 0-100, 越高越容易被替代
    规则明确度: int  # 0-100
    创造性要求: int  # 0-100, 越低越容易被替代
    人际交互: int  # 0-100, 越低越容易被替代
    物理操作: int  # 0-100, 越低越容易被替代
    工时占比: float  # 该任务占总工作时间的比例


@dataclass
class SkillRequirement:
    """技能要求"""
    技能名称: str
    重要程度: int  # 1-5
    AI能力现状: int  # 0-100, AI当前能达到的水平


@dataclass
class RiskAssessmentResult:
    """风险评估结果"""
    总体风险评分: float  # 0-100
    风险等级: str  # 低/中/高/极高
    预计替代年份: int
    置信区间: tuple  # (最早, 最晚)
    关键脆弱点: List[str]
    建议行动: List[str]
    详细分析: Dict = field(default_factory=dict)


class AIAutomationRiskModel:
    """AI自动化风险评估模型"""

    # AI能力进化基准数据（模拟）
    AI_CAPABILITY_BENCHMARKS = {
        "编程": {"当前": 75, "年增长率": 12, "上限": 95},
        "写作": {"当前": 85, "年增长率": 8, "上限": 98},
        "数据分析": {"当前": 70, "年增长率": 15, "上限": 95},
        "设计": {"当前": 60, "年增长率": 18, "上限": 90},
        "客户服务": {"当前": 80, "年增长率": 10, "上限": 95},
        "翻译": {"当前": 90, "年增长率": 3, "上限": 98},
        "研究分析": {"当前": 65, "年增长率": 14, "上限": 92},
        "项目管理": {"当前": 50, "年增长率": 12, "上限": 85},
        "教学": {"当前": 55, "年增长率": 10, "上限": 80},
        "销售": {"当前": 45, "年增长率": 15, "上限": 75},
    }

    def __init__(self, current_year: int = 2025):
        self.current_year = current_year

    def assess_task_automatability(self, task: TaskAssessment) -> float:
        """
        评估单个任务的可自动化程度

        分数越高，越容易被AI替代
        """
        # 自动化友好因素（越高越容易被替代）
        automation_friendly = (
            task.重复性 * 0.30 +
            task.规则明确度 * 0.25
        )

        # 自动化抵抗因素（越高越难被替代，需要反向计算）
        automation_resistant = (
            (100 - task.创造性要求) * 0.20 +
            (100 - task.人际交互) * 0.15 +
            (100 - task.物理操作) * 0.10
        )

        return automation_friendly + automation_resistant

    def calculate_skill_vulnerability(self, skills: List[SkillRequirement]) -> Dict[str, float]:
        """
        计算技能的脆弱性评分
        """
        vulnerabilities = {}
        for skill in skills:
            benchmark = self.AI_CAPABILITY_BENCHMARKS.get(skill.技能名称, {"当前": 50, "年增长率": 10, "上限": 90})
            current_ai = benchmark["当前"]
            growth_rate = benchmark["年增长率"]
            ceiling = benchmark["上限"]

            # 脆弱性 = AI当前水平 × 重要程度权重
            vulnerability = (current_ai / 100) * (skill.重要程度 / 5)
            vulnerabilities[skill.技能名称] = {
                "评分": vulnerability,
                "AI当前水平": current_ai,
                "年增长率": growth_rate,
                "预期上限": ceiling
            }
        return vulnerabilities

    def predict_automation_timeline(self, current_score: float, growth_rate: float,
                                   threshold: float = 90) -> tuple:
        """
        预测自动化时间线

        返回: (预计年份, 最早年份, 最晚年份)
        """
        if current_score >= threshold:
            return (self.current_year, self.current_year, self.current_year)

        # 使用对数增长模型（AI能力提升会逐渐放缓）
        remaining = threshold - current_score
        # 基础年份计算（线性）
        base_years = remaining / growth_rate
        # 考虑放缓系数（越接近上限，增长越慢）
        slowdown_factor = 1 + math.log(threshold / (threshold - remaining + 1)) * 0.3
        estimated_years = base_years * slowdown_factor

        predicted_year = self.current_year + math.ceil(estimated_years)
        earliest = self.current_year + math.ceil(estimated_years * 0.7)
        latest = self.current_year + math.ceil(estimated_years * 1.5)

        return (predicted_year, earliest, latest)

    def generate_improvement_suggestions(self, vulnerabilities: Dict,
                                       task_scores: Dict[str, float]) -> List[str]:
        """
        生成改进建议
        """
        suggestions = []

        # 基于脆弱性生成建议
        high_risk_skills = [k for k, v in vulnerabilities.items() if v["评分"] > 0.6]
        if high_risk_skills:
            suggestions.append(
                f"⚠️ 高风险技能检测: {', '.join(high_risk_skills)}。"
                f"建议：将技能组合向AI难以替代的方向转移（如复杂决策、创意整合）。"
            )

        # 基于任务分析生成建议
        high_automatable_tasks = [k for k, v in task_scores.items() if v > 70]
        if high_automatable_tasks:
            suggestions.append(
                f"🤖 高自动化任务: {', '.join(high_automatable_tasks)}。"
                f"建议：主动学习使用AI工具提升效率，成为'AI+人类'的超级个体。"
            )

        # 通用建议
        suggestions.extend([
            "💡 培养跨领域整合能力 - AI擅长单一任务，人类擅长跨界整合",
            "🎯 加强人际沟通和领导力 - 这些是最难被自动化的能力",
            "🔄 建立个人品牌和信任关系 - AI无法替代人际关系网络",
            "📚 持续关注AI工具发展 - 主动学习和使用最新的AI工具"
        ])

        return suggestions

    def full_assessment(self,
                       tasks: List[TaskAssessment],
                       skills: List[SkillRequirement],
                       job_title: str = "") -> RiskAssessmentResult:
        """
        完整的AI替代风险评估
        """
        # 1. 任务层面的自动化评分（加权平均）
        task_scores = {}
        total_risk = 0
        for task in tasks:
            score = self.assess_task_automatability(task)
            task_scores[task.任务名称] = score
            total_risk += score * task.工时占比

        # 2. 技能层面的脆弱性分析
        skill_vulnerabilities = self.calculate_skill_vulnerability(skills)
        avg_skill_risk = sum(v["评分"] for v in skill_vulnerabilities.values()) / len(skills) if skills else 0.5

        # 3. 综合评分（70%任务风险 + 30%技能风险）
        overall_score = total_risk * 0.7 + avg_skill_risk * 100 * 0.3

        # 4. 确定风险等级
        if overall_score >= 80:
            level = "极高"
        elif overall_score >= 60:
            level = "高"
        elif overall_score >= 40:
            level = "中"
        else:
            level = "低"

        # 5. 预测时间线（基于平均AI增长率）
        avg_growth_rate = sum(
            self.AI_CAPABILITY_BENCHMARKS.get(s.技能名称, {}).get("年增长率", 10)
            for s in skills
        ) / len(skills) if skills else 12

        predicted, earliest, latest = self.predict_automation_timeline(overall_score, avg_growth_rate)

        # 6. 识别关键脆弱点
        vulnerabilities = []
        for task_name, score in task_scores.items():
            if score > 70:
                vulnerabilities.append(f"{task_name} (自动化风险: {score:.0f}%)")
        for skill_name, data in skill_vulnerabilities.items():
            if data["评分"] > 0.6:
                vulnerabilities.append(f"{skill_name} (AI能力: {data['AI当前水平']}%)")

        # 7. 生成建议
        suggestions = self.generate_improvement_suggestions(skill_vulnerabilities, task_scores)

        return RiskAssessmentResult(
            总体风险评分=round(overall_score, 1),
            风险等级=level,
            预计替代年份=predicted,
            置信区间=(earliest, latest),
            关键脆弱点=vulnerabilities,
            建议行动=suggestions,
            详细分析={
                "任务评分": task_scores,
                "技能分析": skill_vulnerabilities,
                "职位名称": job_title
            }
        )


# 使用示例
if __name__ == "__main__":
    model = AIAutomationRiskModel()

    # 示例：程序员工作评估
    tasks = [
        TaskAssessment("代码编写", 重复性=70, 规则明确度=80, 创造性要求=40,
                      人际交互=10, 物理操作=0, 工时占比=0.40),
        TaskAssessment("代码审查", 重复性=50, 规则明确度=70, 创造性要求=30,
                      人际交互=30, 物理操作=0, 工时占比=0.15),
        TaskAssessment("需求分析", 重复性=30, 规则明确度=40, 创造性要求=60,
                      人际交互=70, 物理操作=0, 工时占比=0.20),
        TaskAssessment("系统设计", 重复性=20, 规则明确度=30, 创造性要求=80,
                      人际交互=50, 物理操作=0, 工时占比=0.15),
        TaskAssessment("会议沟通", 重复性=40, 规则明确度=20, 创造性要求=40,
                      人际交互=90, 物理操作=0, 工时占比=0.10),
    ]

    skills = [
        SkillRequirement("编程", 重要程度=5, AI能力现状=75),
        SkillRequirement("数据分析", 重要程度=3, AI能力现状=70),
        SkillRequirement("项目管理", 重要程度=2, AI能力现状=50),
    ]

    result = model.full_assessment(tasks, skills, "软件工程师")

    print(f"\n{'='*50}")
    print(f"职位: 软件工程师")
    print(f"{'='*50}")
    print(f"总体风险评分: {result.总体风险评分}/100")
    print(f"风险等级: {result.风险等级}")
    print(f"预计AI替代年份: {result.预计替代年份} (置信区间: {result.置信区间[0]}-{result.置信区间[1]})")
    print(f"\n关键脆弱点:")
    for v in result.关键脆弱点:
        print(f"  • {v}")
    print(f"\n建议行动:")
    for s in result.建议行动[:5]:
        print(f"  {s}")
