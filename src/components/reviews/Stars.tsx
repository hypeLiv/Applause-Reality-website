/** A row of five stars in Google's review yellow; partial ratings fill the last star proportionally. */
export default function Stars({
  rating = 5,
  size = "h-4 w-4",
  className = "",
}: {
  rating?: number;
  /** Size classes for each star. */
  size?: string;
  /** Classes for the row itself (spacing, alignment). */
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`Rated ${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <svg key={i} viewBox="0 0 24 24" className={size} aria-hidden>
            <defs>
              <linearGradient id={`star-${i}-${Math.round(fill * 100)}`}>
                <stop offset={`${fill * 100}%`} stopColor="#fbbc04" />
                <stop offset={`${fill * 100}%`} stopColor="#dadce0" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#star-${i}-${Math.round(fill * 100)})`}
              d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"
            />
          </svg>
        );
      })}
    </span>
  );
}
