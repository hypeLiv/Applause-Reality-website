import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/home/motion";
import SmoothScroll from "@/components/home/SmoothScroll";
import { Arrow, Icon, lux } from "@/components/home/ui";
import { ArticleToc, ReadingProgress } from "@/components/page/ArticleChrome";
import CoverImage from "@/components/page/CoverImage";
import { PostCard } from "@/components/page/PostCard";
import { Cta } from "@/components/sections";
import { formatDate, posts, type PostBlock } from "@/content/posts";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { absolute, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { getPosts, getSiteMedia } from "@/sanity/media";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

const findPost = async (slug: string) => (await getPosts()).find((p) => p.slug === slug);

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await findPost((await params).slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    images: [post.cover],
    type: "article",
    publishedTime: post.date || undefined,
  });
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/^\d+\.\s*/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** "Label: rest" → a bold lead-in, which most of these guides use for scannable points. */
function Rich({ text }: { text: string }) {
  const m = text.match(/^([^:]{2,42}):\s+(.+)$/);
  if (!m) return <>{text}</>;
  return (
    <>
      <b>{m[1]}:</b> {m[2]}
    </>
  );
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 id={slugify(block.text)}>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "quote":
      return <blockquote>&ldquo;{block.text}&rdquo;</blockquote>;
    case "note":
      return <aside>{block.text}</aside>;
    case "ul":
    case "ol": {
      const List = block.type;
      return (
        <List>
          {block.items.map((item) => (
            <li key={item.slice(0, 32)}>
              <Rich text={item} />
            </li>
          ))}
        </List>
      );
    }
    default:
      return (
        <p>
          <Rich text={block.text} />
        </p>
      );
  }
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const [all, media] = await Promise.all([getPosts(), getSiteMedia()]);
  const post = all.find((p) => p.slug === slug);
  if (!post) notFound();

  const headings = post.body
    .filter((b): b is { type: "h2"; text: string } => b.type === "h2")
    .map((b) => ({ id: slugify(b.text), text: b.text.replace(/^\d+\.\s*/, "") }));
  const more = all.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Credited to the business until the client confirms per-post authors.
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [absolute(post.cover)],
    ...(post.date ? { datePublished: post.date, dateModified: post.date } : {}),
    author: { "@id": absolute("/#business") },
    publisher: { "@id": absolute("/#business") },
    mainEntityOfPage: absolute(`/blog/${post.slug}`),
    inLanguage: "en-IN",
  };

  return (
    <ReadingProgress>
      <SmoothScroll />
      <JsonLd data={articleSchema} />

      {/* Masthead */}
      <header className="lux-scope lux-grain relative isolate overflow-hidden bg-ink-950 px-6 pb-56 pt-36 text-ivory md:px-10 md:pb-72 md:pt-44">
        <div aria-hidden className="absolute -left-40 -top-40 -z-10 h-[480px] w-[620px] rounded-full bg-royal/30 blur-[140px]" />
        <div className="mx-auto max-w-[920px]">
          <Reveal>
            <Breadcrumbs
              tone="dark"
              items={[
                { name: "Home", href: "/" },
                { name: "Blog", href: "/blog" },
                { name: post.title, href: `/blog/${post.slug}` },
              ]}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-10 flex flex-wrap items-center gap-3 font-text text-[13px] text-ivory/60">
              <span className="rounded-full border border-white/20 px-3 py-1 font-semibold uppercase tracking-[0.14em] text-accent-soft">
                {post.topic}
              </span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden className="h-1 w-1 rounded-full bg-current opacity-50" />
              <span className="inline-flex items-center gap-1.5">
                <Icon name="clock" className="h-3.5 w-3.5" />
                {post.readMinutes} min read
              </span>
            </p>
            <h1 className="lux-display mt-6 text-[clamp(2.2rem,4.6vw,3.9rem)] leading-[1.06]">
              {post.title}
            </h1>
            <p className="mt-6 max-w-[40rem] font-text text-lg leading-relaxed text-ivory/65">{post.excerpt}</p>
          </Reveal>
        </div>
      </header>

      <div className="lux-scope lux-on-light bg-white px-6 pb-24 text-ink-900 md:px-10 md:pb-32">
        <Reveal className="relative z-10 mx-auto -mt-44 max-w-[1100px] md:-mt-60">
          <CoverImage
            src={post.cover}
            alt={post.coverAlt ?? post.title}
            sizes="(min-width: 1100px) 1100px, 100vw"
            priority
            className="aspect-[16/9] rounded-[28px] shadow-[0_40px_80px_-40px_rgba(11,23,51,0.55)]"
          />
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-[1100px] gap-12 md:mt-20 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <ArticleToc headings={headings} />
            </div>
          </aside>

          <div className="min-w-0">
            <article className="lux-prose max-w-[68ch]">
              {post.body.length > 0 ? (
                post.body.map((b, i) => <Block key={i} block={b} />)
              ) : (
                <p>{post.excerpt}</p>
              )}
            </article>

            {/* Who's behind the desk */}
            <div className="mt-16 flex max-w-[68ch] items-center gap-5 border-t border-ink-900/[0.08] pt-10">
              <Image
                src={media.founderPortrait.src}
                alt={media.founderPortrait.alt}
                width={112}
                height={140}
                className="h-16 w-16 shrink-0 rounded-full object-cover object-top"
              />
              <div className="flex-1">
                <p className="font-text text-xs font-semibold uppercase tracking-[0.18em] text-slate-ink">From the advisory desk</p>
                <p className="mt-1 font-sans text-lg font-semibold">Applause Reality, led by Rajiv Kr. Pandey</p>
                <p className="mt-1 font-text text-sm text-slate-ink">
                  23+ years guiding families and banking professionals through Delhi NCR property.{" "}
                  <Link href="/about-applause-reality" className="lux-focus font-semibold text-royal underline-offset-4 hover:underline">
                    About us
                  </Link>
                </p>
              </div>
            </div>

            {/* Consultation */}
            <div className="lux-grain relative isolate mt-12 max-w-[68ch] overflow-hidden rounded-[24px] bg-ink-950 p-8 text-ivory md:p-10">
              <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-royal/40 blur-[90px]" />
              <p className="lux-label text-accent-soft">Free consultation</p>
              <p className="mt-5 font-sans text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-tight tracking-[-0.025em]">
                Talk to a Delhi NCR property advisor.
              </p>
              <p className="mt-3 font-text text-[15px] leading-relaxed text-ivory/65">
                Share your budget and timeline — we&rsquo;ll shortlist bank-approved options that fit.
              </p>
              <Cta href={site.whatsapp} className={`${lux.primary} mt-7`}>
                Free consultation <Arrow />
              </Cta>
            </div>
          </div>
        </div>
      </div>

      {/* Keep reading */}
      <section className="lux-scope lux-on-light bg-ivory px-6 py-24 text-ink-900 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="lux-display text-[clamp(2rem,3.4vw,3rem)]">Keep reading</h2>
            <Link href="/blog" className={lux.ghostLight}>
              All articles <Arrow />
            </Link>
          </div>
          <ul className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </ReadingProgress>
  );
}
