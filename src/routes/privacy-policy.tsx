import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SKY 4040 LIMITED" },
      { name: "description", content: "How SKY 40 - 40 Company Ltd collects, uses and protects your personal information." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage eyebrow="Policy" title="Privacy Policy" updated="July 2026">
      <p>
        SKY 40 - 40 Company Ltd ("we", "us", "our") respects your privacy.
        This policy explains what personal information we collect through our
        website, our factory enquiry form and our chat assistant, and how we
        use it.
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li>Contact details you submit: full name, company name, phone number, email address, project details.</li>
        <li>Messages you send through our AI chat assistant.</li>
        <li>Basic technical data (browser type, device, pages visited) collected automatically by our hosting platform for security and analytics.</li>
      </ul>

      <h2>2. How We Use It</h2>
      <ul>
        <li>To respond to enquiries and prepare quotations.</li>
        <li>To fulfil confirmed orders and arrange delivery.</li>
        <li>To send occasional product updates to trade buyers who opt in.</li>
        <li>To improve our website and factory service.</li>
      </ul>

      <h2>3. Sharing</h2>
      <p>
        We do not sell your personal information. We share information only
        with our logistics partners (for delivery) and with our AI service
        provider strictly to power the on-site chat assistant. All processors
        are bound by confidentiality.
      </p>

      <h2>4. Retention</h2>
      <p>
        Enquiries and order records are kept for as long as necessary to
        service your project and to comply with Ghanaian tax and commercial
        record-keeping law.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of your
        personal data by emailing <a href="mailto:SKY4040a1@gmail.com">SKY4040a1@gmail.com</a>.
      </p>

      <h2>6. Security</h2>
      <p>
        We use industry-standard technical and organisational measures to
        protect your data. No system is 100% secure, but we take reasonable
        care.
      </p>

      <h2>7. Contact</h2>
      <p>
        SKY 40 - 40 Company Ltd · Egyam, Beahu, Takoradi, Ghana (V4HW+WQR,
        Beahu) · <a href="mailto:SKY4040a1@gmail.com">SKY4040a1@gmail.com</a> · 020 816 7576 · Instagram <a href="https://instagram.com/sky4040_gh" target="_blank" rel="noreferrer">@sky4040_gh</a>.
      </p>
    </LegalPage>
  );
}
