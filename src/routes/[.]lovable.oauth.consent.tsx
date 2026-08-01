import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({
    authorization_id: typeof search.authorization_id === "string" ? search.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("This authorization request is missing its ID.");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      const next = location.pathname + location.searchStr;
      throw redirect({ to: "/login", search: { next } });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id");
    if (!authorizationId) throw new Error("This authorization request is invalid.");
    const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(authorizationId);
    if (error) throw error;
    const immediate = data && "redirect_url" in data ? data.redirect_url : undefined;
    if (immediate && !("client" in data)) throw redirect({ href: immediate });
    return data;
  },
  head: () => ({
    meta: [
      { title: "Authorize integration | SKY 4040" },
      { name: "description", content: "Review and authorize an agent integration for SKY 4040 LIMITED." },
      { property: "og:title", content: "Authorize integration | SKY 4040" },
      { property: "og:description", content: "Review and authorize an agent integration for SKY 4040 LIMITED." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ConsentPage,
  errorComponent: ({ error }) => (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <section className="w-full max-w-md border border-border bg-card p-8">
        <h1 className="font-serif text-3xl text-foreground">Connection unavailable</h1>
        <p role="alert" className="mt-4 text-sm leading-6 text-muted-foreground">
          {error instanceof Error ? error.message : "This authorization request could not be loaded."}
        </p>
      </section>
    </main>
  ),
});

function ConsentPage() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientName = details?.client?.name ?? "an AI assistant";

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const result = approve
      ? await supabase.auth.oauth.approveAuthorization(authorization_id)
      : await supabase.auth.oauth.denyAuthorization(authorization_id);
    if (result.error) {
      setBusy(false);
      setError(result.error.message);
      return;
    }
    const target = result.data?.redirect_url;
    if (!target) {
      setBusy(false);
      setError("The authorization service did not return a destination.");
      return;
    }
    window.location.assign(target);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <section className="w-full max-w-lg border border-border bg-card p-7 shadow-sm sm:p-10">
        <div className="flex size-11 items-center justify-center rounded-full bg-secondary text-forest">
          <ShieldCheck className="size-5" />
        </div>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-gold">Secure connection</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground">
          Connect {clientName} to SKY 4040
        </h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          This lets {clientName} call SKY 4040's enabled company, product, SPC specification, contact and trade-information tools as you.
        </p>
        <div className="mt-7 border-y border-border py-5 text-sm text-foreground">
          <p className="font-medium">Access being requested</p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>• View your basic profile and email address</li>
            <li>• Call the five read-only SKY 4040 information tools</li>
          </ul>
        </div>
        <p className="mt-5 text-xs leading-5 text-muted-foreground">
          This connection cannot bypass app permissions or backend policies.
        </p>
        {error ? <p role="alert" className="mt-5 text-sm text-destructive">{error}</p> : null}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" disabled={busy} onClick={() => decide(false)}>Cancel connection</Button>
          <Button disabled={busy} onClick={() => decide(true)}>{busy ? "Working…" : "Approve connection"}</Button>
        </div>
      </section>
    </main>
  );
}