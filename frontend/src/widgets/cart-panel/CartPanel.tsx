import { useCartStore }   from "@app/store/cartStore";
import { calcNights, formatPrice } from "@shared/lib";
import { Button }          from "@shared/ui";

interface Props { onClose: () => void; onCheckout: () => void; }

export const CartPanel = ({ onClose, onCheckout }: Props) => {
  const { items, remove, updateDates, total } = useCartStore();
  const today = new Date().toISOString().split("T")[0];

  // .reduce() из лекции
  const totalNights = items.reduce((s, i) => s + calcNights(i.dateFrom, i.dateTo), 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md h-full bg-surface-card border-l border-white/10 flex flex-col"
           onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-white/[0.06] flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">Корзина</h2>
            <p className="text-sm text-gray-400">{items.length} объект{items.length === 1 ? "" : "ов"}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-surface-hover border border-white/10 text-gray-400 hover:text-white">×</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <p className="text-4xl mb-3 opacity-30">🛒</p>
              <p className="font-bold text-white">Корзина пуста</p>
            </div>
          )}
          {/* .map() из лекции */}
          {items.map(({ listing, dateFrom, dateTo }) => {
            const n   = calcNights(dateFrom, dateTo);
            const sub = listing.price * n;
            return (
              <div key={listing.id} className="bg-surface-hover border border-white/[0.06] rounded-xl p-4 mb-3">
                <div className="flex justify-between mb-3">
                  <div>
                    <p className="font-bold text-sm">{listing.title}</p>
                    <p className="text-xs text-gray-500">📍 {listing.city} · {listing.category.name}</p>
                  </div>
                  <button onClick={() => remove(listing.id)} className="text-gray-500 hover:text-red-400 text-lg leading-none">×</button>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-semibold mb-1">Заезд</p>
                    <input type="date" value={dateFrom} min={today}
                      onChange={(e) => updateDates(listing.id, "dateFrom", e.target.value)}
                      className="w-full bg-surface-card border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none focus:border-primary/50" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-semibold mb-1">Выезд</p>
                    <input type="date" value={dateTo} min={dateFrom || today}
                      onChange={(e) => updateDates(listing.id, "dateTo", e.target.value)}
                      className="w-full bg-surface-card border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none focus:border-primary/50" />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/[0.06]">
                  <span className="text-xs text-gray-400">{n > 0 ? `${n} ночей × ${formatPrice(listing.price)}` : "⚠ Укажите даты"}</span>
                  <span className="font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">{n > 0 ? formatPrice(sub) : "—"}</span>
                </div>
              </div>
            );
          })}
        </div>
        {items.length > 0 && (
          <div className="p-4 border-t border-white/[0.06]">
            <div className="bg-surface-hover rounded-xl p-4 mb-3">
              <div className="flex justify-between text-sm text-gray-400 mb-2"><span>Объектов</span><span>{items.length}</span></div>
              <div className="flex justify-between text-sm text-gray-400 mb-2"><span>Ночей</span><span>{totalNights}</span></div>
              <div className="flex justify-between font-bold pt-3 border-t border-white/[0.06]">
                <span>К оплате</span>
                <span className="text-xl bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">{formatPrice(total())}</span>
              </div>
            </div>
            <Button onClick={onCheckout} className="w-full" disabled={totalNights === 0}>
              {totalNights === 0 ? "Укажите даты" : `Оформить — ${formatPrice(total())}`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
