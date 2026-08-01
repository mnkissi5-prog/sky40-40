import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";

function safeNext(value: string | undefined) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/";
}

export const Route = createFileRoute("/login")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({
    next: typeof search.next === "string" ? search.next : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign in | SKY 4040 LIMITED" },
      { name: "description", content: "Sign in securely to authorize SKY 4040 agent integrations." },
      { property: "og:title", content: "Sign in | SKY 4040 LIMITED" },
      { property: "og:description", content: "Sign in securely to authorize SKY 4040 agent integrations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ href: safeNext(next) });
    });
  }, [navigate, next]);

  async function signIn() {
    setBusy(true);
    setError(null);
    sessionStorage.setItem("sky4040-auth-next", safeNext(next));
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/login",
      extraParams: { prompt: "select_account" },
    });
    if (result.error) {
      setError(result.error.message);
      setBusy(false);
      return;
    }
    if (!result.redirected) {
      const target = sessionStorage.getItem("sky4040-auth-next") ?? safeNext(next);
      sessionStorage.removeItem("sky4040-auth-next");
      window.location.assign(target);
    }
  }

  useEffect(() => {
    const remembered = sessionStorage.getItem("sky4040-auth-next");
    if (!remembered) return;
    void supabase.auth.getSession().then(({ data }) => {
      if (!data.session) return;
      sessionStorage.removeItem("sky4040-auth-next");
      window.location.assign(safeNext(remembered));
    });
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <section className="w-full max-w-md border border-border bg-card p-7 shadow-sm sm:p-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Home
        </Link>
        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.24em] text-gold">SKY 4040 LIMITED</p>
        <h1 className="mt-3 font-serif text-4xl text-foreground">Sign in securely</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Continue with Google to review and approve an agent integration.
        </p>
        {error ? <p role="alert" className="mt-5 text-sm text-destructive">{error}</p> : null}
        <Button className="mt-8 w-full" size="lg" disabled={busy} onClick={signIn}>
          <Chrome /> {busy ? "Opening Google…" : "Continue with Google"}
        </Button>
        <p className="mt-6 text-xs leading-5 text-muted-foreground">
          Signing in does not approve a connection. You will review access on the next screen.
        </p>
      </section>
    </main>
  );
}