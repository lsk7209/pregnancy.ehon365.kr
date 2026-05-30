import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { blogPosts } from "../src/lib/blog-posts";

const outDir = join(process.cwd(), "public", "blog-thumbnails");

const palettes: Record<string, { bg: string; accent: string; deep: string; soft: string }> = {
  "주차별 임신": { bg: "#fff7fb", accent: "#d6608a", deep: "#7a2f4a", soft: "#f8cddd" },
  "생활관리": { bg: "#f6fbf8", accent: "#4f9f78", deep: "#245841", soft: "#ccebdc" },
  "산전검사": { bg: "#f7f9ff", accent: "#5577c8", deep: "#273a78", soft: "#d8e1ff" },
  "정부지원": { bg: "#fffaf0", accent: "#d08a32", deep: "#734915", soft: "#f7dfb7" },
  "출산준비": { bg: "#f9f7ff", accent: "#8167c9", deep: "#463179", soft: "#ded5ff" },
  "태아보험": { bg: "#f7fbff", accent: "#3d8bb5", deep: "#1f526e", soft: "#c9e8f5" },
  FAQ: { bg: "#fff8f5", accent: "#c66a4a", deep: "#713722", soft: "#f2d1c4" },
};

const fallback = { bg: "#fffdfe", accent: "#d6608a", deep: "#2d2a32", soft: "#fce7f0" };

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function hash(value: string) {
  let total = 0;
  for (const char of value) total = (total * 31 + char.charCodeAt(0)) % 9973;
  return total;
}

function lines(value: string, max = 15) {
  const words = value.split(/\s+/);
  const result: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      result.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) result.push(line);
  return result.slice(0, 3);
}

function motif(category: string, accent: string, deep: string, seed: number) {
  if (category === "산전검사") {
    return `
      <rect x="780" y="165" width="230" height="300" rx="28" fill="#ffffff" opacity="0.82"/>
      <path d="M825 235h130M825 305h130M825 375h92" stroke="${deep}" stroke-width="16" stroke-linecap="round"/>
      <circle cx="790" cy="235" r="16" fill="${accent}"/><circle cx="790" cy="305" r="16" fill="${accent}"/><circle cx="790" cy="375" r="16" fill="${accent}"/>
    `;
  }
  if (category === "정부지원") {
    return `
      <rect x="760" y="210" width="285" height="180" rx="24" fill="#ffffff" opacity="0.84"/>
      <rect x="805" y="250" width="120" height="18" rx="9" fill="${accent}"/>
      <rect x="805" y="292" width="190" height="14" rx="7" fill="${deep}" opacity="0.7"/>
      <circle cx="${920 + (seed % 48)}" cy="390" r="72" fill="${accent}" opacity="0.26"/>
    `;
  }
  if (category === "태아보험") {
    return `
      <path d="M880 205c-72 0-130 55-130 124 0 111 130 178 130 178s130-67 130-178c0-69-58-124-130-124z" fill="#ffffff" opacity="0.82"/>
      <path d="M828 315h104M828 365h80" stroke="${deep}" stroke-width="15" stroke-linecap="round"/>
      <circle cx="958" cy="330" r="28" fill="${accent}" opacity="0.75"/>
    `;
  }
  if (category === "출산준비") {
    return `
      <rect x="760" y="250" width="285" height="210" rx="32" fill="#ffffff" opacity="0.82"/>
      <path d="M830 250c0-54 38-88 74-88s74 34 74 88" fill="none" stroke="${deep}" stroke-width="18" stroke-linecap="round"/>
      <path d="M815 325h185M815 382h142" stroke="${accent}" stroke-width="15" stroke-linecap="round"/>
    `;
  }
  if (category === "생활관리") {
    return `
      <circle cx="895" cy="315" r="135" fill="#ffffff" opacity="0.78"/>
      <path d="M805 340c55-96 143-98 202-12" fill="none" stroke="${deep}" stroke-width="18" stroke-linecap="round"/>
      <path d="M845 405c35 30 98 32 137-4" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round"/>
    `;
  }
  return `
    <rect x="770" y="195" width="255" height="280" rx="36" fill="#ffffff" opacity="0.8"/>
    <path d="M830 275h135M830 335h105M830 395h150" stroke="${deep}" stroke-width="16" stroke-linecap="round"/>
    <circle cx="970" cy="230" r="58" fill="${accent}" opacity="0.26"/>
  `;
}

function render(post: (typeof blogPosts)[number]) {
  const palette = palettes[post.category] ?? fallback;
  const seed = hash(post.slug);
  const titleLines = lines(post.title, 16);
  const keyword = post.mainKeyword.length > 18 ? `${post.mainKeyword.slice(0, 18)}...` : post.mainKeyword;
  const titleTspans = titleLines
    .map((line, index) => `<tspan x="88" dy="${index === 0 ? 0 : 64}">${escapeXml(line)}</tspan>`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-label="${escapeXml(post.title)} 대표 이미지">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${palette.bg}"/>
      <stop offset="1" stop-color="${palette.soft}"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="${palette.deep}" flood-opacity="0.14"/>
    </filter>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <circle cx="${1030 - (seed % 120)}" cy="${118 + (seed % 70)}" r="180" fill="#ffffff" opacity="0.38"/>
  <circle cx="${950 + (seed % 90)}" cy="${545 - (seed % 80)}" r="120" fill="${palette.accent}" opacity="0.13"/>
  <path d="M0 560C180 500 260 610 420 550C560 498 630 455 805 505C960 550 1030 610 1200 545V675H0Z" fill="#ffffff" opacity="0.46"/>
  <g filter="url(#shadow)">
    ${motif(post.category, palette.accent, palette.deep, seed)}
  </g>
  <rect x="72" y="86" width="610" height="500" rx="34" fill="#ffffff" opacity="0.86"/>
  <text x="88" y="145" font-family="Pretendard, Arial, sans-serif" font-size="30" font-weight="700" fill="${palette.accent}">${escapeXml(post.category)}</text>
  <text x="88" y="250" font-family="Pretendard, Arial, sans-serif" font-size="56" font-weight="800" fill="${palette.deep}" letter-spacing="-1">${titleTspans}</text>
  <rect x="88" y="475" width="${Math.min(460, 150 + keyword.length * 18)}" height="58" rx="29" fill="${palette.soft}"/>
  <text x="116" y="512" font-family="Pretendard, Arial, sans-serif" font-size="26" font-weight="700" fill="${palette.deep}">${escapeXml(keyword)}</text>
</svg>
`;
}

async function main() {
  mkdirSync(outDir, { recursive: true });

  for (const post of blogPosts) {
    const svg = render(post);
    writeFileSync(join(outDir, `${post.slug}.svg`), svg, "utf8");
    await sharp(Buffer.from(svg))
      .resize(1200, 675, { fit: "cover" })
      .webp({ quality: 84, effort: 5 })
      .toFile(join(outDir, `${post.slug}.webp`));
  }

  console.log(`Generated ${blogPosts.length} SVG and WebP blog thumbnails in public/blog-thumbnails.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
