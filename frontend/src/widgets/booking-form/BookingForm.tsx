import { useState }    from "react";
import { bookingApi }  from "@entities/booking";
import { calcNights, formatPrice } from "@shared/lib";
import { Button, Input } from "@shared/ui";

interface Props { listingId: string; price: number; }

export const BookingForm = ({ listingId, price }: Props) => {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm]     = useState({ dateFrom: today, dateTo: today });
  const [loading, setLoading] = useState(false);
  const [done, setDone]     = useState(false);
  const [error, setError]   = useState("");

  const n     = calcNights(form.dateFrom, form.dateTo);
  const total = n * price;

  const handle = async () => {
    setLoading(true); setError("");
    try {
      await bookingApi.create({ listingId, ...form });
      setDone(true);
    } catch (e: any) {
      setError(e.response?.data?.message ?? "Ошибка");
    } finally {
      setLoading(false);
    }
  };

  if (done) return (
    <div className="bg-surface-card border border-white/10 rounded-2xl p-6 text-center">
      <p className="text-4xl mb-3">🎉</p>
      <p className="font-bold text-lg mb-1">Бронь подтверждена!</p>
      <p className="text-gray-400 text-sm">{form.dateFrom} — {form.dateTo} · {formatPrice(total)}</p>
    </div>
  );

  return (
    <div className="bg-surface-card border border-white/10 rounded-2xl p-6 sticky top-20">
      <p className="text-2xl font-black mb-1">{formatPrice(price)}<span className="text-sm text-gray-400 font-normal"> / ночь</span></p>
      <div className="grid grid-cols-2 gap-3 my-4">
        <Input label="Заезд" type="date" value={form.dateFrom} min={today}
          onChange={(e) => setForm((f) => ({ ...f, dateFrom: e.target.value }))} />
        <Input label="Выезд" type="date" value={form.dateTo} min={form.dateFrom}
          onChange={(e) => setForm((f) => ({ ...f, dateTo: e.target.value }))} />
      </div>
      {n > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-4 text-sm">
          <div className="flex justify-between text-gray-400 mb-1">
            <span>{formatPrice(price)} × {n} ночей</span><span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between font-bold text-white pt-2 border-t border-white/10">
            <span>Итого</span>
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent text-lg">{formatPrice(total)}</span>
          </div>
        </div>
      )}
      {error && <p className="text-sm text-red-400 mb-3">⚠ {error}</p>}
      <Button onClick={handle} isLoading={loading} className="w-full" disabled={n <= 0}>
        {n > 0 ? `Забронировать — ${formatPrice(total)}` : "Выберите даты"}
      </Button>
    </div>
  );
};
