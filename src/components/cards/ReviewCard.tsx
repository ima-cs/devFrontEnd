import { StarRating } from "@/components/StarRating";
import { formatDate } from "@/lib/utils";
import type { Review } from "@/types/database";

interface ReviewCardProps {
  review: Review;
  authorName?: string | null;
}

export function ReviewCard({ review, authorName }: ReviewCardProps) {
  return (
    <article className="rounded-xl border border-stone-200 bg-white p-4">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-stone-900">
            {authorName || "Client"}
          </p>
          <p className="text-xs text-stone-500">{formatDate(review.created_at)}</p>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </header>
      {review.comment && (
        <p className="mt-3 text-sm text-stone-700">{review.comment}</p>
      )}
    </article>
  );
}
