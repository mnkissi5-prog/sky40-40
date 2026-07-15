import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_trade_terms",
  title: "Trade & delivery terms",
  description:
    "Return SKY 4040's factory trade terms — MOQ, delivery lead times across Ghana, ECOWAS export, and quote process.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            minimum_order: "From 500 m² for trade / project pricing",
            pricing: "Quoted on request — no retail price list.",
            lead_time: {
              takoradi: "24–48 hours",
              accra_kumasi: "48 hours",
              other_regions: "3–5 working days",
              ecowas_export: "On request",
            },
            process: [
              "Share spec (m², collection, site)",
              "Receive quote + samples",
              "Confirm order & deposit",
              "Dispatch from Egyam plant",
            ],
            policies: {
              refunds: "No-refund policy — see /refund-policy",
              privacy: "/privacy-policy",
              terms: "/terms",
            },
            request_quote:
              "Email SKY4040a1@gmail.com or WhatsApp +233 20 816 7576 with company name, site location, m² and collections.",
          },
          null,
          2,
        ),
      },
    ],
  }),
});
