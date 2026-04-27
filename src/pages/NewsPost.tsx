import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { JsonLd, SITE_URL } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { newsItems } from "@/data/content";
import { ArrowLeft } from "lucide-react";

const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" });

const NewsPost = () => {
  const { slug } = useParams();
  const post = newsItems.find(n => n.slug === slug);
  if (!post) return <Navigate to="/news" replace />;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    articleBody: post.body,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    inLanguage: "en-IE",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/news/${post.slug}` },
    author: {
      "@type": "EducationalOrganization",
      name: "Holy Cross National School",
      url: SITE_URL,
    },
    publisher: {
      "@type": "EducationalOrganization",
      name: "Holy Cross National School",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
  };

  return (
    <Layout>
      <Seo title={`${post.title} — Holy Cross N.S., Firoda`} description={post.excerpt} />
      <JsonLd id="ld-article" data={articleJsonLd} />
      <PageHero
        eyebrow={`${post.category} · ${formatDate(post.date)}`}
        title={post.title}
        breadcrumb={[{ name: "News", href: "/news" }, { name: post.title, href: `/news/${post.slug}` }]}
      />
      <section className="bg-cream">
        <div className="container py-16 max-w-2xl">
          <div className="prose prose-lg max-w-none prose-p:text-foreground/80 prose-p:leading-relaxed prose-headings:font-heading">
            <p className="lead">{post.excerpt}</p>
            <p>{post.body}</p>
          </div>
          <Link to="/news" className="inline-flex items-center gap-2 mt-12 text-sm text-foreground/60 hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Back to all news
          </Link>
        </div>
      </section>
    </Layout>
  );
};
export default NewsPost;
