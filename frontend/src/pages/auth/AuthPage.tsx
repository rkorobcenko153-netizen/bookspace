import { useState }   from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@shared/api/axiosInstance";
import { useAuthStore }  from "@app/store/authStore";
import { Button, Input } from "@shared/ui";

export const AuthPage = () => {
  const [tab, setTab]   = useState<"login" | "register">("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate  = useNavigate();

  const handle = async () => {
    setLoading(true); setError("");
    try {
      const url  = tab === "login" ? "/auth/login" : "/auth/register";
      const body = tab === "login"
        ? { email: form.email, password: form.password }
        : form;
      const { data } = await axiosInstance.post<{ data: { user: any; accessToken: string } }>(url, body);
      login(data.data.user, data.data.accessToken);
      navigate("/");
    } catch (e: any) {
      setError(e.response?.data?.message ?? "Ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-8">
      <div className="bg-surface-card border border-white/10 rounded-3xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-black text-center mb-6 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
          BookSpace
        </h1>
        <div className="flex bg-surface-hover rounded-lg p-1 mb-6">
          {(["login", "register"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${tab === t ? "bg-surface-card text-white" : "text-gray-400"}`}>
              {t === "login" ? "Войти" : "Регистрация"}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {tab === "register" && (
            <Input label="Имя" placeholder="Ваше имя" value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          )}
          <Input label="Email" type="email" placeholder="email@example.com" value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          <Input label="Пароль" type="password" placeholder="••••••••" value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            onKeyDown={(e) => e.key === "Enter" && handle()} />
          {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">⚠ {error}</p>}
          <Button onClick={handle} isLoading={loading} className="w-full mt-2">
            {tab === "login" ? "Войти" : "Создать аккаунт"}
          </Button>
        </div>
        <div className="mt-5 pt-4 border-t border-white/10 text-center">
          <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">Тестовые аккаунты</p>
          {[["user","user123"],["owner","owner123"],["admin","admin123"]].map(([u,p]) => (
            <button key={u} onClick={() => setForm((f) => ({ ...f, email: `${u}@bookspace.ru`, password: p }))}
              className="block w-full text-left text-xs px-3 py-2 rounded-lg bg-surface-hover border border-white/[0.06] mb-1 text-gray-400 hover:text-white transition-colors">
              {u}@bookspace.ru / {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
