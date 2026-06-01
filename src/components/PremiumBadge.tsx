import { Badge } from "@/components/ui/Badge";

export function PremiumBadge() {
  return (
    <Badge variant="premium" className="shadow-sm">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className="h-3 w-3"
      >
        <path d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.5L12 14.77 7.06 17.4 8 11.9 4 8l5.61-1.16L12 2z" />
      </svg>
      Premium
    </Badge>
  );
}
