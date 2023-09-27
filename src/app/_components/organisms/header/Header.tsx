"use client";

// hooks
import useFirebaseAuth from "@/app/_hooks/firebase/auth";
// components
import Link from "next/link";
import { Button } from "primereact/button";
import HeaderActions from "../../molecules/headerActions/HeaderActions";
import { useEffect, useState } from "react";

export default function Header() {
  return (
    <header className="bg-accent flex h-full w-full items-center justify-between rounded-b-2xl text-zinc-100">
      <h1 className="p-4 text-lg font-semibold italic">Tracking tool</h1>

      {/* {user && <HeaderActions />} */}
    </header>
  );
}
