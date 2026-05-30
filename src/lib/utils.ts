import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE_NAME = "임신·출산 준비 가이드";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pregnancy-guide.kr";
