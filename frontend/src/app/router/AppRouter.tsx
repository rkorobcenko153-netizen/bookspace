import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage }    from "@pages/home";
import { ListingPage } from "@pages/listing";
import { ProfilePage } from "@pages/profile";
import { AuthPage }    from "@pages/auth";
import { AdminPage }   from "@pages/admin";
import { ProtectedRoute } from "./ProtectedRoute";
import { Header } from "@widgets/header";

export const AppRouter = () => (
  <>
    <Header />
    <Routes>
      <Route path="/"            element={<HomePage />} />
      <Route path="/listings/:id" element={<ListingPage />} />
      <Route path="/auth"        element={<AuthPage />} />
      <Route
        path="/profile"
        element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
      />
      <Route
        path="/admin"
        element={<ProtectedRoute roles={["ADMIN"]}><AdminPage /></ProtectedRoute>}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
);
