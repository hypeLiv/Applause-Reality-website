import GoogleG from "@/components/reviews/GoogleG";
import Stars from "@/components/reviews/Stars";
import { site } from "@/lib/site";

/** The Google Business Profile rating as a review-site header, linking out to every review on Google. */
export default function GoogleRating({ className = "" }: { className?: string }) {
  const { rating, reviews, reviewsUrl, writeReviewUrl } = site.google;
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-x-8 gap-y-5 rounded-2xl border border-[#dadce0] bg-white px-5 py-5 shadow-[0_1px_2px_rgba(60,64,67,0.08)] md:px-7 ${className}`}
    >
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#f8f9fa] ring-1 ring-[#dadce0]">
          <GoogleG className="h-6 w-6" />
        </span>
        <div>
          <p className="font-text text-[15px] font-semibold text-[#202124]">Google reviews</p>
          <p className="mt-0.5 flex items-center gap-2 font-text text-[#3c4043]">
            <span className="text-[22px] font-semibold leading-none text-[#202124]">{rating.toFixed(1)}</span>
            <Stars rating={rating} size="h-[18px] w-[18px]" />
            <span className="text-[14px] text-[#70757a]">({reviews})</span>
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <a
          href={reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="lux-focus inline-flex items-center rounded-full border border-[#dadce0] px-5 py-2.5 font-text text-[14px] font-medium text-[#1a73e8] transition-colors hover:bg-[#f8f9fa]"
        >
          See all {reviews} reviews
        </a>
        <a
          href={writeReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="lux-focus inline-flex items-center rounded-full bg-[#1a73e8] px-5 py-2.5 font-text text-[14px] font-medium text-white transition-colors hover:bg-[#1765cc]"
        >
          Write a review
        </a>
      </div>
    </div>
  );
}
