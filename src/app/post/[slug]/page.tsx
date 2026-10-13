import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cta, btn } from "@/components/sections";
import { getPost, posts } from "@/content/posts";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.cover] },
  };
}

export default async function PostPage({ params }: Params) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-[760px] px-6 pb-24 pt-36 md:pt-44">
      <Link href="/blog" className="font-text text-sm text-navy hover:underline">
        ← All Posts
      </Link>
      <h1 className="mt-6 font-display text-3xl font-semibold leading-tight md:text-[42px]">{post.title}</h1>
      <div className="relative mt-8 aspect-[16/9] overflow-hidden">
        <Image src={post.cover} alt={post.title} fill priority sizes="760px" className="object-cover" />
      </div>

      <div className="prose-post mt-10 font-text">
        {post.body.length > 0 ? (
          post.body.map((b, i) =>
            b.type === "h2" ? <h2 key={i}>{b.text}</h2> : <p key={i}>{b.text}</p>,
          )
        ) : (
          <p>{post.excerpt}</p>
        )}
      </div>

      <div className="mt-14 rounded-xl bg-mist p-8 text-center">
        <p className="font-display text-2xl font-semibold">Talk to a Delhi NCR property advisor</p>
        <Cta href={site.whatsapp} className={`${btn.navy} mt-6`}>
          Free Consultation
        </Cta>
      </div>
    </article>
  );
}
