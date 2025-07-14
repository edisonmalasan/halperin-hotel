import { ReactNode } from "react";
import AdminNav from "./components/AdminNav";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#faf8f3]">
      <aside className="hidden md:block w-64">
        <AdminNav />
      </aside>
      <div className="flex-1 flex flex-col">
        {/* Mobile nav */}
        <div className="md:hidden sticky top-0 z-40 bg-white border-b border-[#8b6c26]">
          <AdminNav />
        </div>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
} 