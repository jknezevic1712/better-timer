"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
// custom hooks
import useStore from "../_store/store";

export default function Home() {
  const storeUser = useStore((state) => state.user);

  useEffect(() => {
    if (!storeUser) {
      redirect("/auth");
    }

    redirect("/trackers");
  }, []);

  return <></>;
}
