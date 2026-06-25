import { useState }        from "react";
import { useListingStore }  from "@app/store/listingStore";
import { Button, Input }    from "@shared/ui";

const CATEGORIES = [
  { id: "", label: "Все" },
  { id: "apartments", label: "Апартаменты" },
  { id: "cottages",   label: "Коттеджи" },
  { id: "hotels",     label: "Отели" },
  { id: "villas",     label: "Виллы" },
];

export const SearchFilters = () => {
  const { filters, setFilter } = useListingStore();
  const [query, setQuery]      = useState(filters.search);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Search bar */}
      <div className="flex items-center bg-surface-card border border-white/10 rounded-full px-5 py-2 gap-3 mb-4 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <input
          className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-gray-500"
          placeholder="Поиск по названию или городу..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setFilter("search", query)}
        />
        <Button size="sm" onClick={() => setFilter("search", query)}>Найти</Button>
      </div>
      {/* Category pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {/* .map() из лекции — рендерим категории */}
        {CATEGORIES.map((c) => (
          <button key={c.id} onClick={() => setFilter("categoryId", c.id)}
            className={`text-xs font-medium px-4 py-2 rounded-full border transition-all ${
              filters.categoryId === c.id
                ? "bg-primary/20 border-primary/50 text-purple-300"
                : "border-white/10 bg-surface-card text-gray-400 hover:text-white hover:border-primary/30"
            }`}>
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
};
