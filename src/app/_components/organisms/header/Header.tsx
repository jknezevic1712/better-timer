"use client";

import { useEffect, useState } from "react";
// components
import HeaderNav from "../../molecules/headerNav/HeaderNav";
import useStore from "@/app/_store/store";
import type { User } from "firebase/auth";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const storeUser = useStore((state) => state.user);

  useEffect(() => {
    setUser(storeUser);
  }, [storeUser]);

  return (
    <header className="flex h-20 w-full items-center justify-between rounded-b-2xl bg-accent px-4 text-zinc-100">
      <h1 className="text-lg font-semibold italic">Tracking tool</h1>

      {user && <HeaderNav />}
    </header>
  );
}
