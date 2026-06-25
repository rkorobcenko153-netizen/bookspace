import { AppRouter } from "./router/AppRouter";
import { Toaster } from "@shared/ui/Toaster";

export const App = () => {
  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
};
