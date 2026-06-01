import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewsCount?: number;
}

const SIZES = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function StarRating({ rating, size = "md", showValue, reviewsCount }: StarRatingProps) {
  const rounded = Math.round(rating);
  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <svg
            key={n}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
            className={cn(
              SIZES[size],
              n <= rounded ? "text-amber-400" : "text-stone-200",
            )}
          >
            <path d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.5L12 14.77 7.06 17.4 8 11.9 4 8l5.61-1.16L12 2z" />
          </svg>
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-medium text-stone-700">
          {rating ? rating.toFixed(1) : "—"}
          {reviewsCount !== undefined && (
            <span className="text-stone-500"> ({reviewsCount})</span>
          )}
        </span>
      )}
    </div>
  );
}
