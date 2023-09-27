// components
import Link from "next/link";
import { Button } from "primereact/button";
// hooks
import useFirebaseAuth from "@/app/_hooks/firebase/auth";

export default function HeaderActions() {
  const { signOutUser } = useFirebaseAuth();

  function setCorrectBorderColor() {
    return "border-primary";
  }

  return (
    <div className="flex items-center">
      <Link href={"/"}>
        <Button
          className={`gap-2 border-b bg-transparent ${setCorrectBorderColor()}`}
          icon="pi pi-clock"
        >
          Trackers
        </Button>
      </Link>
      <Button
        className={`gap-2 border-b bg-transparent ${setCorrectBorderColor()}`}
        icon="pi pi-history"
      >
        History
      </Button>
      <Button
        className={`gap-2 border-b-8 bg-transparent ${setCorrectBorderColor()}`}
        icon="pi pi-power-off"
        onClick={() => signOutUser()}
      >
        Logout
      </Button>
    </div>
  );
}
