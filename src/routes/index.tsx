import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Factory,
  Globe2,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CompanyChat } from "@/components/CompanyChat";
import whyChooseImg from "@/assets/spc-why-choose.png.asset.json";
import layerStructureImg from "@/assets/spc-layer-structure.png.asset.json";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import logoAsset from "@/assets/sky4040-logo.png.asset.json";
import heroShowroom from "@/assets/hero-showroom.jpg";
import spcDarkWalnut from "@/assets/spc-dark-walnut.jpg";
import spcPinewood from "@/assets/spc-pinewood.jpg";
import spcSierraOak from "@/assets/spc-sierra-oak.jpg";
import spcAntiqueWalnut from "@/assets/spc-antique-walnut.jpg";
import spcHazelnut from "@/assets/spc-hazelnut.jpg";
import spcSandstoneOak from "@/assets/spc-sandstone-oak.jpg";
import spcRusticGrey from "@/assets/spc-rustic-grey.jpg";
import spcClassicWalnut from "@/assets/spc-classic-walnut.jpg";
import spcNordikOak from "@/assets/spc-nordik-oak.jpg";
import spcHeritageTeak from "@/assets/spc-heritage-teak.jpg";
import spcDriftwoodOak from "@/assets/spc-driftwood-oak.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

type Tone = "Dark" | "Warm" | "Light" | "Grey";
type Product = {
  id: string;
  name: string;
  collection: string;
  size: string;
  finish: string;
  image: string;
  tone: Tone;
  tag?: string;
};

const SPC_SPEC = "1220 × 183 × 5.5 mm / 20 mil";

const products: Product[] = [
  { id: "dark-walnut", name: "Dark Walnut", collection: "Heritage SPC", size: SPC_SPEC, finish: "Uniclic lock · Matte", image: spcDarkWalnut, tone: "Dark", tag: "Best seller" },
  { id: "antique-walnut", name: "Antique Walnut", collection: "Heritage SPC", size: SPC_SPEC, finish: "Uniclic lock · Embossed", image: spcAntiqueWalnut, tone: "Warm" },
  { id: "classic-walnut", name: "Classic Walnut", collection: "Heritage SPC", size: SPC_SPEC, finish: "Uniclic lock · Satin", image: spcClassicWalnut, tone: "Warm" },
  { id: "heritage-teak", name: "Heritage Teak", collection: "Heritage SPC", size: SPC_SPEC, finish: "Uniclic lock · Embossed", image: spcHeritageTeak, tone: "Warm", tag: "Signature" },
  { id: "pinewood", name: "Pinewood", collection: "Naturals SPC", size: SPC_SPEC, finish: "Uniclic lock · Matte", image: spcPinewood, tone: "Light" },
  { id: "sierra-oak", name: "Sierra Oak", collection: "Naturals SPC", size: SPC_SPEC, finish: "Uniclic lock · Matte", image: spcSierraOak, tone: "Light" },
  { id: "hazelnut", name: "Hazelnut", collection: "Naturals SPC", size: SPC_SPEC, finish: "Uniclic lock · Soft matte", image: spcHazelnut, tone: "Light" },
  { id: "sandstone-oak", name: "Sandstone Oak", collection: "Naturals SPC", size: SPC_SPEC, finish: "Uniclic lock · Matte", image: spcSandstoneOak, tone: "Light" },
  { id: "nordik-oak", name: "Nordik Oak", collection: "Naturals SPC", size: SPC_SPEC, finish: "Uniclic lock · Matte", image: spcNordikOak, tone: "Light", tag: "New" },
  { id: "rustic-grey", name: "Rustic Grey", collection: "Contemporary SPC", size: SPC_SPEC, finish: "Uniclic lock · Embossed", image: spcRusticGrey, tone: "Grey" },
  { id: "driftwood-oak", name: "Driftwood Oak", collection: "Contemporary SPC", size: SPC_SPEC, finish: "Uniclic lock · Matte", image: spcDriftwoodOak, tone: "Grey" },
];

const categories = ["All", "Light", "Warm", "Dark", "Grey"] as const;
type Category = (typeof categories)[number];

const navLinks = [
  { label: "Catalogue", href: "#catalogue" },
  { label: "What is SPC?", href: "#what-is-spc" },
  { label: "The Factory", href: "#factory" },
  { label: "Why Us", href: "#unique" },
  { label: "Trade & Projects", href: "#trade" },
  { label: "Contact", href: "#contact" },
];

const PHONE_DISPLAY = "020 816 7576";
const PHONE_TEL = "+233208167576";
const EMAIL = "SKY4040a1@gmail.com";
const INSTAGRAM = "sky4040_gh";
const INSTAGRAM_URL = "https://instagram.com/sky4040_gh";
const FACTORY_PLUSCODE = "V4HW+WQR, Beahu";
const MAP_URL = "https://www.google.com/maps/search/?api=1&query=V4HW%2BWQR+Beahu+Takoradi";

const proverbs = [
  {
    twi: "Dua kor gye mframa a, ebu.",
    en: "A single tree cannot withstand the storm.",
  },
  {
    twi: "Nsa baako nkura adesoa.",
    en: "One hand alone cannot lift a heavy load — we build together.",
  },
  {
    twi: "Praeɛ, wɔka wɔn baako a wobu, wɔka wɔn nyinaa a emmu.",
    en: "A single broom stick breaks; a bundle stands strong.",
  },
  {
    twi: "Tiri nkwa nyɛ abakan.",
    en: "Life is long — build for generations, not for a season.",
  },
];

function GhanaFlag({ className = "h-4 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={className}
      aria-label="Flag of Ghana"
      role="img"
    >
      <rect width="60" height="40" fill="#ce1126" />
      <rect y="13.33" width="60" height="13.34" fill="#fcd116" />
      <rect y="26.67" width="60" height="13.33" fill="#006b3f" />
      <polygon
        points="30,15.5 31.76,20.9 37.44,20.9 32.84,24.24 34.6,29.64 30,26.3 25.4,29.64 27.16,24.24 22.56,20.9 28.24,20.9"
        fill="#000"
      />
    </svg>
  );
}



function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.tone === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Announcement bar */}
      <div className="border-b border-border bg-charcoal text-ivory">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-3 px-4 text-center text-[11px] font-medium uppercase tracking-[0.25em]">
          <GhanaFlag className="h-3 w-[18px] rounded-[1px] ring-1 ring-ivory/20" />
          <Sparkles className="h-3 w-3 text-gold" />
          Proudly made in Ghana · SPC flooring factory · Egyam, Takoradi
          <Sparkles className="h-3 w-3 text-gold" />
          <GhanaFlag className="h-3 w-[18px] rounded-[1px] ring-1 ring-ivory/20" />
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt="SKY 4040 LIMITED"
              width={48}
              height={48}
              className="h-11 w-auto object-contain"
            />
            <span className="hidden sm:block">
              <span className="flex items-center gap-2 text-base font-semibold leading-none tracking-tight text-foreground">
                SKY 4040
                <GhanaFlag className="h-3 w-[18px] rounded-[1px] ring-1 ring-border" />
              </span>
              <span className="mt-1 block text-[10px] font-medium leading-none tracking-[0.35em] text-muted-foreground">
                LIMITED · MANUFACTURER
              </span>
            </span>

          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={`tel:${PHONE_TEL}`} className="hidden lg:block">
              <Button variant="ghost" size="sm" className="gap-2 text-sm">
                <Phone className="h-4 w-4" />
                {PHONE_DISPLAY}
              </Button>
            </a>
            <a href="#contact" className="hidden sm:block">
              <Button size="sm" className="rounded-full bg-charcoal text-ivory hover:bg-charcoal/90">
                Request a quote
              </Button>
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="ml-1 inline-flex items-center justify-center rounded-md p-2 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="border-t border-border bg-background px-4 py-3 md:hidden">
            <nav className="flex flex-col">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-border py-3 text-sm font-medium text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={`tel:${PHONE_TEL}`}
                className="mt-3 flex items-center gap-2 rounded-md bg-charcoal px-4 py-3 text-sm font-medium text-ivory"
              >
                <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
              </a>
            </nav>
          </div>
        )}
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0">
            <img
              src={heroShowroom}
              alt="Interior finished with SKY 4040 manufactured tiles"
              className="h-full w-full object-cover"
              width={1600}
              height={1000}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 to-charcoal/20" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-12 lg:px-8 lg:py-40">
            <div className="lg:col-span-8">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-ivory/25 bg-ivory/5 px-4 py-1.5 backdrop-blur">
                <GhanaFlag className="h-3 w-[18px] rounded-[1px] shadow-sm ring-1 ring-ivory/30" />
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-ivory/90">
                  Est. 2024 · Manufactured in Takoradi, Ghana
                </span>
                <GhanaFlag className="h-3 w-[18px] rounded-[1px] shadow-sm ring-1 ring-ivory/30" />
              </div>

              <h1 className="font-serif text-balance text-5xl leading-[1.02] text-ivory sm:text-6xl lg:text-7xl">
                Ghana's premium tile
                <br />
                & SPC flooring
                <br />
                <em className="not-italic text-gold">manufacturer.</em>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/80 sm:text-lg">
                SKY 40 - 40 Company Ltd is a Ghanaian factory producing pine
                wood, rustic grey, hazelnut, classic walnut, nordic grey and SPC
                wood-look flooring at our plant in Egyam, Takoradi — using
                imported raw materials from trusted companies all around the
                world, we believe have the best SPC tiles on the market. We
                supply developers, contractors, architects and retailers
                nationwide.
                <span className="mt-3 block font-serif text-xl not-italic text-gold">
                  Walk as a millionaire.
                </span>
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="#contact">
                  <Button size="lg" className="h-12 gap-2 rounded-full bg-gold px-7 text-charcoal hover:bg-gold/90">
                    Request a factory quote
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
                <a href="#catalogue">
                  <Button size="lg" variant="outline" className="h-12 gap-2 rounded-full border-ivory/40 bg-transparent px-7 text-ivory hover:bg-ivory/10 hover:text-ivory">
                    View catalogue
                  </Button>
                </a>
              </div>

              <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-ivory/15 pt-8">
                {[
                  { k: "100%", v: "Made in Ghana" },
                  { k: "ISO 9001", v: "Quality certified" },
                  { k: "MOQ", v: "From 500 m² trade" },
                ].map((s) => (
                  <div key={s.v}>
                    <dt className="font-serif text-3xl text-ivory sm:text-4xl">{s.k}</dt>
                    <dd className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-ivory/60">
                      {s.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[3px] kente-hairline" />
        </section>

        {/* Trust strip */}
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4 sm:px-6 lg:px-8">
            {[
              { icon: Factory, label: "In-house manufacturing plant" },
              { icon: Globe2, label: "Imported raw materials, Ghanaian production" },
              { icon: ShieldCheck, label: "PEI IV commercial-grade rated" },
              { icon: Truck, label: "Direct-from-factory nationwide delivery" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                <p className="text-xs font-medium leading-snug text-foreground sm:text-sm">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Catalogue */}
        <section id="catalogue" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                  Product Catalogue
                </p>
                <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                  What we manufacture.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  A working catalogue of the collections currently in
                  production at our Egyam, Takoradi plant. Trade pricing,
                  volume discounts and custom formats are quoted on
                  request — we manufacture to order.
                </p>
              </div>
              <div className="hidden md:block">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Free samples for verified trade buyers
                </p>
              </div>
            </div>

            {/* Category filter */}
            <div className="mt-10 flex flex-wrap gap-2 border-b border-border pb-6">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    activeCategory === c
                      ? "border-charcoal bg-charcoal text-ivory"
                      : "border-border bg-transparent text-foreground hover:border-foreground/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Product grid */}
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <article key={p.id} className="group">
                  <div className="relative overflow-hidden bg-secondary">
                    <img
                      src={p.image}
                      alt={`${p.name} tile manufactured by SKY 4040`}
                      loading="lazy"
                      width={800}
                      height={800}
                      className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {p.tag && (
                      <Badge className="absolute left-3 top-3 rounded-none border-none bg-ivory px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal hover:bg-ivory">
                        {p.tag}
                      </Badge>
                    )}
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                        {p.collection}
                      </p>
                      <h3 className="mt-1 font-serif text-2xl leading-tight text-foreground">
                        {p.name}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {p.size} · {p.finish}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        Price
                      </p>
                      <p className="font-serif text-base text-foreground">
                        On request
                      </p>
                    </div>
                  </div>
                  <a href="#contact" className="mt-4 block">
                    <Button
                      variant="outline"
                      className="w-full gap-2 rounded-full border-foreground/20"
                      size="sm"
                    >
                      Request quote <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* What is SPC? */}
        <section id="what-is-spc" className="border-t border-border bg-ivory/40 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                  What is SPC flooring?
                </p>
                <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                  Stone Plastic Composite —
                  <br />
                  <em className="not-italic text-forest">built for Ghana.</em>
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  SPC (Stone Plastic Composite) is a next-generation rigid-core
                  flooring engineered from limestone powder, food-grade PVC and
                  stabilisers, pressed into dense planks with a photo-real wood
                  décor film and a diamond-hardened UV wear layer on top.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Unlike laminate, it will not swell in humidity. Unlike ceramic
                  tile, it will not crack when a pot drops on it. Unlike solid
                  timber, termites cannot eat it. It clicks together over almost
                  any subfloor — no cement, no glue, no dust — so a full room
                  can be laid and walked on the same day.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  For Ghana's coastal humidity, harmattan dust, and family
                  homes with children and pets, SPC is simply the smarter floor.
                </p>
                <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6">
                  {[
                    { k: "5.5 mm", v: "Plank thickness" },
                    { k: "20 mil", v: "Wear layer" },
                    { k: "Bfl-s1", v: "Fire class" },
                    { k: "100%", v: "Waterproof core" },
                  ].map((s) => (
                    <div key={s.v}>
                      <dt className="font-serif text-2xl text-foreground">{s.k}</dt>
                      <dd className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        {s.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="lg:col-span-7">
                <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
                  <img
                    src={layerStructureImg.url}
                    alt="SKY 4040 SPC flooring layer structure — UV layer, wear layer, European décor film, rigid SPC core and soundproof IXPE pad — with Uniclic locking system and key features."
                    className="w-full"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Layer structure & Uniclic lock — SKY 4040 factory spec sheet
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Akan proverb strip */}
        <section aria-label="Akan proverbs" className="relative overflow-hidden border-y border-border bg-forest text-ivory">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] kente-hairline" />
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4">
              <GhanaFlag className="h-4 w-6 rounded-[1px] shadow-sm ring-1 ring-ivory/20" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
                Wisdom from the Motherland
              </p>
              <GhanaFlag className="h-4 w-6 rounded-[1px] shadow-sm ring-1 ring-ivory/20" />
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {proverbs.slice(0, 3).map((p) => (
                <figure key={p.twi} className="relative rounded-lg border border-ivory/10 bg-ivory/[0.03] px-6 py-8 text-center">
                  <span aria-hidden className="absolute left-3 top-2 font-serif text-4xl leading-none text-gold/50">&ldquo;</span>
                  <blockquote className="font-serif text-lg italic leading-snug text-ivory sm:text-xl">
                    {p.twi}
                  </blockquote>
                  <figcaption className="mt-3 text-xs leading-relaxed text-ivory/70">
                    {p.en}
                  </figcaption>
                  <div className="mx-auto mt-4 h-[2px] w-16 kente-hairline" />
                </figure>
              ))}
            </div>

            <p className="mt-10 text-center text-[11px] uppercase tracking-[0.35em] text-gold">
              Yɛn nyinaa yɛ baako · We are all one
            </p>
            <p className="mt-2 text-center text-sm italic text-ivory/70">
              &ldquo;{proverbs[3].twi}&rdquo; — {proverbs[3].en}
            </p>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] kente-hairline" />
        </section>


        {/* Factory */}
        <section id="factory" className="border-y border-border bg-charcoal py-24 text-ivory">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                  The Factory
                </p>
                <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                  Imported materials.
                  <br />
                  Manufactured in Ghana.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/75">
                  SKY 4040 is not a shop — we are a specialized Ghanaian tile
                  and SPC flooring factory. We source the highest grade raw
                  materials — ultra fine limestone powder, premium food-grade
                  PVC, high-definition wood-grain decor films, and press,
                  extrude, and pricision-cut every plank at our Egyam,
                  Takoradi plant. The result is world-class,
                  weather-resistance flooring, produced by Ghanaian hands,
                  priced for Ghanaian projects.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { c: "The Core", d: "Premium limestone powder & food-grade PVC stabilizers." },
                  { c: "The Style", d: "High-definition, photo-real-wood grain decor films." },
                  { c: "The Shield", d: "Diamond-hardend UV wear layers & scratch protection. " },
                ].map((o) => (
                  <div key={o.c} className="border border-ivory/15 p-6">
                    <p className="font-serif text-2xl text-ivory">{o.c}</p>
                    <p className="mt-2 text-xs leading-relaxed text-ivory/70">
                      {o.d}
                    </p>
                  </div>
                ))}
                <div className="border border-gold/40 bg-gold/10 p-6 sm:col-span-3">
                  <div className="flex items-start gap-3">
                    <Factory className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                    <div>
                      <p className="font-serif text-xl text-ivory">
                        Production plant · Egyam, Takoradi
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ivory/70">
                        Presses, kilns and interlock lines under one roof in
                        the Western Region. Trade buyers welcome by
                        appointment — we do not operate a retail showroom.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inside the plant — production numbers */}
        <section className="relative border-b border-border bg-forest text-ivory">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] kente-hairline" />
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex items-center gap-3">
                <GhanaFlag className="h-4 w-6 rounded-[1px] ring-1 ring-ivory/20" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
                  Inside the plant · Egyam, Takoradi
                </p>
                <GhanaFlag className="h-4 w-6 rounded-[1px] ring-1 ring-ivory/20" />
              </div>
              <h2 className="mt-2 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
                Ghanaian hands. Ghanaian craft. Global standard.
              </h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { n: "45,000+", l: "m² produced per month" },
                { n: "11", l: "signature SPC decors" },
                { n: "20 mil", l: "diamond UV wear layer" },
                { n: "100%", l: "made in Ghana" },
              ].map((s) => (
                <div key={s.l} className="border border-ivory/15 bg-ivory/[0.03] p-6 text-center">
                  <p className="font-serif text-4xl text-gold">{s.n}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-ivory/75">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                { t: "Extrusion line", d: "Twin-screw SPC extruders press the rigid limestone-PVC core to a dead-flat 5.5 mm." },
                { t: "Décor & UV", d: "HD wood-grain film, IXPE acoustic pad and diamond-hardened UV coat cured in-line." },
                { t: "Uniclic milling", d: "Precision-cut 1220 × 183 mm planks with a click-lock edge — no glue, no gaps." },
              ].map((s) => (
                <div key={s.t} className="border-l-2 border-gold/60 pl-4">
                  <p className="font-serif text-lg text-ivory">{s.t}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ivory/70">{s.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-[11px] uppercase tracking-[0.35em] text-gold">
              Nyansapo · The wisdom knot — patience, craft, forethought
            </p>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] kente-hairline" />
        </section>



        {/* Capabilities (formerly values) */}
        <section id="capabilities" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                  Factory Capabilities
                </p>
                <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground">
                  Built on six standards.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  What every batch that leaves our plant is measured against.
                </p>
              </div>
              <ol className="lg:col-span-2 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {[
                  { t: "Sankofa Craft", d: "Learn from the master mills of Europe, then produce something worthy of home." },
                  { t: "Integrity", d: "Honest specifications. Every batch matches the sample — no swaps, no shortcuts." },
                  { t: "Excellence", d: "PEI IV grade or we don't press it. Water absorption tested for coastal Ghana." },
                  { t: "Community", d: "Ghanaian-owned, Ghanaian-run. We train the fitters we recommend to our buyers." },
                  { t: "Longevity", d: "Every collection carries a 10-year manufacturer warranty in writing." },
                  { t: "Partnership", d: "Developers, contractors and retailers get one dedicated account manager." },
                ].map((v, i) => (
                  <li key={v.t} className="border-t border-border pt-6">
                    <div className="flex items-baseline gap-4">
                      <span className="font-serif text-lg text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-serif text-xl text-foreground">{v.t}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {v.d}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* What makes us unique */}
        <section id="unique" className="border-t border-border bg-ivory/40 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                What makes us unique
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                Why choose SKY 4040 SPC flooring.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Anti-slippery, fire resistant, sound insulating, stain resistant,
                non-volatile, water resistant, highly durable, easy to install
                and scratch resistant — engineered to outperform conventional
                tiles and natural stone.
              </p>
            </div>
            <div className="mt-12 overflow-hidden rounded-xl border border-border bg-background shadow-sm">
              <img
                src={whyChooseImg.url}
                alt="Why choose SKY 4040 SPC flooring — anti-slippery, fire resistant, sound insulation, stain resistant, water resistant, highly durable, easy to install and scratch resistant"
                className="w-full"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Trade / how to order */}
        <section id="trade" className="border-t border-border bg-secondary/40 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                Trade & Projects
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                How to order from the factory.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                We supply developers, contractors, architects, retailers and
                private projects direct from our production line.
              </p>
            </div>
            <ol className="mt-14 grid gap-6 md:grid-cols-4">
              {[
                { n: "01", t: "Send your spec", d: "Share your project, area (m²) and preferred finish by phone or email." },
                { n: "02", t: "Receive samples", d: "We courier physical swatches and a written trade quote." },
                { n: "03", t: "Confirm & pay", d: "50% deposit reserves your production slot. Momo, bank transfer or cheque." },
                { n: "04", t: "Delivered to site", d: "Dispatched from Egyam, Takoradi. 48h to Accra & Kumasi, ECOWAS on request." },
              ].map((s) => (
                <li key={s.n} className="border-l-2 border-gold bg-background p-6">
                  <p className="font-serif text-3xl text-gold">{s.n}</p>
                  <h3 className="mt-3 font-serif text-xl text-foreground">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.d}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <div className="flex justify-center gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-6 font-serif text-3xl leading-snug text-foreground sm:text-4xl">
              "We tiled a whole boutique hotel in Cape Coast with SKY 4040. Two
              years on, not a single cracked piece. The Statuario looks the day we
              laid it."
            </blockquote>
            <p className="mt-8 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Kwame Boateng — Principal, Atlantic Coast Architects
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-border bg-charcoal py-24 text-ivory">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                Speak with the factory
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                Request a quote.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/75">
                Whether it's a single villa or a 40-storey tower, our
                production team will spec, price and schedule your order —
                usually within the same working day.
              </p>
              <div className="mt-10 space-y-5">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="group flex items-center gap-4 border-b border-ivory/15 pb-5"
                >
                  <Phone className="h-5 w-5 text-gold" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-ivory/60">
                      Call the factory
                    </p>
                    <p className="font-serif text-2xl text-ivory group-hover:text-gold">
                      {PHONE_DISPLAY}
                    </p>
                  </div>
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex items-center gap-4 border-b border-ivory/15 pb-5"
                >
                  <Mail className="h-5 w-5 text-gold" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-ivory/60">
                      Email
                    </p>
                    <p className="font-serif text-xl text-ivory group-hover:text-gold sm:text-2xl">
                      {EMAIL}
                    </p>
                  </div>
                </a>
                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 border-b border-ivory/15 pb-5"
                >
                  <MapPin className="h-5 w-5 text-gold" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-ivory/60">
                      Factory address
                    </p>
                    <p className="font-serif text-2xl group-hover:text-gold">
                      {FACTORY_PLUSCODE}
                    </p>
                    <p className="text-xs text-ivory/70">
                      Egyam · Takoradi · Western Region, Ghana · Mon–Sat, 8:00–17:00 GMT
                    </p>
                    <p className="mt-1 text-xs text-ivory/60">
                      Trade buyers welcome by appointment — no walk-in showroom.
                    </p>
                  </div>
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4"
                >
                  <Instagram className="h-5 w-5 text-gold" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-ivory/60">
                      Instagram
                    </p>
                    <p className="font-serif text-2xl text-ivory group-hover:text-gold">
                      @{INSTAGRAM}
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Enquiry received", {
                  description: "Our production team will contact you within one working day.",
                });
                (e.currentTarget as HTMLFormElement).reset();
              }}
              className="rounded-none border border-ivory/15 bg-ivory/5 p-8 backdrop-blur"
            >
              <h3 className="font-serif text-2xl text-ivory">Factory enquiry</h3>
              <p className="mt-1 text-xs text-ivory/60">
                Tell us about your project.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="q-name" className="text-[10px] uppercase tracking-[0.25em] text-ivory/70">
                    Full name
                  </Label>
                  <Input
                    id="q-name"
                    required
                    className="border-ivory/25 bg-transparent text-ivory placeholder:text-ivory/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="q-company" className="text-[10px] uppercase tracking-[0.25em] text-ivory/70">
                    Company name
                  </Label>
                  <Input
                    id="q-company"
                    placeholder="Company / project name"
                    className="border-ivory/25 bg-transparent text-ivory placeholder:text-ivory/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="q-phone" className="text-[10px] uppercase tracking-[0.25em] text-ivory/70">
                    Phone
                  </Label>
                  <Input
                    id="q-phone"
                    type="tel"
                    required
                    className="border-ivory/25 bg-transparent text-ivory placeholder:text-ivory/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="q-email" className="text-[10px] uppercase tracking-[0.25em] text-ivory/70">
                    Email
                  </Label>
                  <Input
                    id="q-email"
                    type="email"
                    className="border-ivory/25 bg-transparent text-ivory placeholder:text-ivory/40"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="q-msg" className="text-[10px] uppercase tracking-[0.25em] text-ivory/70">
                    Project details
                  </Label>
                  <Textarea
                    id="q-msg"
                    rows={4}
                    placeholder="Type of project, approximate m², location, preferred finish…"
                    className="border-ivory/25 bg-transparent text-ivory placeholder:text-ivory/40"
                  />
                </div>
              </div>
              <Button
                type="submit"
                size="lg"
                className="mt-6 w-full rounded-full bg-gold text-charcoal hover:bg-gold/90"
              >
                Send enquiry
              </Button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="grid gap-10 md:grid-cols-4">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3">
                  <img src={logoAsset.url} alt="" width={40} height={40} className="h-10 w-auto" />
                  <div>
                    <p className="text-sm font-semibold">SKY 40 - 40 COMPANY LTD</p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      Est. 2024 · Manufacturer · Takoradi, Ghana
                    </p>
                  </div>
                </div>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Ghanaian tile and SPC flooring manufacturer, producing in
                  Egyam, Takoradi from the finest imported raw materials.
                  Walk as a millionaire.
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground">
                  Explore
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {navLinks.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="hover:text-foreground">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground">
                  Factory
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>{PHONE_DISPLAY}</li>
                  <li className="break-all">{EMAIL}</li>
                  <li>{FACTORY_PLUSCODE}</li>
                  <li>Egyam, Takoradi · Ghana</li>
                  <li>
                    <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground">
                      <Instagram className="h-3.5 w-3.5" /> @{INSTAGRAM}
                    </a>
                  </li>
                </ul>
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground">
                  Legal
                </p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><Link to="/refund-policy" className="hover:text-foreground">No Refund Policy</Link></li>
                  <li><Link to="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="hover:text-foreground">Terms & Conditions</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 flex flex-col justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
              <p className="flex items-center gap-2">
                <GhanaFlag className="h-3 w-[18px] rounded-[1px] ring-1 ring-border" />
                © {new Date().getFullYear()} SKY 40 - 40 Company Ltd. Proudly Ghanaian manufacturer.
              </p>
              <p className="flex items-center gap-2">
                Registered in Ghana · VAT compliant
                <GhanaFlag className="h-3 w-[18px] rounded-[1px] ring-1 ring-border" />
              </p>

            </div>
          </div>
        </footer>
      </main>
      <CompanyChat />
    </div>
  );
}
