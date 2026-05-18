import { supabase } from "@/integrations/supabase/client";

export type NewsCategory =
  | "School Events"
  | "Sport"
  | "Creative School"
  | "Community"
  | "Sacrament";

export const NEWS_CATEGORIES: NewsCategory[] = [
  "School Events",
  "Sport",
  "Creative School",
  "Community",
  "Sacrament",
];

export type NewsIllustration = "books" | "field" | "music" | "community" | "art";
export const NEWS_ILLUSTRATIONS: NewsIllustration[] = ["books", "field", "music", "community", "art"];

export interface NewsPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: NewsCategory;
  illustration: NewsIllustration | null;
  date: string;
  feature: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export async function fetchPublishedNews(limit?: number): Promise<NewsPost[]> {
  let q = supabase
    .from("news_posts")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });
  if (limit) q = q.limit(limit);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as NewsPost[];
}

export async function fetchPostBySlug(slug: string): Promise<NewsPost | null> {
  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw error;
  return (data as NewsPost) ?? null;
}

export async function fetchAllNewsAdmin(): Promise<NewsPost[]> {
  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw error;
  return (data ?? []) as NewsPost[];
}

export async function fetchPostByIdAdmin(id: string): Promise<NewsPost | null> {
  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as NewsPost) ?? null;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
