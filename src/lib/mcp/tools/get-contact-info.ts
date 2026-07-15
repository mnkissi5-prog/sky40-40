import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contact_info",
  title: "Get contact info",
  description:
    "Return SKY 4040's phone/WhatsApp, email, Instagram handle, and factory address for enquiries and quotes.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            phone_whatsapp: "+233 20 816 7576",
            email: "SKY4040a1@gmail.com",
            instagram: "@sky4040_gh",
            factory_address: "Egyam, Takoradi, Western Region, Ghana",
            plus_code: "V4HW+WQR, Beahu",
            google_maps: "https://www.google.com/maps/search/?api=1&query=V4HW%2BWQR+Beahu",
            visits: "By appointment only — no walk-in showroom.",
          },
          null,
          2,
        ),
      },
    ],
  }),
});
