import { createFileRoute } from "@tanstack/react-router";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `You are the friendly virtual assistant for SKY 40 - 40 Company Ltd (SKY 4040 LIMITED), a Ghanaian tile and SPC flooring manufacturer.

Company facts you can share:
- Established 2024, based in Egyam, Takoradi, Ghana (plus code: V4HW+WQR, Beahu)
- Slogan: "Walk as a millionaire"
- Manufactures marble, porcelain, terrazzo, slate, mosaic tiles and SPC wood-look flooring
- Raw materials imported from Italy, Spain and Türkiye — pressed, fired and interlocked in Ghana
- SPC spec: 1220 × 183 × 5.5 mm, 20 mil wear layer, Uniclic lock, water/fire/scratch resistant
- Collections: Dark Walnut, Antique Walnut, Classic Walnut, Heritage Teak, Pinewood, Sierra Oak, Hazelnut, Sandstone Oak, Nordik Oak, Rustic Grey, Driftwood Oak
- Trade MOQ from 500 m². Delivered nationwide (48h to Accra & Kumasi), ECOWAS on request. 10-year manufacturer warranty.
- Contact: Phone/WhatsApp 020 816 7576 · Email SKY4040a1@gmail.com · Instagram @sky4040_gh
- No walk-in showroom — trade buyers welcome by appointment
- Policies: No-refund policy (see /refund-policy), Privacy Policy (/privacy-policy), Terms & Conditions (/terms)

Be concise, warm and professional. If asked something you don't know, direct them to call or email the factory. Never invent prices — say "quoted on request".`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const body = (await request.json()) as { messages?: ChatMessage[] };
        const messages = Array.isArray(body.messages) ? body.messages : [];

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          if (res.status === 429) return new Response("Rate limited. Please try again shortly.", { status: 429 });
          if (res.status === 402) return new Response("AI credits exhausted. Please contact us directly.", { status: 402 });
          return new Response(`AI error: ${text}`, { status: 500 });
        }

        const data = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const reply = data.choices?.[0]?.message?.content ?? "Sorry, no response.";
        return new Response(JSON.stringify({ reply }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
