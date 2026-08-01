import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getCompanyInfo from "./tools/get-company-info";
import getContactInfo from "./tools/get-contact-info";
import listProducts from "./tools/list_products";
import getSpcInfo from "./tools/get-spc-info";
import getTradeTerms from "./tools/get-trade-terms";

export default defineMcp({
  name: "takoradi-millionaire-walk",
  title: "Takoradi Millionaire Walk",
  version: "0.1.0",
  instructions:
    "Authenticated information tools for SKY 40 - 40 Company Ltd (SKY 4040 LIMITED), a Ghanaian SPC flooring factory in Egyam, Takoradi. Use these to answer questions about the company, SPC flooring collections, technical specs, contact details, and factory trade terms. Prices are quoted on request only — never invent prices.",
  auth: auth.oauth.issuer({
    issuer: `https://${import.meta.env['VITE_SUPABASE_PROJECT_ID'] ?? "project-ref-unset"}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getCompanyInfo, getContactInfo, listProducts, getSpcInfo, getTradeTerms],
});
