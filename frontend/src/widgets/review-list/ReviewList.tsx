interface Review {
  id: string; rating: number; comment: string;
  user: { name: string }; createdAt: string;
}

export const ReviewList = ({ reviews }: { reviews: Review[] }) => (
  <div className="space-y-3">
    {/* .map() из лекции */}
    {reviews.map((r) => (
      <div key={r.id} className="bg-surface-card border border-white/10 rounded-xl p-4">
        <div className="flex justify-between mb-2">
          <span className="font-semibold text-sm">{r.user.name}</span>
          <span className="text-amber-400 text-sm">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
        </div>
        <p className="text-sm text-gray-400">{r.comment}</p>
      </div>
    ))}
  </div>
);
