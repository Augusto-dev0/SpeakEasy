import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_LENGTH = 2000;

export async function POST(req: NextRequest) {
  let body: { text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid-body" }, { status: 400 });
  }

  const text = (body.text ?? "").toString().trim();

  if (!text) {
    return NextResponse.json({ error: "empty-text" }, { status: 400 });
  }
  if (text.length > MAX_LENGTH) {
    return NextResponse.json({ error: "text-too-long" }, { status: 400 });
  }

  try {
    const params = new URLSearchParams({
      text,
      language: "en-US",
    });

    const response = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      // A API pública do LanguageTool pode ser lenta em picos de uso
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "upstream-error" }, { status: 502 });
    }

    const data = await response.json();

    const matches = (data.matches ?? []).map((m: any, idx: number) => ({
      id: `issue-${idx}`,
      message: m.message ?? "",
      offset: m.offset ?? 0,
      length: m.length ?? 0,
      badText: text.slice(m.offset ?? 0, (m.offset ?? 0) + (m.length ?? 0)),
      suggestions: (m.replacements ?? []).slice(0, 3).map((r: any) => r.value),
      category: m.rule?.category?.name ?? "Geral",
    }));

    return NextResponse.json({ matches });
  } catch (err) {
    return NextResponse.json({ error: "network-error" }, { status: 502 });
  }
}
