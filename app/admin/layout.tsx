import type { ReactNode } from "react";

import "../globals.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-alabaster/80 pb-24 pt-32">
      <div className="container-max flex flex-col gap-12">{children}</div>
    </div>
  );
}

