import { useNavigate } from "react-router-dom";
import { useCartStore } from "@app/store/cartStore";
import { formatPrice }  from "@shared/lib";
import { Button }       from "@shared/ui";
import type { Listing } from "../model/types";

export const ListingCard = ({ listing }: { listing: Listing }) => {
  const navigate  = useNavigate();
  const { add, has } = useCartStore();
  const inCart    = has(listing.id);

  return (
    <div
      className="bg-surface-card border border-white/[0.06] rounded-2xl overflow-hidden cursor-pointer
                 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl"
      onClick={() => navigate(`/listings/${listing.id}`)}
    >
      <div className="h-44 bg-surface-hover flex items-center justify-center text-5xl opacity-30 relative">
        🏠
        <span className="absolute top-2 left-2 text-xs font-mono bg-black/60 border border-white/10 rounded-full px-2 py-1">
          📍 {listing.city}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-sm mb-1 leading-tight">{listing.title}</h3>
        <p className="text-xs text-gray-500 mb-3">{listing.category.name} · {listing.address}</p>
        {/* .slice().map() из лекции */}
        <div className="flex flex-wrap gap-1 mb-3">
          {listing.amenities.slice(0, 3).map((a) => (
            <span key={a.id} className="text-xs px-2 py-1 rounded-full bg-surface-hover border border-white/10 text-gray-400">
              {a.icon} {a.name}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <div>
            <span className="font-bold text-base">{formatPrice(listing.price)}</span>
            <span className="text-xs text-gray-500"> / ночь</span>
          </div>
          <Button
            variant={inCart ? "secondary" : "primary"}
            size="sm"
            onClick={(e) => { e.stopPropagation(); if (!inCart) add(listing); }}
            disabled={inCart}
          >
            {inCart ? "✓ В корзине" : "+ В корзину"}
          </Button>
        </div>
      </div>
    </div>
  );
};
