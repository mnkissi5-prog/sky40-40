import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — SKY 4040 LIMITED" },
      { name: "description", content: "Terms and conditions governing the supply of tiles and SPC flooring by SKY 40 - 40 Company Ltd." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms & Conditions" updated="July 2026">
      <p>
        These Terms & Conditions govern all quotations, sales and deliveries
        made by SKY 40 - 40 Company Ltd (registered in Ghana, "SKY 4040").
        Placing an order constitutes acceptance of these terms.
      </p>

      <h2>1. Quotations</h2>
      <p>
        Written quotations are valid for 14 days from issue. Prices are
        quoted in Ghana Cedis (GHS) unless otherwise stated and are exclusive
        of VAT and delivery unless specified.
      </p>

      <h2>2. Orders & Deposits</h2>
      <p>
        Orders are confirmed only upon receipt of a signed quotation
        acceptance and a 50% non-refundable production deposit. The balance
        is due prior to dispatch.
      </p>

      <h2>3. Manufacturing & Lead Times</h2>
      <p>
        Standard collections ship within the lead time stated on the
        quotation. We use commercially reasonable efforts to meet dates but
        do not accept liability for consequential loss arising from delay.
      </p>

      <h2>4. Delivery</h2>
      <p>
        Delivery is arranged from our Egyam, Takoradi plant. Risk in the
        goods passes to the buyer on delivery to the site. The buyer is
        responsible for offloading unless otherwise agreed in writing.
      </p>

      <h2>5. Inspection</h2>
      <p>
        The buyer must inspect and count goods on delivery. Shortages or
        visible defects must be recorded on the delivery note and reported
        within 7 days.
      </p>

      <h2>6. No Refund Policy</h2>
      <p>
        All sales are final. See our <a href="/refund-policy">No Refund Policy</a> for the full terms — including
        the replacement-only remedy for verified manufacturing defects.
      </p>

      <h2>7. Warranty</h2>
      <p>
        SKY 4040 provides a 10-year manufacturer warranty on structural
        integrity of the SPC core and glaze integrity of ceramic products,
        subject to correct installation and normal use.
      </p>

      <h2>8. Intellectual Property</h2>
      <p>
        All designs, decor films, product names, photography and the SKY
        4040 marks are the property of SKY 40 - 40 Company Ltd and may not
        be reproduced without written consent.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These terms are governed by the laws of the Republic of Ghana.
        Disputes shall be subject to the exclusive jurisdiction of the
        courts of Ghana.
      </p>

      <h2>10. Contact</h2>
      <p>
        SKY 40 - 40 Company Ltd · Egyam, Beahu, Takoradi (V4HW+WQR, Beahu) ·
        <a href="mailto:SKY4040a1@gmail.com"> SKY4040a1@gmail.com</a> · 020 816 7576.
      </p>
    </LegalPage>
  );
}
