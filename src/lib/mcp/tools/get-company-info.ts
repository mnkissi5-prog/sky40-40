import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_company_info",
  title: "Get company info",
  description:
    "Return SKY 40 - 40 Company Ltd (SKY 4040 LIMITED) company profile — founding year, slogan, factory location, and what we manufacture.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            legal_name: "SKY 40 - 40 Company Ltd",
            trading_name: "SKY 4040 LIMITED",
            established: 2024,
            slogan: "Walk as a millionaire",
            country: "Ghana",
            factory_location: "Egyam, Takoradi, Western Region, Ghana",
            plus_code: "V4HW+WQR, Beahu",
            business:
              "Ghanaian factory manufacturing SPC (Stone Plastic Composite) wood-look flooring and tiles using imported raw materials.",
            serves: [
              "Developers",
              "Contractors",
              "Architects & interior designers",
              "Retailers & distributors",
            ],
            showroom: "No walk-in showroom — factory visits by appointment only.",
            proudly_made_in: "Ghana",
          },
          null,
          2,
        ),
      },
    ],
  }),
});
