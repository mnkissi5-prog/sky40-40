import { defineMcp } from "@lovable.dev/mcp-js";
import getCompanyInfo from "./tools/get-company-info";
import getContactInfo from "./tools/get-contact-info";
import listProducts from "./tools/list_products";
import getSpcInfo from "./tools/get-spc-info";
import getTradeTerms from "./tools/get-trade-terms";

export default defineMcp({
  name: "sky4040-mcp",
  title: "SKY 4040 LIMITED",
  version: "0.1.0",
  instructions:
    "Public information tools for SKY 40 - 40 Company Ltd (SKY 4040 LIMITED), a Ghanaian SPC flooring & tile factory in Egyam, Takoradi. Use these to answer questions about the company, SPC flooring collections, technical specs, contact details, and factory trade terms. Prices are quoted on request only — never invent prices.",
  tools: [getCompanyInfo, getContactInfo, listProducts, getSpcInfo, getTradeTerms],
});
