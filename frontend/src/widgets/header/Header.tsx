import { Link, useNavigate } from "react-router-dom";
import { useAuthStore }  from "@app/store/authStore";
import { useCartStore }  from "@app/store/cartStore";
import { useNotifStore } from "@app/store/notifStore";
import { Button }        from "@shared/ui";

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const cartCount  = useCartStore((s) => s.items.length);
  const unreadCount = useNotifStore((s) => s.unreadCount);
  const navigate   = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-2">
        <Link to="/" className="font-black text-xl bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent mr-auto">
          BookSpace
        </Link>
        <nav className="flex items-center gap-1">
          <Link to="/" className="text-sm font-medium px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface-hover transition-all">Объекты</Link>
          {isAuthenticated && (
            <Link to="/profile" className="relative text-sm font-medium px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface-hover transition-all">
              Профиль
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {unreadCount}
                </span>
              )}
            </Link>
          )}
          {isAuthenticated && user?.role === "ADMIN" && (
            <Link to="/admin" className="text-sm font-medium px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface-hover transition-all">Админ</Link>
          )}
        </nav>
        <button onClick={() => navigate("/cart")}
          className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-surface-card text-sm font-semibold text-white hover:border-primary/40 transition-all">
          🛒 Корзина
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 min-w-[20px] h-5 bg-primary text-white text-[11px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-surface">
              {cartCount}
            </span>
          )}
        </button>
        {isAuthenticated
          ? <Button variant="ghost" size="sm" onClick={logout}>Выйти</Button>
          : <Button size="sm" onClick={() => navigate("/auth")}>Войти</Button>
        }
      </div>
    </header>
  );
};
