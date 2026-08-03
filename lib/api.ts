import { WritingIssue } from "./types";

export async function checkWriting(
  text: string
): Promise<{ matches: WritingIssue[] } | { error: string }> {
  try {
    const res = await fetch("/api/check-writing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error ?? "unknown-error" };
    return { matches: data.matches as WritingIssue[] };
  } catch {
    return { error: "network-error" };
  }
}

export type TranslateDirection = "pt-en" | "en-pt";

export async function translateText(
  text: string,
  direction: TranslateDirection
): Promise<{ translatedText: string } | { error: string }> {
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, direction }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error ?? "unknown-error" };
    return { translatedText: data.translatedText as string };
  } catch {
    return { error: "network-error" };
  }
}
