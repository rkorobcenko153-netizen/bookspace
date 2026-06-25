import { useEffect } from "react";
import { useListingStore } from "@app/store/listingStore";
import { listingApi }       from "@entities/listing";
import { SearchFilters }    from "@widgets/search-filters";
import { ListingList }      from "@widgets/listing-list";

export const HomePage = () => {
  const { filters, setListings, setLoading } = useListingStore();

  useEffect(() => {
    setLoading(true);
    listingApi
      .getAll(filters)
      .then((r) => setListings(r.data.data, r.data.total))
      .catch(() => setLoading(false));
  }, [filters]);

  return (
    <main>
      {/* Hero */}
      <section className="text-center py-20 px-4">
        <p className="font-mono text-xs tracking-widest text-cyan-400 uppercase mb-4">
          Онлайн-бронирование жилья
        </p>
        <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-4">
          Найди своё{" "}
          <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
            идеальное место
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto mb-10">
          12 объектов в 8 городах России. Добавляй в корзину и бронируй.
        </p>
        <SearchFilters />
      </section>

      {/* Listing grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-bold">Все объекты</h2>
        </div>
        <ListingList />
      </div>
    </main>
  );
};
