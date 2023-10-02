import { useRouter, usePathname } from "next/navigation";
import { useRef } from "react";
// components
import Link from "next/link";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
// hooks
import useFirebaseAuth from "@/app/_hooks/firebase/useFirebaseAuth";
// types
import type { MenuItem } from "primereact/menuitem";

function DesktopNav({ signOutUser }: { signOutUser: () => void }) {
  const currentRoute = usePathname();

  function setCorrectBorderColor(name: string) {
    if (currentRoute === name) return "border-primary";
    return "border-zinc-100";
  }

  return (
    <div className="hidden h-full items-center md:flex">
      <Link
        href="/trackers"
        className={`flex h-full items-center rounded-sm border-b-4 transition-opacity hover:opacity-70 ${setCorrectBorderColor(
          "/trackers",
        )}`}
      >
        <Button className="gap-2 bg-transparent" icon="pi pi-clock">
          Trackers
        </Button>
      </Link>
      <Link
        href="/history"
        className={`flex h-full items-center rounded-sm border-b-4 transition-opacity hover:opacity-70 ${setCorrectBorderColor(
          "/history",
        )}`}
      >
        <Button className="gap-2 bg-transparent" icon="pi pi-history">
          History
        </Button>
      </Link>

      <Button
        className="h-full gap-2 bg-transparent transition-opacity hover:opacity-70"
        icon="pi pi-power-off"
        onClick={() => signOutUser()}
      >
        Logout
      </Button>
    </div>
  );
}

function MobileNav({ signOutUser }: { signOutUser: () => void }) {
  const router = useRouter();
  const menuOpened = useRef<Menu>(null);

  const menuItems: MenuItem[] = [
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

  return (
    <div className="flex md:hidden">
      <Menu
        model={menuItems}
        popup
        ref={menuOpened}
        id="popup_menu_right"
        popupAlignment="right"
      />
      <Button
        icon="pi pi-bars"
        className="mr-2"
        onClick={(event) => menuOpened.current?.toggle(event)}
        aria-controls="popup_menu_right"
        aria-haspopup
      />
    </div>
  );
}

export default function HeaderNav() {
  const { signOutUser } = useFirebaseAuth();

  return (
    <>
      <DesktopNav signOutUser={signOutUser} />
      <MobileNav signOutUser={signOutUser} />
    </>
  );
}
