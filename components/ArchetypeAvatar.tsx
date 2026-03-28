'use client';

import React from 'react';
import Peep from 'react-peeps';
import NotionAvatar from 'react-notion-avatar';
import {
  PEEPS_CONFIGS,
  NOTION_CONFIGS,
  getDiceBearUrl,
  type AvatarStyle,
  type DiceBearStyle,
} from '@/lib/air_character_designs';

interface ArchetypeAvatarProps {
  profileCode: string;
  style: AvatarStyle;
  size?: number;
  className?: string;
  /** Accent color for the border/glow. Falls back to white. */
  accentColor?: string;
}

/**
 * Renders an archetype character in the specified illustration style.
 *
 * - 'peeps': React component (Open Peeps half-body hand-drawn)
 * - 'notion': React component (Notion-style minimalist head)
 * - Others: DiceBear CDN image URL
 */
export default function ArchetypeAvatar({
  profileCode,
  style,
  size = 96,
  className = '',
  accentColor,
}: ArchetypeAvatarProps) {
  // ── Open Peeps ──
  if (style === 'peeps') {
    const config = PEEPS_CONFIGS[profileCode];
    if (!config) return null;
    return (
      <div className={className} style={{ width: size, height: size }}>
        <Peep
          body={config.body as never}
          face={config.face as never}
          hair={config.hair as never}
          accessory={(config.accessory || 'None') as never}
          facialHair={(config.facialHair || 'None') as never}
          strokeColor="#e8e4df"
          viewBox={{ x: '0', y: '0', width: '1024', height: '1024' }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  }

  // ── Notion Avatar ──
  if (style === 'notion') {
    const config = NOTION_CONFIGS[profileCode];
    if (!config) return null;
    return (
      <div className={className}>
        <NotionAvatar
          config={config}
          shape="circle"
          bgColor="transparent"
          style={{ width: size, height: size }}
        />
      </div>
    );
  }

  // ── DiceBear styles (CDN image) ──
  const url = getDiceBearUrl(profileCode, style as DiceBearStyle, 'svg', size * 2);
  return (
    <div className={className} style={{ width: size, height: size }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={profileCode}
        width={size}
        height={size}
        style={{ width: '100%', height: '100%' }}
        loading="eager"
      />
    </div>
  );
}
