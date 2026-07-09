import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  Factory,
  Gem,
  Handshake,
  Leaf,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Star,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import logoAsset from "@/assets/sky4040-logo.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Values", href: "#values" },
  { label: "Heritage", href: "#heritage" },
  { label: "Contact", href: "#contact" },
];

const coreValues = [
  {
    title: "Craftsmanship",
    description:
      "Every product is shaped with precision, patience, and pride by skilled Ghanaian hands.",
    icon: Gem,
  },
  {
    title: "Integrity",
    description:
      "We build trust the same way we build our goods — honestly, solidly, and to last.",
    icon: ShieldCheck,
  },
  {
    title: "Excellence",
    description:
      "From raw material to finished piece, we pursue quality that reflects the millionaire in you.",
    icon: Award,
  },
  {
    title: "Community",
    description:
      "We invest in local talent and create opportunities for families across Takoradi and beyond.",
    icon: Users,
  },
  {
    title: "Sustainability",
    description:
      "Responsible sourcing and mindful production protect Ghana's forests for future generations.",
    icon: Leaf,
  },
  {
    title: "Partnership",
    description:
      "We walk with our customers, suppliers, and team as one family toward shared success.",
    icon: Handshake,
  },
];

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt="SKY 4040 LIMITED logo"
              width={56}
              height={56}
              className="h-12 w-auto object-contain"
            />
            <span className="hidden text-lg font-bold leading-tight tracking-tight text-foreground sm:inline">
              SKY 4040
              <br />
              <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground">
                LIMITED
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
              >
                {link.label}
              </a>
            ))}
            <a href="tel:+233208167576" className="ml-4">
              <Button size="sm" className="gap-2">
                <Phone className="h-4 w-4" />
                Call Us
              </Button>
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
            <nav className="flex flex-col gap-1 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+233208167576"
                className="mt-2 flex items-center gap-2 rounded-md bg-primary px-4 py-3 text-base font-medium text-primary-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone className="h-4 w-4" />
                020 816 7576
              </a>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section
          id="home"
          className="relative overflow-hidden border-b border-border bg-gradient-to-br from-background via-background to-secondary py-24 sm:py-32 lg:py-40"
        >
          <div className="absolute inset-0 wood-grain opacity-50" />
          <div className="absolute right-0 top-0 h-2 w-full kente-stripe" />
          <div className="absolute bottom-0 left-0 h-2 w-full kente-stripe" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="text-center lg:text-left">
                <div className="mb-6 inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
                  <Star className="mr-2 h-4 w-4 text-gold" />
                  Established 2024 in Takoradi, Ghana
                </div>
                <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Walk as a{" "}
                  <span className="relative inline-block text-forest">
                    Millionaire
                    <svg
                      className="absolute -bottom-2 left-0 w-full text-gold"
                      viewBox="0 0 300 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 8C50 2 100 2 150 6C200 10 250 10 298 4"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
                  SKY 4040 LIMITED manufactures premium wood products in Takoradi, Ghana.
                  We blend Ghanaian heritage with modern craftsmanship so every step you
                  take feels like success.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                  <a href="#contact">
                    <Button size="lg" className="gap-2 px-8 text-base">
                      <Phone className="h-5 w-5" />
                      Contact Us
                    </Button>
                  </a>
                  <a href="#about">
                    <Button size="lg" variant="outline" className="px-8 text-base">
                      Discover Our Story
                    </Button>
                  </a>
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-card p-8 shadow-2xl ring-1 ring-border">
                  <div className="absolute inset-0 wood-grain opacity-30" />
                  <div className="relative flex h-full flex-col items-center justify-center text-center">
                    <img
                      src={logoAsset.url}
                      alt="SKY 4040 LIMITED brand logo with wood grain patterns"
                      width={320}
                      height={320}
                      className="h-auto w-full max-w-[280px] object-contain"
                    />
                    <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                      Manufactured in Takoradi, Ghana
                    </p>
                  </div>
                </div>
                {/* Decorative shapes */}
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-2xl bg-gold/20 blur-2xl" />
                <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-forest/10 blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* About / Manufacturing */}
        <section id="about" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Built in Ghana, Made for Greatness
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  SKY 4040 LIMITED is a proudly Ghanaian manufacturing company based in
                  the vibrant industrial city of Takoradi. Since 2024, we have been
                  transforming locally sourced timber into beautifully finished products
                  that bring warmth, elegance, and lasting value to homes and businesses.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  Our slogan, <strong>“Walk as a Millionaire,”</strong> is more than a
                  tagline — it is a promise. Every floorboard, fitting, and finish we
                  produce is designed to make you feel confident, accomplished, and
                  grounded in quality.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <Card className="bg-secondary/50">
                    <CardContent className="flex items-start gap-4 p-5">
                      <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                        <Factory className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Local Production</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Made from Ghanaian timber by Ghanaian craftspeople.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/50">
                    <CardContent className="flex items-start gap-4 p-5">
                      <div className="rounded-lg bg-gold/20 p-2.5 text-foreground">
                        <MapPin className="h-6 w-6 text-gold-dark" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Takoradi Roots</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Headquartered in the Western Region of Ghana.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl bg-card p-8 shadow-xl ring-1 ring-border">
                  <div className="absolute inset-0 wood-grain opacity-20" />
                  <div className="relative space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-primary-foreground">
                        <Factory className="h-7 w-7" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Company Name
                        </p>
                        <p className="text-lg font-bold text-foreground">
                          SKY 40 - 40 COMPANY LTD
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-foreground">
                        <Award className="h-7 w-7" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Established
                        </p>
                        <p className="text-lg font-bold text-foreground">2024</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-wood text-foreground">
                        <MapPin className="h-7 w-7" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Location
                        </p>
                        <p className="text-lg font-bold text-foreground">
                          Takoradi, Ghana
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Phone className="h-7 w-7" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Phone
                        </p>
                        <a
                          href="tel:+233208167576"
                          className="text-lg font-bold text-foreground hover:text-primary"
                        >
                          020 816 7576
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section id="values" className="relative border-y border-border bg-secondary/30 py-20 sm:py-28">
          <div className="absolute left-0 top-0 h-1.5 w-full kente-stripe" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Core Values
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The principles that guide every board we cut, every finish we apply, and
                every customer we serve.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {coreValues.map((value) => (
                <Card
                  key={value.title}
                  className="group overflow-hidden border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex rounded-xl bg-secondary p-3 text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <value.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Ghanaian Heritage */}
        <section id="heritage" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-forest px-6 py-16 text-primary-foreground sm:px-12 lg:py-24">
              <div className="absolute inset-0 opacity-10">
                <svg
                  className="h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <pattern id="adinkra" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="2" fill="currentColor" />
                    <rect x="4" y="4" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100" height="100" fill="url(#adinkra)" />
                </svg>
              </div>
              <div className="absolute right-0 top-0 h-2 w-full bg-gradient-to-r from-kente-red via-kente-gold to-kente-green" />

              <div className="relative mx-auto max-w-3xl text-center">
                <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                  A Touch of Ghana in Every Piece
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-cream/90">
                  Ghana is a land of rich culture, bold patterns, and resilient spirit. At
                  SKY 4040 LIMITED, we honor that heritage by using local materials,
                  empowering local workers, and infusing our products with the warmth and
                  character of home. From the forests of the Western Region to the floors of
                  your space, we carry Ghana forward — one step at a time.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <div className="rounded-full border border-cream/20 bg-cream/10 px-5 py-2 text-sm font-medium backdrop-blur">
                    🇬🇭 Proudly Ghanaian
                  </div>
                  <div className="rounded-full border border-cream/20 bg-cream/10 px-5 py-2 text-sm font-medium backdrop-blur">
                    🌳 Sustainably Sourced
                  </div>
                  <div className="rounded-full border border-cream/20 bg-cream/10 px-5 py-2 text-sm font-medium backdrop-blur">
                    🏭 Made in Takoradi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-border bg-secondary/30 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Let's Build Something Great Together
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Ready to walk as a millionaire? Reach out to SKY 4040 LIMITED for
                  orders, partnerships, or to learn more about our Ghanaian-made wood
                  products.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone</p>
                      <a
                        href="tel:+233208167576"
                        className="text-lg font-semibold text-foreground hover:text-primary"
                      >
                        020 816 7576
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-foreground">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Address</p>
                      <p className="text-lg font-semibold text-foreground">
                        Takoradi, Western Region, Ghana
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wood text-foreground">
                      <Factory className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Company</p>
                      <p className="text-lg font-semibold text-foreground">
                        SKY 40 - 40 COMPANY LTD
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="w-full max-w-md overflow-hidden rounded-3xl bg-card p-8 shadow-xl ring-1 ring-border">
                  <div className="text-center">
                    <img
                      src={logoAsset.url}
                      alt="SKY 4040 LIMITED logo"
                      width={160}
                      height={160}
                      className="mx-auto h-auto w-40 object-contain"
                    />
                    <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">
                      Walk as a Millionaire
                    </p>
                    <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                      SKY 4040 LIMITED
                    </p>
                    <a href="tel:+233208167576" className="mt-6 block">
                      <Button size="lg" className="w-full gap-2 text-base">
                        <Phone className="h-5 w-5" />
                        Call 020 816 7576
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <img
                src={logoAsset.url}
                alt="SKY 4040 LIMITED logo"
                width={40}
                height={40}
                className="h-10 w-auto object-contain"
              />
              <div>
                <p className="font-bold leading-none text-foreground">SKY 4040 LIMITED</p>
                <p className="text-xs text-muted-foreground">Walk as a Millionaire</p>
              </div>
            </div>
            <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SKY 4040 LIMITED. All rights reserved.
            </p>
          </div>
          <div className="mt-8 h-1 w-full rounded-full kente-stripe" />
        </div>
      </footer>
    </div>
  );
}
