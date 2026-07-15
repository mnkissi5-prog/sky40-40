import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const PRODUCTS = [
  { name: "Dark Walnut", tone: "Dark" },
  { name: "Antique Walnut", tone: "Dark" },
  { name: "Classic Walnut", tone: "Warm" },
  { name: "Heritage Teak", tone: "Warm" },
  { name: "Pinewood", tone: "Light" },
  { name: "Sierra Oak", tone: "Warm" },
  { name: "Hazelnut", tone: "Warm" },
  { name: "Sandstone Oak", tone: "Light" },
  { name: "Nordik Oak", tone: "Light" },
  { name: "Rustic Grey", tone: "Grey" },
  { name: "Driftwood Oak", tone: "Grey" },
];

export default defineTool({
  name: "list_products",
  title: "List SPC flooring collections",
  description:
    "List SKY 4040's SPC wood-look flooring collections. Optionally filter by tone (Light, Warm, Dark, Grey).",
  inputSchema: {
    tone: z
      .enum(["Light", "Warm", "Dark", "Grey"])
      .optional()
      .describe("Optional tone filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ tone }) => {
    const items = tone ? PRODUCTS.filter((p) => p.tone === tone) : PRODUCTS;
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              spec: "1220 × 183 × 5.5 mm plank, 20 mil UV wear layer, Uniclic lock",
              count: items.length,
              collections: items,
            },
            null,
            2,
          ),
        },
      ],
    };
  },
});
