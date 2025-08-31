import { Detector, Offline, Online } from "react-detect-offline";
import AppNavbar from "./Navbar";
import { Outlet } from "react-router-dom";
import AppFooter from "./Footer";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import GoTopBtn from "../components/shared/GoTopBtn";

export default function Layout() {
  return (
    <main className="dark:bg-gray-900 dark:text-gray-100">
      <GoTopBtn/>
      <AppNavbar />
      <div className="min-h-screen">
        <Toast className="fixed top-19 right-3 z-50 shadow-lg shadow-gray-900">
          <Detector
            render={({ online }) => (
              <>
                <div
                  className={`${
                    online ? "normal" : "warning"
                  } flex items-center gap-3`}
                >
                  {online ? (
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                      <HiCheck className="h-5 w-5" />
                    </div>
                  ) : (
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                      <HiX className="h-5 w-5" />
                    </div>
                  )}
                  You are currently {online ? "online" : "offline"}
                </div>
                <ToastToggle />
              </>
            )}
          />
        </Toast>
        <Outlet />
      </div>
      <AppFooter />
    </main>
  );
}
