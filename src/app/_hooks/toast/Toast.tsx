import hotToast from "react-hot-toast";

type ToastType = "success" | "warning" | "error";
export default function useToast() {
  function setToastTypeColors(type: ToastType) {
    switch (type) {
      case "success":
        return "bg-green-400";
      case "warning":
        return "bg-yellow-300";
      case "error":
        return "bg-red-300";
    }
  }

  function toast(message: string, type: ToastType) {
    return hotToast(message, {
      duration: 3000,
      position: "top-center",
      className: `py-2 px-4 font-bold capitalize ${setToastTypeColors(type)}`,
    });
  }

  return toast;
}
