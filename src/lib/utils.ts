import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE_NAME = "임신·출산 준비 가이드";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pregnancy.ehon365.kr";
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "G-R127LB4THW";
export const ADSENSE_PUB_ID =
  process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? "ca-pub-3050601904412736";
export const NAVER_VERIFICATION =
  process.env.NAVER_VERIFICATION ?? "aa186aa14c1f2b013de5d9139b54371082b5647c";
