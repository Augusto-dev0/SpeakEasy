import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_LENGTH = 500;

export async function POST(req: NextRequest) {
  let body: { text?: string; direction?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid-body" }, { status: 400 });
  }

  const text = (body.text ?? "").toString().trim();
  const direction = body.direction === "en-pt" ? "en-pt" : "pt-en";

  if (!text) {
    return NextResponse.json({ error: "empty-text" }, { status: 400 });
  }
  if (text.length > MAX_LENGTH) {
    return NextResponse.json({ error: "text-too-long" }, { status: 400 });
  }

  const langpair = direction === "pt-en" ? "pt-BR|en-GB" : "en-GB|pt-BR";

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${encodeURIComponent(langpair)}`;

    const response = await fetch(url, {
      signal: AbortSignal.timeout(12000),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "upstream-error" }, { status: 502 });
    }

    const data = await response.json();
    const translatedText: string | undefined = data?.responseData?.translatedText;

    if (!translatedText) {
      return NextResponse.json({ error: "no-translation" }, { status: 502 });
    }

    return NextResponse.json({ translatedText });
  } catch (err) {
    return NextResponse.json({ error: "network-error" }, { status: 502 });
  }
}
