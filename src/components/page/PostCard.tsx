import Link from "next/link";
import { Arrow, Icon } from "@/components/home/ui";
import { formatDate, type Post } from "@/content/posts";
import CoverImage from "./CoverImage";

export function PostMeta({ post, onDark = false }: { post: Post; onDark?: boolean }) {
  return (
    <span className={`flex items-center gap-3 font-text text-[13px] ${onDark ? "text-ivory/60" : "text-slate-ink"}`}>
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
      <span className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/15 transition-colors duration-300 group-hover:border-ink-900 group-hover:bg-ink-900 group-hover:text-white">
        <Arrow />
      </span>
    </span>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.slug}`} className="lux-focus group flex h-full flex-col rounded-[22px]">
      <CoverImage
        src={post.cover}
        alt={post.title}
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        zoom
        className="aspect-[16/10] rounded-[22px] ring-1 ring-ink-900/[0.06]"
      />
      <span className="mt-6 block">
        <PostMeta post={post} />
      </span>
      <span className="mt-3 block font-sans text-[1.35rem] font-semibold leading-snug tracking-[-0.02em] transition-colors group-hover:text-royal">
        {post.title}
      </span>
      <span className="mt-3 line-clamp-3 block flex-1 font-text text-[15px] leading-relaxed text-slate-ink">{post.excerpt}</span>
      <span className="mt-6">
        <ReadLink />
      </span>
    </Link>
  );
}
