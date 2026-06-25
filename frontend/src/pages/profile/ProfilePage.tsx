import { useAuthStore } from "@app/store/authStore";
export const ProfilePage = () => {
  const { user } = useAuthStore();
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Профиль</h1>
      <div className="bg-surface-card border border-white/10 rounded-2xl p-6">
        <p className="font-bold text-lg">{user?.name}</p>
        <p className="text-gray-400 text-sm">{user?.email}</p>
        <span className="inline-block mt-2 text-xs font-mono px-2 py-1 rounded bg-primary/10 border border-primary/20 text-primary">
          {user?.role}
        </span>
      </div>
    </div>
  );
};
