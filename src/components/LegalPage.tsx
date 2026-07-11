import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import logoAsset from "@/assets/sky4040-logo.png.asset.json";
import type { ReactNode } from "react";

export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-20 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="SKY 4040" className="h-10 w-auto" />
            <span className="text-sm font-semibold">SKY 40 - 40 COMPANY LTD</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Last updated: {updated}
        </p>
        <div className="prose prose-sm mt-10 max-w-none space-y-6 text-foreground/85 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-foreground [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1">
          {children}
        </div>
        <div className="mt-16 border-t border-border pt-6 text-xs text-muted-foreground">
          Questions? Email <a className="underline" href="mailto:SKY4040a1@gmail.com">SKY4040a1@gmail.com</a> or call 020 816 7576.
        </div>
      </main>
    </div>
  );
}
