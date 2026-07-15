import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_spc_info",
  title: "About SPC flooring",
  description:
    "Explain what SPC (Stone Plastic Composite) flooring is, its layer structure, and why it suits Ghana's climate.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            what_is_spc:
              "Stone Plastic Composite: a rigid-core plank made from limestone powder + food-grade PVC, topped with a photo-real décor film and a diamond-hardened UV wear layer, with an IXPE acoustic pad underneath.",
            layer_structure: [
              "UV coating",
              "Wear layer (20 mil)",
              "Decor film (wood-grain print)",
              "Rigid SPC core (limestone + PVC)",
              "IXPE acoustic pad",
            ],
            lock_system: "Uniclic click-lock — glueless, DIY-friendly installation.",
            plank_spec: "1220 × 183 × 5.5 mm",
            performance: [
              "100% waterproof",
              "Fire retardant",
              "Scratch & stain resistant",
              "Anti-slip",
              "Sound insulating",
              "Dimensionally stable under humidity & heat",
            ],
            ghana_climate_fit:
              "Handles coastal humidity and harmattan dryness far better than laminate, engineered timber, or ceramic in wet areas.",
            warranty: "10-year manufacturer warranty",
          },
          null,
          2,
        ),
      },
    ],
  }),
});
