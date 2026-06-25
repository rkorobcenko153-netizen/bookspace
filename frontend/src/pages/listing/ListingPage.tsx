import { useParams } from "react-router-dom";
import { BookingForm } from "@widgets/booking-form";

export const ListingPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <p className="text-gray-400 text-sm mb-4">← Назад к каталогу</p>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div>
          <div className="h-72 bg-surface-card rounded-2xl flex items-center justify-center text-8xl mb-6">🏠</div>
          <h1 className="text-3xl font-black mb-3">Объект #{id}</h1>
          <p className="text-gray-400">Загрузка деталей объекта...</p>
        </div>
        <BookingForm listingId={id ?? ""} price={0} />
      </div>
    </div>
  );
};
