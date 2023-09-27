import { useRouter, usePathname } from "next/navigation";
// components
import Link from "next/link";
import { Button } from "primereact/button";
// hooks
import useFirebaseAuth from "@/app/_hooks/firebase/auth";
import { Menu } from "primereact/menu";
import { useRef } from "react";
import type { MenuItem } from "primereact/menuitem";

export default function HeaderActions() {
  const { signOutUser } = useFirebaseAuth();
  const menuRight = useRef<Menu>(null);
  const router = useRouter();
  const currentRoute = usePathname();

  const items: MenuItem[] = [
    {
      label: "Trackers",
      icon: "pi pi-clock",
      command: () => {
        router.push("/trackers");
      },
    },
    {
      label: "History",
      icon: "pi pi-history",
      command: () => {
        router.push("/history");
      },
    },
    {
      label: "Logout",
      icon: "pi pi-power-off",
      command: () => {
        signOutUser();
      },
    },
  ];

  function setCorrectBorderColor(name: string) {
    if (currentRoute === name) return "border-primary";
    return "border-zinc-100";
  }

  return (
    <>
      <div className="hidden h-full items-center md:flex">
        <Link
          href="/trackers"
          className={`flex h-full items-center rounded-sm border-b-4 ${setCorrectBorderColor(
            "/trackers",
          )}`}
        >
          <Button className="gap-2 bg-transparent" icon="pi pi-clock">
            Trackers
          </Button>
        </Link>
        <Link
          href="/history"
          className={`flex h-full items-center rounded-sm border-b-4 ${setCorrectBorderColor(
            "/history",
          )}`}
        >
          <Button className="gap-2 bg-transparent" icon="pi pi-history">
            History
          </Button>
        </Link>

        <Button
          className="h-full gap-2 bg-transparent"
          icon="pi pi-power-off"
          onClick={() => signOutUser()}
        >
          Logout
        </Button>
      </div>

      <div className="flex md:hidden">
        <Menu
          model={items}
          popup
          ref={menuRight}
          id="popup_menu_right"
          popupAlignment="right"
        />
        <Button
          icon="pi pi-bars"
          className="mr-2"
          onClick={(event) => menuRight.current?.toggle(event)}
          aria-controls="popup_menu_right"
          aria-haspopup
        />
      </div>
    </>
  );
}
