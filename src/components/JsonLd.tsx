import { useEffect } from "react";

interface JsonLdProps {
  id?: string;
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Injects a JSON-LD <script> into the document head.
 * Updates in place per `id` so navigation between pages swaps the schema cleanly.
 */
export function JsonLd({ id = "ld-json", data }: JsonLdProps) {
  useEffect(() => {
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = id;
      document.head.appendChild(el);
    }
    el.text = JSON.stringify(data);
    return () => {
      // Leave it in place — replaced on next mount with new data.
    };
  }, [id, data]);

  return null;
}

export const SITE_URL = "https://holycrossfiroda.ie";
