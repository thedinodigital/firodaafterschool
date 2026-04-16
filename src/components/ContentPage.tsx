import { ReactNode } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/PageHero";
import { Seo } from "@/components/Seo";

interface ContentPageProps {
  title: string;
  metaTitle?: string;
  metaDescription: string;
  eyebrow?: string;
  description?: ReactNode;
  breadcrumb?: { name: string; href: string }[];
  variant?: "cream" | "warm" | "forest";
  children: ReactNode;
}

export function ContentPage({
  title,
  metaTitle,
  metaDescription,
  eyebrow,
  description,
  breadcrumb,
  variant = "cream",
  children,
}: ContentPageProps) {
  const titleNode =
    typeof title === "string" && title.includes("|")
      ? (() => {
          const [a, b] = title.split("|");
          return (
            <>
              {a.trim()} <span className="italic text-accent">{b.trim()}</span>
            </>
          );
        })()
      : title;
  return (
    <Layout>
      <Seo title={metaTitle || `${title} — Holy Cross N.S., Firoda`} description={metaDescription} />
      <PageHero
        eyebrow={eyebrow}
        title={titleNode}
        description={description}
        breadcrumb={breadcrumb}
        variant={variant}
      />
      <section className="bg-cream">
        <div className="container py-14 lg:py-20">
          <div className="prose prose-lg max-w-3xl
            prose-headings:font-heading prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-foreground
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-foreground/80 prose-p:leading-relaxed
            prose-li:text-foreground/80
            prose-strong:text-foreground
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-accent prose-blockquote:text-foreground/70 prose-blockquote:not-italic
          ">
            {children}
          </div>
        </div>
      </section>
    </Layout>
  );
}
