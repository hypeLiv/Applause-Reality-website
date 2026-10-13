import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Discover NCR Property Blogs | Real Estate Insights",
  description: "Delhi NCR real estate guides and project insights from Applause Reality.",
};

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-[1000px] px-6 pb-24 pt-36 md:pt-44">
      <p className="mb-6 font-text text-sm text-navy">All Posts</p>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/post/${post.slug}`}
            className="group flex flex-col border border-black/10 bg-white transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h2 className="line-clamp-3 font-display text-xl font-semibold leading-snug group-hover:text-navy">
                {post.title}
              </h2>
              <p className="mt-3 line-clamp-3 font-text text-sm text-black/70">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
