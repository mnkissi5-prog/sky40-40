import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Globe2,
  Mail,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import logoAsset from "@/assets/sky4040-logo.png.asset.json";
import heroShowroom from "@/assets/hero-showroom.jpg";
import tileMarble from "@/assets/tile-marble.jpg";
import tilePorcelain from "@/assets/tile-porcelain.jpg";
import tileWood from "@/assets/tile-wood.jpg";
import tileTerrazzo from "@/assets/tile-terrazzo.jpg";
import tileSlate from "@/assets/tile-slate.jpg";
import tileMosaic from "@/assets/tile-mosaic.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

type Product = {
  id: string;
  name: string;
  collection: string;
  origin: string;
  size: string;
  finish: string;
  pricePerSqm: number;
  image: string;
  category: "Marble" | "Porcelain" | "Wood-Look" | "Terrazzo" | "Slate" | "Mosaic";
  tag?: string;
};

const CURRENCY = "GH₵";

const products: Product[] = [
  {
    id: "carrara-statuario",
    name: "Statuario Bianco",
    collection: "Carrara Signature",
    origin: "Carrara, Italy",
    size: "600 × 1200 mm",
    finish: "Polished",
    pricePerSqm: 480,
    image: tileMarble,
    category: "Marble",
    tag: "Bestseller",
  },
  {
    id: "sahara-porcelain",
    name: "Sahara Sand",
    collection: "Desert Stone",
    origin: "Castellón, Spain",
    size: "800 × 800 mm",
    finish: "Matte",
    pricePerSqm: 210,
    image: tilePorcelain,
    category: "Porcelain",
  },
  {
    id: "walnut-plank",
    name: "Walnut Reserve",
    collection: "Heritage Wood",
    origin: "Bologna, Italy",
    size: "200 × 1200 mm",
    finish: "Textured",
    pricePerSqm: 265,
    image: tileWood,
    category: "Wood-Look",
    tag: "New",
  },
  {
    id: "terrazzo-oro",
    name: "Terrazzo Oro",
    collection: "Atelier",
    origin: "Vicenza, Italy",
    size: "600 × 600 mm",
    finish: "Honed",
    pricePerSqm: 395,
    image: tileTerrazzo,
    category: "Terrazzo",
  },
  {
    id: "onyx-slate",
    name: "Onyx Slate",
    collection: "Noir",
    origin: "İzmir, Türkiye",
    size: "300 × 900 mm",
    finish: "Riven",
    pricePerSqm: 240,
    image: tileSlate,
    category: "Slate",
  },
  {
    id: "emerald-mosaic",
    name: "Emerald Kente",
    collection: "Atelier",
    origin: "Valencia, Spain",
    size: "300 × 300 mm sheet",
    finish: "Gloss + Gold Grout",
    pricePerSqm: 620,
    image: tileMosaic,
    category: "Mosaic",
    tag: "Signature",
  },
];

const categories = [
  "All",
  "Marble",
  "Porcelain",
  "Wood-Look",
  "Terrazzo",
  "Slate",
  "Mosaic",
] as const;
type Category = (typeof categories)[number];

const navLinks = [
  { label: "Collections", href: "#collections" },
  { label: "Origins", href: "#origins" },
  { label: "Showroom", href: "#showroom" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

type CartItem = { productId: string; sqm: number };
const CART_KEY = "sky4040-cart-v1";

function formatPrice(n: number) {
  return `${CURRENCY} ${n.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch { /* noop */ }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch { /* noop */ }
  }, [cart, hydrated]);

  const productMap = useMemo(
    () => Object.fromEntries(products.map((p) => [p.id, p])),
    [],
  );

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  const cartCount = cart.reduce((n, i) => n + i.sqm, 0);
  const subtotal = cart.reduce(
    (sum, i) => sum + (productMap[i.productId]?.pricePerSqm ?? 0) * i.sqm,
    0,
  );
  const delivery = subtotal > 5000 || subtotal === 0 ? 0 : 350;
  const total = subtotal + delivery;

  function addToCart(id: string, sqm = 5) {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === id);
      if (existing) {
        return prev.map((i) =>
          i.productId === id ? { ...i, sqm: i.sqm + sqm } : i,
        );
      }
      return [...prev, { productId: id, sqm }];
    });
    toast.success(`${productMap[id]?.name} added`, {
      description: `${sqm} m² added to your order`,
    });
  }

  function updateSqm(id: string, sqm: number) {
    if (sqm <= 0) {
      setCart((prev) => prev.filter((i) => i.productId !== id));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.productId === id ? { ...i, sqm } : i)),
      );
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Announcement bar */}
      <div className="border-b border-border bg-charcoal text-ivory">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-2 px-4 text-[11px] font-medium uppercase tracking-[0.25em]">
          <Sparkles className="h-3 w-3 text-gold" />
          Complimentary delivery on orders over {CURRENCY} 5,000
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
              <span className="block text-base font-semibold leading-none tracking-tight text-foreground">
                SKY 4040
              </span>
              <span className="mt-1 block text-[10px] font-medium leading-none tracking-[0.35em] text-muted-foreground">
                LIMITED · GHANA
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
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
            <a href="tel:+233208167576" className="hidden lg:block">
              <Button variant="ghost" size="sm" className="gap-2 text-sm">
                <Phone className="h-4 w-4" />
                020 816 7576
              </Button>
            </a>
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative gap-2 rounded-full border-foreground/20 px-4">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="hidden sm:inline">Cart</span>
                  {hydrated && cart.length > 0 && (
                    <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-charcoal px-1.5 text-[11px] font-semibold text-ivory">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <CartDrawer
                cart={cart}
                productMap={productMap}
                subtotal={subtotal}
                delivery={delivery}
                total={total}
                updateSqm={updateSqm}
                onCheckout={() => {
                  setCartOpen(false);
                  setCheckoutOpen(true);
                }}
              />
            </Sheet>
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
                href="tel:+233208167576"
                className="mt-3 flex items-center gap-2 rounded-md bg-charcoal px-4 py-3 text-sm font-medium text-ivory"
              >
                <Phone className="h-4 w-4" /> 020 816 7576
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
              alt="Luxury interior finished with SKY 4040 marble tiles"
              className="h-full w-full object-cover"
              width={1600}
              height={1000}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/50 to-charcoal/20" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-12 lg:px-8 lg:py-40">
            <div className="lg:col-span-7">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-ivory/25 bg-ivory/5 px-4 py-1.5 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-ivory/90">
                  Est. 2024 · Takoradi, Ghana
                </span>
              </div>
              <h1 className="font-serif text-balance text-5xl leading-[1.02] text-ivory sm:text-6xl lg:text-7xl">
                Floors that make you
                <br />
                <em className="not-italic text-gold">walk as a millionaire.</em>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg">
                SKY 4040 LIMITED curates the world's finest tiles — hand-picked from
                Italy, Spain and Türkiye — and delivers them to your home or project
                site anywhere in Ghana. Order online, sample in showroom, install with
                confidence.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="#collections">
                  <Button size="lg" className="h-12 gap-2 rounded-full bg-ivory px-7 text-charcoal hover:bg-ivory/90">
                    Shop the collection
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
                <a href="#showroom">
                  <Button size="lg" variant="outline" className="h-12 gap-2 rounded-full border-ivory/40 bg-transparent px-7 text-ivory hover:bg-ivory/10 hover:text-ivory">
                    Book a showroom visit
                  </Button>
                </a>
              </div>

              <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-ivory/15 pt-8">
                {[
                  { k: "6", v: "Signature collections" },
                  { k: "3", v: "Source countries" },
                  { k: "48h", v: "Accra & Kumasi delivery" },
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
              { icon: Globe2, label: "Imported from Italy, Spain & Türkiye" },
              { icon: ShieldCheck, label: "PEI IV commercial-grade rated" },
              { icon: Truck, label: "Nationwide delivery from Takoradi" },
              { icon: Award, label: "10-year manufacturer warranty" },
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

        {/* Collections */}
        <section id="collections" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                  The Collection
                </p>
                <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                  Tiles chosen with intention.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Every piece in our catalogue is sourced from a mill we've visited,
                  tested for Ghana's climate, and priced for lifelong ownership.
                </p>
              </div>
              <div className="hidden md:block">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Free swatches on request
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
                      alt={`${p.name} tile from ${p.origin}`}
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
                    <button
                      onClick={() => addToCart(p.id)}
                      className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 bg-charcoal/95 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ivory opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 sm:text-xs"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" /> Add 5m² to cart
                    </button>
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
                        {p.origin} · {p.size} · {p.finish}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-xl text-foreground">
                        {formatPrice(p.pricePerSqm)}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        per m²
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2 sm:hidden">
                    <Button
                      onClick={() => addToCart(p.id)}
                      className="w-full gap-2 rounded-full"
                      size="sm"
                    >
                      <ShoppingBag className="h-4 w-4" /> Add 5m²
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Origins */}
        <section id="origins" className="border-y border-border bg-charcoal py-24 text-ivory">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                  Our Origins
                </p>
                <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                  Imported by us.
                  <br />
                  Curated for Ghana.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/75">
                  We are not a factory — we are a Ghanaian house of taste. Our
                  founders travel to Italy, Spain and Türkiye each season to walk
                  the mills, pull samples, and negotiate directly. That's how we
                  keep world-class quality within reach of Ghanaian homes and
                  contractors.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { c: "Italy", d: "Marble, terrazzo, wood-look porcelain" },
                  { c: "Spain", d: "Large-format porcelain, mosaics" },
                  { c: "Türkiye", d: "Natural slate & travertine" },
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
                    <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                    <div>
                      <p className="font-serif text-xl text-ivory">
                        Warehoused in Takoradi
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ivory/70">
                        Our climate-controlled facility in the Western Region
                        holds full pallets ready for same-week dispatch across
                        Ghana and ECOWAS.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section id="values" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                  Our Standard
                </p>
                <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground">
                  A house built on six values.
                </h2>
              </div>
              <ol className="lg:col-span-2 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {[
                  { t: "Sankofa Craft", d: "Learn from the master mills of Europe, then build something worthy of home." },
                  { t: "Integrity", d: "Honest square-metre pricing. No hidden cutting, no swapped batches." },
                  { t: "Excellence", d: "PEI IV grade or we don't stock it. Water absorption tested for coastal Ghana." },
                  { t: "Community", d: "Ghanaian-owned, Ghanaian-run. We train the fitters we recommend." },
                  { t: "Longevity", d: "Every collection carries a 10-year manufacturer warranty in writing." },
                  { t: "Partnership", d: "Architects, contractors and homeowners get one dedicated account manager." },
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

        {/* Showroom / how to order */}
        <section id="showroom" className="border-t border-border bg-secondary/40 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                How it works
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                From selection to installation.
              </h2>
            </div>
            <ol className="mt-14 grid gap-6 md:grid-cols-4">
              {[
                { n: "01", t: "Browse online", d: "Filter by material, finish and format. Add to cart in m²." },
                { n: "02", t: "Request samples", d: "We courier three free swatches anywhere in Ghana." },
                { n: "03", t: "Order & pay", d: "Momo, bank transfer or card. 30-day terms for trade accounts." },
                { n: "04", t: "Delivered & fitted", d: "48h to Accra & Kumasi. Certified fitters on request." },
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
        <section id="journal" className="py-24">
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
                Get in touch
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                Speak with a specialist.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/75">
                Whether it's a single bathroom or a 40-storey tower, our team will
                spec, price and schedule your order — usually within the same
                working day.
              </p>
              <div className="mt-10 space-y-5">
                <a
                  href="tel:+233208167576"
                  className="group flex items-center gap-4 border-b border-ivory/15 pb-5"
                >
                  <Phone className="h-5 w-5 text-gold" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-ivory/60">
                      Call
                    </p>
                    <p className="font-serif text-2xl text-ivory group-hover:text-gold">
                      020 816 7576
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-4 border-b border-ivory/15 pb-5">
                  <Mail className="h-5 w-5 text-gold" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-ivory/60">
                      Email
                    </p>
                    <p className="font-serif text-2xl">orders@sky4040.gh</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="h-5 w-5 text-gold" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-ivory/60">
                      Showroom
                    </p>
                    <p className="font-serif text-2xl">
                      Harbour Road, Takoradi
                    </p>
                    <p className="text-xs text-ivory/70">
                      Mon–Sat · 8:00 – 18:00 GMT
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Enquiry received", {
                  description: "A specialist will contact you within one working day.",
                });
                (e.currentTarget as HTMLFormElement).reset();
              }}
              className="rounded-none border border-ivory/15 bg-ivory/5 p-8 backdrop-blur"
            >
              <h3 className="font-serif text-2xl text-ivory">Request a quote</h3>
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
                <div className="space-y-1.5 sm:col-span-2">
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
                    placeholder="Type of project, approximate m², location…"
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
                      Est. 2024 · Takoradi, Ghana
                    </p>
                  </div>
                </div>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  A Ghanaian house importing and delivering the world's finest
                  tiles. Walk as a millionaire.
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
                  Contact
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>020 816 7576</li>
                  <li>orders@sky4040.gh</li>
                  <li>Harbour Road, Takoradi</li>
                </ul>
              </div>
            </div>
            <div className="mt-12 flex flex-col justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
              <p>© {new Date().getFullYear()} SKY 40 - 40 Company Ltd. Proudly Ghanaian.</p>
              <p>Registered in Ghana · VAT compliant</p>
            </div>
          </div>
        </footer>
      </main>

      {/* Checkout dialog */}
      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        cart={cart}
        productMap={productMap}
        subtotal={subtotal}
        delivery={delivery}
        total={total}
        onSuccess={() => {
          setCart([]);
          setCheckoutOpen(false);
        }}
      />
    </div>
  );
}

function CartDrawer({
  cart,
  productMap,
  subtotal,
  delivery,
  total,
  updateSqm,
  onCheckout,
}: {
  cart: CartItem[];
  productMap: Record<string, Product>;
  subtotal: number;
  delivery: number;
  total: number;
  updateSqm: (id: string, sqm: number) => void;
  onCheckout: () => void;
}) {
  return (
    <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
      <SheetHeader className="border-b border-border p-6">
        <SheetTitle className="font-serif text-2xl">Your order</SheetTitle>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto">
        {cart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-10 text-center">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            <p className="font-serif text-xl">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">
              Explore the collection to begin your order.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {cart.map((item) => {
              const p = productMap[item.productId];
              if (!p) return null;
              return (
                <li key={item.productId} className="flex gap-4 p-6">
                  <img
                    src={p.image}
                    alt={p.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 flex-shrink-0 object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="font-serif text-lg leading-tight">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.size}</p>
                      </div>
                      <button
                        onClick={() => updateSqm(p.id, 0)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-end justify-between pt-3">
                      <div className="flex items-center gap-1 rounded-full border border-border">
                        <button
                          onClick={() => updateSqm(p.id, item.sqm - 1)}
                          className="p-1.5 text-muted-foreground hover:text-foreground"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-14 text-center text-sm font-medium">
                          {item.sqm} m²
                        </span>
                        <button
                          onClick={() => updateSqm(p.id, item.sqm + 1)}
                          className="p-1.5 text-muted-foreground hover:text-foreground"
                          aria-label="Increase"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="font-serif text-lg">
                        {formatPrice(p.pricePerSqm * item.sqm)}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {cart.length > 0 && (
        <SheetFooter className="flex-col gap-0 border-t border-border bg-secondary/40 p-6 sm:flex-col sm:space-x-0">
          <div className="w-full space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span>{delivery === 0 ? "Complimentary" : formatPrice(delivery)}</span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span className="font-serif text-xl">{formatPrice(total)}</span>
            </div>
          </div>
          <Button
            size="lg"
            className="mt-5 w-full rounded-full bg-charcoal text-ivory hover:bg-charcoal/90"
            onClick={onCheckout}
          >
            Proceed to checkout
          </Button>
        </SheetFooter>
      )}
    </SheetContent>
  );
}

function CheckoutDialog({
  open,
  onOpenChange,
  cart,
  productMap,
  subtotal,
  delivery,
  total,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  cart: CartItem[];
  productMap: Record<string, Product>;
  subtotal: number;
  delivery: number;
  total: number;
  onSuccess: () => void;
}) {
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    if (!open) setPlaced(false);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        {placed ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
            <DialogHeader className="mt-4">
              <DialogTitle className="text-center font-serif text-3xl">
                Order received
              </DialogTitle>
              <DialogDescription className="text-center">
                A specialist will call you within the hour to confirm delivery
                and payment details.
              </DialogDescription>
            </DialogHeader>
            <Button
              className="mt-8 rounded-full"
              onClick={() => {
                onSuccess();
              }}
            >
              Continue browsing
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-3xl">Checkout</DialogTitle>
              <DialogDescription>
                Confirm your delivery details. Payment is arranged on
                confirmation.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setPlaced(true);
                toast.success("Order placed", {
                  description: `Total ${formatPrice(total)} · we'll call to confirm.`,
                });
              }}
              className="space-y-4"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="c-name">Full name</Label>
                  <Input id="c-name" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-phone">Phone</Label>
                  <Input id="c-phone" type="tel" required placeholder="024 …" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="c-addr">Delivery address</Label>
                  <Textarea id="c-addr" required rows={2} placeholder="City, area, landmark" />
                </div>
              </div>

              <div className="rounded-md border border-border bg-secondary/40 p-4 text-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  Order summary
                </p>
                <ul className="mt-3 space-y-1.5">
                  {cart.map((i) => {
                    const p = productMap[i.productId];
                    if (!p) return null;
                    return (
                      <li key={i.productId} className="flex justify-between">
                        <span>
                          {p.name} · {i.sqm} m²
                        </span>
                        <span>{formatPrice(p.pricePerSqm * i.sqm)}</span>
                      </li>
                    );
                  })}
                </ul>
                <Separator className="my-3" />
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span>{delivery === 0 ? "Complimentary" : formatPrice(delivery)}</span>
                </div>
                <div className="mt-2 flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span className="font-serif text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full bg-charcoal text-ivory hover:bg-charcoal/90"
                >
                  Place order
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
