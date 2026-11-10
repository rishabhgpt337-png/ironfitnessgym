/**
 * Generates the industrial placeholder photography used across the site.
 * Run with: npm run generate:images
 *
 * These are intentionally abstract, cinematic steel scenes. The owner can replace
 * any file in /public/images with a real photo of the same filename.
 */
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const OUT_DIR = "public/images";

function mulberry32(seed) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dust(rand, w, h, count = 90, opacity = 0.4) {
  let out = "";
  for (let i = 0; i < count; i += 1) {
    const x = rand() * w;
    const y = rand() * h;
    const r = rand() * 2.2 + 0.4;
    const o = rand() * opacity + 0.03;
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="#fff" opacity="${o.toFixed(2)}"/>`;
  }
  return out;
}

function baseDefs(w, h, glowX, glowY) {
  return `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#17171a"/>
      <stop offset="0.55" stop-color="#0e0e10"/>
      <stop offset="1" stop-color="#08080a"/>
    </linearGradient>
    <radialGradient id="glow" cx="${glowX}" cy="${glowY}" r="0.7">
      <stop offset="0" stop-color="#FF4D00" stop-opacity="0.42"/>
      <stop offset="0.3" stop-color="#FF4D00" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#FF4D00" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="cool" cx="0.2" cy="0.1" r="0.7">
      <stop offset="0" stop-color="#9da6b8" stop-opacity="0.14"/>
      <stop offset="1" stop-color="#9da6b8" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="steel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4a4a52"/>
      <stop offset="0.28" stop-color="#26262b"/>
      <stop offset="0.52" stop-color="#5a5a62"/>
      <stop offset="0.72" stop-color="#1d1d21"/>
      <stop offset="1" stop-color="#3a3a40"/>
    </linearGradient>
    <linearGradient id="steelDark" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2e2e34"/>
      <stop offset="1" stop-color="#141417"/>
    </linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1d1d21"/>
      <stop offset="0.35" stop-color="#131316"/>
      <stop offset="1" stop-color="#0a0a0c"/>
    </linearGradient>
    <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffd9c2" stop-opacity="0.2"/>
      <stop offset="0.55" stop-color="#ff8a4d" stop-opacity="0.07"/>
      <stop offset="1" stop-color="#ff4d00" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.44" r="0.78">
      <stop offset="0.4" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.82"/>
    </radialGradient>
    <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="${Math.max(18, w * 0.028)}"/>
    </filter>
    <filter id="softSmall" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="${Math.max(6, w * 0.008)}"/>
    </filter>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.55"/></feComponentTransfer>
    </filter>
    <pattern id="steelLines" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(115)">
      <rect width="1.2" height="22" fill="#ffffff" opacity="0.045"/>
    </pattern>
    <pattern id="mesh" width="96" height="96" patternUnits="userSpaceOnUse">
      <path d="M96 0H0V96" fill="none" stroke="#ffffff" stroke-opacity="0.045" stroke-width="1"/>
    </pattern>
  </defs>`;
}

function sceneFrame(w, h, glowX, glowY, seed) {
  const rand = mulberry32(seed);
  return `
    <rect width="${w}" height="${h}" fill="#0b0b0c"/>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <rect width="${w}" height="${h}" fill="url(#cool)"/>
    <ellipse cx="${w * glowX}" cy="${h * glowY}" rx="${w * 0.48}" ry="${h * 0.42}" fill="url(#glow)" filter="url(#soft)"/>
    <rect y="${h * 0.68}" width="${w}" height="${h * 0.32}" fill="url(#floor)"/>
    <line x1="0" y1="${h * 0.68}" x2="${w}" y2="${h * 0.68}" stroke="#ffffff" stroke-opacity="0.07" stroke-width="1.5"/>
    <rect width="${w}" height="${h}" fill="url(#mesh)" opacity="0.55"/>
    <rect width="${w}" height="${h}" fill="url(#steelLines)" opacity="0.75"/>
    ${dust(rand, w, h, 95, 0.32)}
  `;
}

function sceneFooter(w, h) {
  return `
    <rect width="${w}" height="${h}" fill="url(#vignette)"/>
    <rect filter="url(#grain)" width="${w}" height="${h}" opacity="0.09"/>
  `;
}

function wrapSvg(w, h, glowX, glowY, seed, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${baseDefs(w, h, glowX, glowY)}
    ${sceneFrame(w, h, glowX, glowY, seed)}
    ${content}
    ${sceneFooter(w, h)}
  </svg>`;
}

function barbell(w, h, opts = {}) {
  const {
    cx = w * 0.62,
    cy = h * 0.68,
    len = w * 0.62,
    plateScale = 1,
    rotation = 0,
    rim = "#FF4D00",
  } = opts;
  const barH = Math.max(7, h * 0.0085);
  const plateH = h * 0.2 * plateScale;
  const plateW = Math.max(12, w * 0.013 * plateScale);
  const plateHeights = [1, 0.92, 0.8];
  let plates = "";
  let rimLines = "";

  for (const side of [-1, 1]) {
    plateHeights.forEach((factor, index) => {
      const ph = plateH * factor;
      const px = side * (len * 0.27 + index * plateW * 1.9);
      plates += `<rect x="${px - plateW / 2}" y="${-ph / 2}" width="${plateW}" height="${ph}" rx="2" fill="url(#steelDark)" stroke="#5c5c64" stroke-opacity="0.45" stroke-width="1.4"/>`;
      if (index === plateHeights.length - 1) {
        rimLines += `<rect x="${px + side * (plateW / 2) - (side > 0 ? 2 : 0)}" y="${-ph / 2 + 3}" width="2" height="${ph - 6}" fill="${rim}" opacity="0.7"/>`;
      }
    });
  }

  const knurl = Array.from({ length: 22 })
    .map((_, i) => {
      const x = -len * 0.16 + i * (len * 0.32) / 21;
      return `<line x1="${x}" y1="${-barH / 2}" x2="${x}" y2="${barH / 2}" stroke="#0b0b0c" stroke-opacity="0.65" stroke-width="1"/>`;
    })
    .join("");

  return `
    <g transform="translate(${cx} ${cy}) rotate(${rotation})">
      <ellipse cx="0" cy="${h * 0.11}" rx="${len * 0.48}" ry="${h * 0.025}" fill="#000" opacity="0.5" filter="url(#softSmall)"/>
      <rect x="${-len / 2}" y="${-barH / 2}" width="${len}" height="${barH}" rx="3" fill="url(#steel)"/>
      <rect x="${-len * 0.2}" y="${-barH * 0.8}" width="${len * 0.4}" height="${barH * 1.6}" fill="#2b2b31" opacity="0.9"/>
      ${knurl}
      <rect x="${-len / 2}" y="${-barH * 1.7}" width="${len * 0.04}" height="${barH * 3.4}" rx="2" fill="url(#steel)"/>
      <rect x="${len / 2 - len * 0.04}" y="${-barH * 1.7}" width="${len * 0.04}" height="${barH * 3.4}" rx="2" fill="url(#steel)"/>
      ${plates}
      ${rimLines}
      <rect x="${-len / 2 + 4}" y="${-barH * 1.7}" width="3" height="${barH * 3.4}" fill="${rim}" opacity="0.5"/>
      <rect x="${len / 2 - 7}" y="${-barH * 1.7}" width="3" height="${barH * 3.4}" fill="${rim}" opacity="0.5"/>
    </g>
  `;
}

function kettlebell(w, h, opts = {}) {
  const { cx = w * 0.4, cy = h * 0.62, scale = 1 } = opts;
  const s = (Math.min(w, h) / 1000) * scale;
  return `
    <g transform="translate(${cx} ${cy}) scale(${s})">
      <ellipse cx="8" cy="210" rx="190" ry="26" fill="#000" opacity="0.55" filter="url(#softSmall)"/>
      <path d="M-58 -10 C-58 -130 58 -130 58 -10" fill="none" stroke="url(#steel)" stroke-width="30" stroke-linecap="round"/>
      <path d="M-74 22 C-74 120 -46 156 0 156 C46 156 74 120 74 22 C74 -22 44 -42 0 -42 C-44 -42 -74 -22 -74 22 Z" fill="url(#steelDark)" stroke="#5f5f68" stroke-opacity="0.5" stroke-width="2"/>
      <path d="M-60 -8 C-52 70 -40 118 -6 142" fill="none" stroke="#FF4D00" stroke-opacity="0.55" stroke-width="4" stroke-linecap="round"/>
      <circle cx="-18" cy="42" r="10" fill="#fff" opacity="0.05"/>
    </g>
  `;
}

function dumbbells(w, h, opts = {}) {
  const { x = w * 0.2, y = h * 0.36, count = 5 } = opts;
  const unit = w * 0.052;
  let out = "";

  for (let i = 0; i < count; i += 1) {
    const cx = x + i * unit * 1.22;
    const cy = y + i * h * 0.075;
    const s = 1 + i * 0.06;
    const plateW = 22 * s;
    const plateH = 96 * s;
    out += `<g transform="translate(${cx} ${cy}) rotate(${-8 + i * 1.5})">
      <rect x="${-unit * 0.52}" y="-8" width="${unit * 1.04}" height="16" rx="4" fill="url(#steel)"/>
      <rect x="${-unit * 0.56}" y="${-plateH / 2}" width="${plateW}" height="${plateH}" rx="5" fill="url(#steelDark)" stroke="#5c5c66" stroke-opacity="0.45"/>
      <rect x="${unit * 0.56 - plateW}" y="${-plateH / 2}" width="${plateW}" height="${plateH}" rx="5" fill="url(#steelDark)" stroke="#5c5c66" stroke-opacity="0.45"/>
      <rect x="${-unit * 0.56}" y="${-plateH / 2}" width="2.5" height="${plateH}" fill="#FF4D00" opacity="0.5"/>
      <rect x="${unit * 0.56 - 2.5}" y="${-plateH / 2}" width="2.5" height="${plateH}" fill="#FF4D00" opacity="0.4"/>
    </g>`;
  }

  return `
    <g>
      <rect x="${x - unit}" y="${y - h * 0.09}" width="${count * unit * 1.25 + unit}" height="9" fill="url(#steel)" opacity="0.8"/>
      <rect x="${x - unit}" y="${y + h * 0.24}" width="${count * unit * 1.25 + unit}" height="12" fill="url(#steelDark)" opacity="0.9"/>
      ${out}
    </g>
  `;
}

function rack(w, h, opts = {}) {
  const { cx = w * 0.5, top = h * 0.16, bottom = h * 0.74, width = w * 0.3 } = opts;
  const beam = 20;
  const holesLeft = Array.from({ length: 9 })
    .map((_, i) => `<circle cx="${cx - width / 2}" cy="${top + 50 + i * (bottom - top - 70) / 8}" r="5" fill="#0b0b0c"/>`)
    .join("");
  const holesRight = Array.from({ length: 9 })
    .map((_, i) => `<circle cx="${cx + width / 2}" cy="${top + 50 + i * (bottom - top - 70) / 8}" r="5" fill="#0b0b0c"/>`)
    .join("");
  return `
    <g>
      <rect x="${cx - width / 2 - beam / 2}" y="${top}" width="${beam}" height="${bottom - top}" fill="url(#steelDark)" stroke="#4a4a52" stroke-opacity="0.4"/>
      <rect x="${cx + width / 2 - beam / 2}" y="${top}" width="${beam}" height="${bottom - top}" fill="url(#steelDark)" stroke="#4a4a52" stroke-opacity="0.4"/>
      <rect x="${cx - width / 2}" y="${top - 18}" width="${width}" height="${beam}" fill="url(#steel)"/>
      <rect x="${cx - width / 2}" y="${top + (bottom - top) * 0.42}" width="${width}" height="10" fill="#26262b" opacity="0.8"/>
      ${holesLeft}
      ${holesRight}
      <rect x="${cx - width * 0.34}" y="${top + (bottom - top) * 0.42}" width="${beam}" height="38" fill="#FF4D00" opacity="0.55"/>
      <rect x="${cx + width * 0.34 - beam}" y="${top + (bottom - top) * 0.42}" width="${beam}" height="38" fill="#FF4D00" opacity="0.55"/>
      <line x1="${cx - width / 2}" y1="${bottom}" x2="${cx - width / 2 - w * 0.05}" y2="${bottom + h * 0.02}" stroke="#000" stroke-opacity="0.5" stroke-width="3"/>
    </g>
  `;
}

function platesStack(w, h) {
  const cx = w * 0.55;
  const cy = h * 0.55;
  const r = Math.min(w, h) * 0.22;
  const rand = mulberry32(42);
  let out = "";
  const discs = [
    { dx: -r * 0.6, dy: r * 0.1, rot: -8, r: r * 0.92 },
    { dx: 0, dy: 0, rot: 0, r: r },
    { dx: r * 0.62, dy: r * 0.14, rot: 7, r: r * 0.86 },
  ];

  for (const d of discs) {
    out += `<g transform="translate(${cx + d.dx} ${cy + d.dy}) rotate(${d.rot})">
      <ellipse cx="8" cy="${d.r * 0.92}" rx="${d.r * 0.95}" ry="${d.r * 0.12}" fill="#000" opacity="0.5" filter="url(#softSmall)"/>
      <circle r="${d.r}" fill="url(#steelDark)" stroke="#65656e" stroke-opacity="0.35" stroke-width="2"/>
      <circle r="${d.r * 0.78}" fill="none" stroke="#fff" stroke-opacity="0.08" stroke-width="2"/>
      <circle r="${d.r * 0.3}" fill="#0b0b0c"/>
      <circle r="${d.r * 0.3}" fill="none" stroke="#FF4D00" stroke-opacity="0.5" stroke-width="2"/>
      <path d="M ${-d.r * 0.92} ${-d.r * 0.2} A ${d.r * 0.92} ${d.r * 0.92} 0 0 1 ${-d.r * 0.35} ${-d.r * 0.86}" fill="none" stroke="#FF4D00" stroke-opacity="0.5" stroke-width="4"/>
    </g>`;
  }
  return out + dust(rand, w, h, 30, 0.2);
}

function ropes(w, h) {
  const x = w * 0.78;
  const top = h * 0.2;
  const paths = [0, 1, 2].map((i) => {
    const offset = i * 26;
    return `<path d="M${x - offset} ${top} C ${x - 160} ${h * 0.4}, ${x - 480} ${h * 0.66}, ${x - 760 + i * 90} ${h * 0.78}" fill="none" stroke="url(#steel)" stroke-width="${28 - i * 3}" stroke-linecap="round" opacity="${1 - i * 0.15}"/> 
    <path d="M${x - offset} ${top} C ${x - 160} ${h * 0.4}, ${x - 480} ${h * 0.66}, ${x - 760 + i * 90} ${h * 0.78}" fill="none" stroke="#FF4D00" stroke-width="3" stroke-linecap="round" opacity="0.35"/>`;
  });
  return `${paths.join("")}
    <rect x="${x - 34}" y="${top - h * 0.16}" width="40" height="${h * 0.2}" fill="url(#steelDark)" stroke="#4a4a52" stroke-opacity="0.5"/>
    <ellipse cx="${x - 500}" cy="${h * 0.8}" rx="${w * 0.3}" ry="16" fill="#000" opacity="0.4" filter="url(#softSmall)"/>`;
}

function cardio(w, h) {
  let out = "";
  const baseY = h * 0.76;
  for (let i = 0; i < 3; i += 1) {
    const x = w * (0.16 + i * 0.26);
    const s = 1 - i * 0.09;
    out += `<g transform="translate(${x} ${baseY}) scale(${s})">
      <rect x="0" y="-18" width="${w * 0.22}" height="20" rx="4" fill="url(#steelDark)" stroke="#4a4a52" stroke-opacity="0.4"/>
      <path d="M${w * 0.03} 0 L${w * 0.045} -${h * 0.2} L${w * 0.12} -${h * 0.2}" fill="none" stroke="url(#steel)" stroke-width="8"/>
      <rect x="${w * 0.1}" y="-${h * 0.27}" width="${w * 0.12}" height="${h * 0.075}" rx="3" fill="#101013" stroke="#4d4d55" stroke-opacity="0.6"/>
      <rect x="${w * 0.112}" y="-${h * 0.255}" width="${w * 0.09}" height="${h * 0.04}" rx="1" fill="#FF4D00" opacity="${0.18 + i * 0.05}"/>
      <path d="M${w * 0.05} -${h * 0.02} L${w * 0.19} -${h * 0.02}" stroke="#FF4D00" stroke-opacity="0.35" stroke-width="3"/>
    </g>`;
  }
  return `${out}
    <rect y="${h * 0.755}" width="${w}" height="${h * 0.02}" fill="#fff" opacity="0.03"/>
    <ellipse cx="${w * 0.45}" cy="${h * 0.78}" rx="${w * 0.35}" ry="20" fill="#FF4D00" opacity="0.05" filter="url(#softSmall)"/>`;
}

function lights(w, h) {
  const rand = mulberry32(7);
  const cones = [0.28, 0.5, 0.72]
    .map((p, i) => {
      const x = w * p;
      return `<g>
        <ellipse cx="${x}" cy="${h * 0.1}" rx="${w * 0.035}" ry="9" fill="#fff" opacity="0.85" filter="url(#softSmall)"/>
        <ellipse cx="${x}" cy="${h * 0.12}" rx="${w * 0.12}" ry="26" fill="#FF4D00" opacity="0.08" filter="url(#soft)"/>
        <path d="M${x - w * 0.012} ${h * 0.11} L${x - w * 0.16} ${h * 0.7} L${x + w * 0.16} ${h * 0.7} L${x + w * 0.012} ${h * 0.11} Z" fill="url(#beam)" opacity="${0.9 - i * 0.15}"/>
      </g>`;
    })
    .join("");
  return `${cones}
    ${dust(rand, w, h, 140, 0.5)}
    <ellipse cx="${w * 0.5}" cy="${h * 0.86}" rx="${w * 0.24}" ry="${h * 0.05}" fill="#d9d4c8" opacity="0.05" filter="url(#soft)"/>`;
}

function bench(w, h) {
  return `
    <g transform="translate(${w * 0.43} ${h * 0.58}) rotate(-3)">
      <rect x="-${w * 0.14}" y="0" width="${w * 0.28}" height="${h * 0.035}" rx="3" fill="url(#steelDark)" stroke="#4f4f57" stroke-opacity="0.4"/>
      <rect x="-${w * 0.11}" y="${h * 0.04}" width="16" height="${h * 0.15}" fill="url(#steel)"/>
      <rect x="${w * 0.09}" y="${h * 0.04}" width="16" height="${h * 0.15}" fill="url(#steel)"/>
      <rect x="-${w * 0.13}" y="${h * 0.19}" width="${w * 0.26}" height="10" fill="url(#steelDark)"/>
    </g>`;
}

function portrait(w, h) {
  const cx = w * 0.5;
  const headY = h * 0.34;
  const headR = w * 0.16;
  return `
    <circle cx="${cx}" cy="${h * 0.42}" r="${w * 0.31}" fill="#FF4D00" opacity="0.1" filter="url(#soft)"/>
    <circle cx="${cx}" cy="${h * 0.42}" r="${w * 0.3}" fill="none" stroke="#fff" stroke-opacity="0.06"/>
    <path d="M${cx - w * 0.46} ${h * 1.02} C ${cx - w * 0.46} ${h * 0.72}, ${cx - w * 0.26} ${h * 0.64}, ${cx - w * 0.12} ${h * 0.6} C ${cx - w * 0.18} ${h * 0.56}, ${cx - w * 0.2} ${h * 0.5}, ${cx - w * 0.2} ${h * 0.42} C ${cx - w * 0.2} ${h * 0.25}, ${cx - w * 0.08} ${h * 0.17}, ${cx} ${h * 0.17} C ${cx + w * 0.08} ${h * 0.17}, ${cx + w * 0.2} ${h * 0.25}, ${cx + w * 0.2} ${h * 0.42} C ${cx + w * 0.2} ${h * 0.5}, ${cx + w * 0.18} ${h * 0.56}, ${cx + w * 0.12} ${h * 0.6} C ${cx + w * 0.26} ${h * 0.64}, ${cx + w * 0.46} ${h * 0.72}, ${cx + w * 0.46} ${h * 1.02} Z" fill="#101013" stroke="#3e3e46" stroke-opacity="0.55" stroke-width="2"/>
    <path d="M${cx - w * 0.19} ${h * 0.46} C ${cx - w * 0.24} ${h * 0.72}, ${cx - w * 0.4} ${h * 0.78}, ${cx - w * 0.44} ${h * 0.97}" fill="none" stroke="#FF4D00" stroke-opacity="0.5" stroke-width="4"/>
    <path d="M${cx - w * 0.13} ${h * 0.28} C ${cx - w * 0.1} ${h * 0.21}, ${cx + w * 0.02} ${h * 0.18}, ${cx + w * 0.12} ${h * 0.24}" fill="none" stroke="#fff" stroke-opacity="0.14" stroke-width="3"/>
    <ellipse cx="${cx}" cy="${h * 0.43}" rx="${headR * 0.1}" ry="${headR * 1.3}" fill="#fff" opacity="0.025"/>
    <rect x="${w * 0.06}" y="${h * 0.1}" width="${w * 0.88}" height="${h * 0.8}" fill="none" stroke="#fff" stroke-opacity="0.05"/>
  `;
}

function ogOverlay(w, h) {
  return `
    <rect width="${w}" height="${h}" fill="#0b0b0c" opacity="0.55"/>
    <rect x="0" y="0" width="${w * 0.62}" height="${h}" fill="#0b0b0c" opacity="0.72"/>
    <rect x="80" y="86" width="56" height="4" fill="#FF4D00"/>
    <text x="156" y="98" font-family="Arial, Helvetica, sans-serif" font-size="20" letter-spacing="7" fill="#9A9CA3">MUMBAI · STRENGTH &amp; CONDITIONING</text>
    <text x="80" y="248" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="92" letter-spacing="-2" fill="#F5F5F0">IRON TEMPLE</text>
    <text x="80" y="344" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="92" letter-spacing="-2" fill="#F5F5F0">GYM</text>
    <text x="80" y="430" font-family="Arial, Helvetica, sans-serif" font-size="27" letter-spacing="1" fill="#FF4D00">FORGE YOUR STRONGEST SELF</text>
    <rect x="80" y="486" width="${w - 160}" height="1" fill="#2A2A2E"/>
    <text x="80" y="536" font-family="Arial, Helvetica, sans-serif" font-size="20" letter-spacing="3" fill="#9A9CA3">STRENGTH · FAT LOSS · PERSONAL TRAINING</text>
    <rect x="0" y="0" width="${w}" height="${h}" fill="url(#vignette)"/>
    <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.08"/>
  `;
}

const jobs = [
  {
    file: "hero.webp",
    width: 2000,
    height: 1250,
    seed: 11,
    glow: [0.68, 0.34],
    content: (w, h) =>
      `${rack(w, h, { cx: w * 0.73, top: h * 0.14, bottom: h * 0.72, width: w * 0.24 })}
       ${barbell(w, h, { cx: w * 0.64, cy: h * 0.68, len: w * 0.72, plateScale: 1.15, rotation: -2 })}
       <ellipse cx="${w * 0.7}" cy="${h * 0.22}" rx="${w * 0.18}" ry="${h * 0.04}" fill="#FF4D00" opacity="0.12" filter="url(#soft)"/>`,
  },
  {
    file: "about.webp",
    width: 1200,
    height: 900,
    seed: 23,
    glow: [0.6, 0.4],
    content: (w, h) => `${barbell(w, h, { cx: w * 0.5, cy: h * 0.7, len: w * 0.72, plateScale: 0.9, rotation: -3 })}${bench(w, h)}`,
  },
  {
    file: "inquiry.webp",
    width: 1200,
    height: 675,
    seed: 31,
    glow: [0.5, 0.4],
    content: (w, h) => `${barbell(w, h, { cx: w * 0.52, cy: h * 0.66, len: w * 0.66, plateScale: 0.8 })}`,
  },
  {
    file: "facility-1.webp",
    width: 1600,
    height: 1000,
    seed: 41,
    glow: [0.55, 0.3],
    content: (w, h) =>
      `${rack(w, h, { cx: w * 0.56, top: h * 0.13, bottom: h * 0.72, width: w * 0.3 })}${barbell(w, h, { cx: w * 0.56, cy: h * 0.46, len: w * 0.48, plateScale: 0.72 })}`,
  },
  {
    file: "facility-2.webp",
    width: 1600,
    height: 1000,
    seed: 43,
    glow: [0.28, 0.26],
    content: (w, h) => cardio(w, h),
  },
  {
    file: "facility-3.webp",
    width: 1600,
    height: 1000,
    seed: 47,
    glow: [0.62, 0.3],
    content: (w, h) => dumbbells(w, h, { x: w * 0.18, y: h * 0.32, count: 5 }),
  },
  {
    file: "facility-4.webp",
    width: 1600,
    height: 1000,
    seed: 53,
    glow: [0.75, 0.32],
    content: (w, h) => ropes(w, h),
  },
  {
    file: "facility-5.webp",
    width: 1600,
    height: 1000,
    seed: 59,
    glow: [0.55, 0.35],
    content: (w, h) => platesStack(w, h),
  },
  {
    file: "facility-6.webp",
    width: 1600,
    height: 1000,
    seed: 61,
    glow: [0.44, 0.34],
    content: (w, h) =>
      `${rack(w, h, { cx: w * 0.68, top: h * 0.2, bottom: h * 0.7, width: w * 0.2 })}${bench(w, h)}${dust(mulberry32(5), w, h, 40, 0.2)}`,
  },
  {
    file: "trainer-1.webp",
    width: 900,
    height: 1125,
    seed: 71,
    glow: [0.64, 0.3],
    content: (w, h) => portrait(w, h),
  },
  {
    file: "trainer-2.webp",
    width: 900,
    height: 1125,
    seed: 73,
    glow: [0.36, 0.34],
    content: (w, h) => `${portrait(w, h)}<ellipse cx="${w * 0.7}" cy="${h * 0.4}" rx="${w * 0.3}" ry="${h * 0.3}" fill="#FF4D00" opacity="0.05" filter="url(#soft)"/>`,
  },
  {
    file: "trainer-3.webp",
    width: 900,
    height: 1125,
    seed: 79,
    glow: [0.5, 0.26],
    content: (w, h) => `${portrait(w, h)}<rect x="0" y="${h * 0.82}" width="${w}" height="${h * 0.18}" fill="#0b0b0c" opacity="0.6"/>`,
  },
  {
    file: "gallery-1.webp",
    width: 1400,
    height: 1000,
    seed: 83,
    glow: [0.62, 0.36],
    content: (w, h) => barbell(w, h, { cx: w * 0.54, cy: h * 0.68, len: w * 0.72, rotation: -2 }),
  },
  {
    file: "gallery-2.webp",
    width: 1000,
    height: 1300,
    seed: 89,
    glow: [0.45, 0.32],
    content: (w, h) => `${kettlebell(w, h, { cx: w * 0.5, cy: h * 0.54, scale: 1.25 })}`,
  },
  {
    file: "gallery-3.webp",
    width: 1200,
    height: 1200,
    seed: 97,
    glow: [0.6, 0.3],
    content: (w, h) => dumbbells(w, h, { x: w * 0.14, y: h * 0.28, count: 5 }),
  },
  {
    file: "gallery-4.webp",
    width: 1200,
    height: 1200,
    seed: 101,
    glow: [0.56, 0.36],
    content: (w, h) => platesStack(w, h),
  },
  {
    file: "gallery-5.webp",
    width: 1400,
    height: 1000,
    seed: 103,
    glow: [0.76, 0.3],
    content: (w, h) => ropes(w, h),
  },
  {
    file: "gallery-6.webp",
    width: 1200,
    height: 1200,
    seed: 107,
    glow: [0.4, 0.3],
    content: (w, h) => rack(w, h, { cx: w * 0.52, top: h * 0.14, bottom: h * 0.74, width: w * 0.34 }),
  },
  {
    file: "gallery-7.webp",
    width: 1200,
    height: 1200,
    seed: 109,
    glow: [0.24, 0.28],
    content: (w, h) => cardio(w, h),
  },
  {
    file: "gallery-8.webp",
    width: 1000,
    height: 1300,
    seed: 113,
    glow: [0.5, 0.25],
    content: (w, h) => `${lights(w, h)}${kettlebell(w, h, { cx: w * 0.66, cy: h * 0.72, scale: 0.55 })}`,
  },
  {
    file: "og.webp",
    width: 1200,
    height: 630,
    seed: 127,
    glow: [0.7, 0.35],
    content: (w, h) => `${barbell(w, h, { cx: w * 0.7, cy: h * 0.74, len: w * 0.6, plateScale: 0.8 })}${ogOverlay(w, h)}`,
  },
];

await mkdir(OUT_DIR, { recursive: true });

for (const job of jobs) {
  const svg = wrapSvg(job.width, job.height, job.glow[0], job.glow[1], job.seed, job.content(job.width, job.height));
  await sharp(Buffer.from(svg))
    .webp({ quality: 80, effort: 4 })
    .toFile(`${OUT_DIR}/${job.file}`);
  console.log(`generated ${job.file} (${job.width}x${job.height})`);
}

console.log(`\nDone. ${jobs.length} images written to ${OUT_DIR}/`);
