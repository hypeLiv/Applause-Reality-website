import Link from "next/link";
import { Bezel, Icon } from "@/components/home/ui";
import { formatDate, type Post } from "@/content/posts";
import CoverImage from "./CoverImage";

export function PostMeta({ post, onDark = false }: { post: Post; onDark?: boolean }) {
  return (
    <span className={`flex flex-wrap items-center gap-x-3 gap-y-1 whitespace-nowrap font-text text-[13px] ${onDark ? "text-ivory/60" : "text-slate-ink"}`}>
      <span className="font-semibold">{post.topic}</span>
      <span aria-hidden className="h-1 w-1 rounded-full bg-current opacity-40" />
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden className="h-1 w-1 rounded-full bg-current opacity-40" />
      <span className="inline-flex items-center gap-1.5">
        <Icon name="clock" className="h-3.5 w-3.5" />
        {post.readMinutes} min
      </span>
    </span>
  );
}

export function ReadLink() {
  return (
    <span className="inline-flex items-center gap-3 font-text text-[15px] font-semibold text-ink-900">
      Read article
      {/* Island: fills, nudges up-right and swells slightly on hover of the parent card. */}
      <span className="grid h-10 w-10 place-items-center rounded-full bg-ink-900/[0.06] ring-1 ring-ink-900/10 transition-[background-color,color,translate,scale] duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-px group-hover:translate-x-1 group-hover:scale-105 group-hover:bg-ink-900 group-hover:text-white">
        <Icon name="arrow" className="h-4 w-4" />
      </span>
    </span>
  );
}

/**
 * Article card in a light bezel. `wide` lays the cover beside the copy from
 * md up (the blog index's staggered column); otherwise it stacks.
 */
export function PostCard({ post, wide = false }: { post: Post; wide?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="lux-focus group block h-full rounded-[2rem] transition-[translate] duration-700 ease-[var(--ease-spring)] hover:-translate-y-1"
    >
      <Bezel
        tone="light"
        className="h-full"
        coreClassName={`flex h-full bg-white ${wide ? "flex-col md:grid md:grid-cols-[0.95fr_1.05fr]" : "flex-col"}`}
      >
        <CoverImage
          src={post.cover}
          alt={post.coverAlt ?? post.title}
          sizes={wide ? "(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
          zoom
          className={wide ? "aspect-[16/10] md:aspect-auto md:min-h-[260px]" : "aspect-[16/10]"}
        />
        <span className="flex flex-1 flex-col p-5 sm:p-6 md:p-7">
          <PostMeta post={post} />
          <span className="mt-3 block font-sans text-[1.35rem] font-semibold leading-snug tracking-[-0.02em] transition-colors duration-500 ease-[var(--ease-spring)] group-hover:text-royal">
            {post.title}
          </span>
          <span className="mt-3 line-clamp-3 block flex-1 font-text text-[15px] leading-relaxed text-slate-ink">
            {post.excerpt}
          </span>
          <span className="mt-6">
            <ReadLink />
          </span>
        </span>
      </Bezel>
    </Link>
  );
}
