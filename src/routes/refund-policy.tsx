import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "No Refund Policy — SKY 4040 LIMITED" },
      { name: "description", content: "SKY 40 - 40 Company Ltd operates a strict no-refund policy on all manufactured tile and SPC flooring orders." },
    ],
  }),
  component: RefundPage,
});

function RefundPage() {
  return (
    <LegalPage eyebrow="Policy" title="No Refund Policy" updated="July 2026">
      <p>
        All tile and SPC flooring products supplied by SKY 40 - 40 Company Ltd
        ("SKY 4040", "we", "us") are manufactured to order at our plant in
        Egyam, Takoradi. By placing an order or paying a deposit, the buyer
        acknowledges and accepts the terms of this No Refund Policy.
      </p>

      <h2>1. Strictly No Refunds</h2>
      <p>
        Once an order is confirmed and payment (whole or deposit) has been
        received, the order is <strong>final and non-refundable</strong>. This
        includes but is not limited to change of mind, colour preference,
        change in project scope, delay in project timelines, or cancellation
        after production has commenced.
      </p>

      <h2>2. Samples Before Purchase</h2>
      <p>
        We strongly encourage every buyer to request physical samples before
        confirming an order. Samples are dispatched on request and are the
        buyer's opportunity to verify tone, texture and finish. Slight batch
        variation is inherent to tile and SPC production and is not grounds
        for a refund.
      </p>

      <h2>3. Manufacturing Defects</h2>
      <p>
        If a delivered batch is defective in manufacture (e.g. cracked before
        installation, wrong SKU shipped, wrong dimensions), the buyer must
        notify us in writing at <a href="mailto:SKY4040a1@gmail.com">SKY4040a1@gmail.com</a> within
        <strong> 7 days of delivery</strong>, with photographs and the
        delivery note. Verified manufacturing defects will be remedied by
        <strong> replacement of the affected pieces only</strong> — no
        monetary refund is issued.
      </p>

      <h2>4. Damage After Delivery</h2>
      <p>
        We are not liable for damage caused during handling, storage,
        installation or use after delivery has been accepted and signed for.
      </p>

      <h2>5. Deposits</h2>
      <p>
        The 50% production deposit is non-refundable once raw materials have
        been allocated to your order.
      </p>

      <h2>6. Warranty</h2>
      <p>
        Our 10-year manufacturer warranty covers structural failure of the
        SPC core and glaze integrity under normal residential and commercial
        use. Warranty claims are settled by product replacement, not cash
        refund.
      </p>

      <h2>7. Contact</h2>
      <p>
        SKY 40 - 40 Company Ltd · Egyam, Beahu, Takoradi, Ghana (Plus code:
        V4HW+WQR, Beahu) · <a href="mailto:SKY4040a1@gmail.com">SKY4040a1@gmail.com</a> · 020 816 7576.
      </p>
    </LegalPage>
  );
}
