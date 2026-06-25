import { useListingStore } from "@app/store/listingStore";
import { ListingCard }      from "@entities/listing";
import { Spinner }          from "@shared/ui";

export const ListingList = () => {
  const { listings, isLoading } = useListingStore();

  if (isLoading) return (
    <div className="flex justify-center py-20"><Spinner size="lg" /></div>
  );

  if (!listings.length) return (
    <div className="text-center py-20 text-gray-500">
      <p className="text-4xl mb-4 opacity-30">🔍</p>
      <p className="text-lg font-bold text-white mb-2">Ничего не найдено</p>
      <p className="text-sm">Попробуйте изменить фильтры</p>
    </div>
  );

  // .map() из лекции — рендерим массив объектов в карточки
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {listings.map((l) => <ListingCard key={l.id} listing={l} />)}
    </div>
  );
};
