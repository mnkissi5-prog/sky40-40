import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type QuoteProduct = { id: string; name: string; collection: string };

export const GHANA_REGIONS = [
  "Greater Accra",
  "Ashanti",
  "Western",
  "Western North",
  "Central",
  "Eastern",
  "Volta",
  "Oti",
  "Northern",
  "Savannah",
  "North East",
  "Upper East",
  "Upper West",
  "Bono",
  "Bono East",
  "Ahafo",
] as const;

const UNITS = ["m² (square metres)", "Boxes (2.23 m² / box)", "Planks"] as const;
const CONTACT_METHODS = [
  { value: "WhatsApp", hint: "Fastest — quote + photos sent to your chat" },
  { value: "Phone call", hint: "Our sales team calls you back" },
  { value: "Email", hint: "Written trade quote as a PDF" },
] as const;

const STEPS = ["Product", "Delivery", "Contact"] as const;

const labelCls =
  "text-[10px] uppercase tracking-[0.25em] text-ivory/70";
const fieldCls =
  "border-ivory/25 bg-transparent text-ivory placeholder:text-ivory/40";

type Props = {
  products: QuoteProduct[];
  productId: string;
  onProductChange: (id: string) => void;
  phoneTel: string;
  email: string;
};

export function QuoteForm({
  products,
  productId,
  onProductChange,
  phoneTel,
  email,
}: Props) {
  const [step, setStep] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState<string>(UNITS[0]);
  const [region, setRegion] = useState("");
  const [town, setTown] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [contactMethod, setContactMethod] = useState<string>("WhatsApp");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [notes, setNotes] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const product = useMemo(
    () => products.find((p) => p.id === productId),
    [products, productId],
  );

  const stepValid =
    step === 0
      ? Boolean(productId) && Number(quantity) > 0
      : step === 1
        ? Boolean(region) && town.trim().length > 1
        : Boolean(name.trim()) &&
          (contactMethod === "Email"
            ? /\S+@\S+\.\S+/.test(emailValue)
            : phone.trim().length >= 9);

  const summary = [
    `Product: ${product ? `${product.name} (${product.collection})` : "—"}`,
    `Quantity: ${quantity} ${unit}`,
    `Delivery: ${town}, ${region} Region, Ghana`,
    siteAddress ? `Site: ${siteAddress}` : "",
    `Preferred contact: ${contactMethod}`,
    `Name: ${name}`,
    company ? `Company: ${company}` : "",
    phone ? `Phone: ${phone}` : "",
    emailValue ? `Email: ${emailValue}` : "",
    notes ? `Notes: ${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stepValid) return;
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setDone(true);
      toast.success("Quote request received", {
        description: `We'll reach you by ${contactMethod.toLowerCase()} within one working day.`,
      });
    }, 700);
  }

  function reset() {
    setDone(false);
    setStep(0);
    setQuantity("");
    setRegion("");
    setTown("");
    setSiteAddress("");
    setNotes("");
  }

  const waHref = `https://wa.me/${phoneTel.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hello SKY 4040, I'd like a quote.\n\n${summary}`,
  )}`;
  const mailHref = `mailto:${email}?subject=${encodeURIComponent(
    `Quote request — ${product?.name ?? "SPC flooring"}`,
  )}&body=${encodeURIComponent(summary)}`;

  if (done) {
    return (
      <div className="border border-ivory/15 bg-ivory/5 p-8 backdrop-blur">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-charcoal">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="mt-6 font-serif text-3xl text-ivory">
          Your quote request is in.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ivory/70">
          Reference: SKY-{new Date().getFullYear()}-
          {Math.random().toString(36).slice(2, 7).toUpperCase()} — our production
          team prices, schedules and confirms haulage to {town}, {region} Region
          within one working day.
        </p>
        <pre className="mt-6 whitespace-pre-wrap border-l-2 border-gold/60 pl-4 font-sans text-xs leading-relaxed text-ivory/60">
          {summary}
        </pre>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={waHref} target="_blank" rel="noreferrer">
            <Button className="rounded-full bg-gold text-charcoal hover:bg-gold/90">
              Send on WhatsApp now
            </Button>
          </a>
          <a href={mailHref}>
            <Button
              variant="outline"
              className="rounded-full border-ivory/30 bg-transparent text-ivory hover:bg-ivory/10 hover:text-ivory"
            >
              Email the factory
            </Button>
          </a>
          <Button
            variant="ghost"
            onClick={reset}
            className="rounded-full text-ivory/70 hover:bg-ivory/10 hover:text-ivory"
          >
            New request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-ivory/15 bg-ivory/5 p-8 backdrop-blur"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl text-ivory">Request a quote</h3>
          <p className="mt-1 text-xs text-ivory/60">
            Three quick steps — priced direct from the Egyam plant.
          </p>
        </div>
        <span className="shrink-0 text-[10px] uppercase tracking-[0.25em] text-gold">
          Step {step + 1} / 3
        </span>
      </div>

      {/* Stepper */}
      <div className="mt-6 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-1 flex-col gap-2">
            <div
              className={`h-[2px] w-full ${i <= step ? "bg-gold" : "bg-ivory/20"}`}
            />
            <span
              className={`text-[10px] uppercase tracking-[0.2em] ${
                i <= step ? "text-ivory" : "text-ivory/40"
              }`}
            >
              {s}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {step === 0 && (
          <>
            <div className="space-y-1.5 sm:col-span-2">
              <Label className={labelCls}>Product</Label>
              <Select value={productId} onValueChange={onProductChange}>
                <SelectTrigger className={fieldCls}>
                  <SelectValue placeholder="Choose an SPC collection" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} — {p.collection}
                    </SelectItem>
                  ))}
                </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-qty" className={labelCls}>
                Quantity
              </Label>
              <Input
                id="q-qty"
                type="number"
                min={1}
                inputMode="numeric"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 250"
                className={fieldCls}
              />
            </div>
            <div className="space-y-1.5">
              <Label className={labelCls}>Unit</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className={fieldCls}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {UNITS.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs leading-relaxed text-ivory/50 sm:col-span-2">
              Minimum trade order 50 m². Add 7% wastage for diagonal or
              herringbone layouts — we'll confirm the exact box count.
            </p>
          </>
        )}

        {step === 1 && (
          <>
            <div className="space-y-1.5">
              <Label className={labelCls}>Region (Ghana)</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className={fieldCls}>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {GHANA_REGIONS.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-town" className={labelCls}>
                Town / city
              </Label>
              <Input
                id="q-town"
                value={town}
                onChange={(e) => setTown(e.target.value)}
                placeholder="e.g. Takoradi"
                className={fieldCls}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="q-site" className={labelCls}>
                Site address or landmark (optional)
              </Label>
              <Input
                id="q-site"
                value={siteAddress}
                onChange={(e) => setSiteAddress(e.target.value)}
                placeholder="Plus code, street or nearest landmark"
                className={fieldCls}
              />
            </div>
            <p className="text-xs leading-relaxed text-ivory/50 sm:col-span-2">
              We deliver nationwide from Egyam, Takoradi — haulage is quoted per
              region and included on your written quote.
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <div className="space-y-2 sm:col-span-2">
              <Label className={labelCls}>Preferred contact method</Label>
              <RadioGroup
                value={contactMethod}
                onValueChange={setContactMethod}
                className="grid gap-2 sm:grid-cols-3"
              >
                {CONTACT_METHODS.map((m) => (
                  <label
                    key={m.value}
                    htmlFor={`cm-${m.value}`}
                    className={`cursor-pointer border p-3 transition-colors ${
                      contactMethod === m.value
                        ? "border-gold bg-gold/10"
                        : "border-ivory/20 hover:border-ivory/40"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        id={`cm-${m.value}`}
                        value={m.value}
                        className="border-ivory/50 text-gold"
                      />
                      <span className="text-sm font-medium text-ivory">
                        {m.value}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[11px] leading-snug text-ivory/55">
                      {m.hint}
                    </p>
                  </label>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-name" className={labelCls}>
                Full name
              </Label>
              <Input
                id="q-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={fieldCls}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-company" className={labelCls}>
                Company name
              </Label>
              <Input
                id="q-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company / project name"
                className={fieldCls}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-phone" className={labelCls}>
                Phone {contactMethod !== "Email" && "·  required"}
              </Label>
              <Input
                id="q-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="024 000 0000"
                className={fieldCls}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-email" className={labelCls}>
                Email {contactMethod === "Email" && "·  required"}
              </Label>
              <Input
                id="q-email"
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                className={fieldCls}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="q-notes" className={labelCls}>
                Project details (optional)
              </Label>
              <Textarea
                id="q-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Type of project, timeline, subfloor condition…"
                className={fieldCls}
              />
            </div>
            <div className="border-l-2 border-gold/60 pl-4 text-xs leading-relaxed text-ivory/60 sm:col-span-2">
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold">
                Summary
              </p>
              <p className="mt-2">
                {product?.name ?? "—"} · {quantity || "—"} {unit} · {town || "—"}
                , {region || "—"} Region
              </p>
            </div>
          </>
        )}
      </div>

      <div className="mt-7 flex items-center gap-3">
        {step > 0 && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep((s) => s - 1)}
            className="gap-2 rounded-full text-ivory/70 hover:bg-ivory/10 hover:text-ivory"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        )}
        {step < 2 ? (
          <Button
            type="button"
            size="lg"
            disabled={!stepValid}
            onClick={() => setStep((s) => s + 1)}
            className="ml-auto gap-2 rounded-full bg-gold text-charcoal hover:bg-gold/90"
          >
            Continue <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="submit"
            size="lg"
            disabled={!stepValid || sending}
            className="ml-auto gap-2 rounded-full bg-gold text-charcoal hover:bg-gold/90"
          >
            {sending && <Loader2 className="h-4 w-4 animate-spin" />}
            Send quote request
          </Button>
        )}
      </div>
    </form>
  );
}
