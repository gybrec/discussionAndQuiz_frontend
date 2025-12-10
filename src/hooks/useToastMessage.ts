import { toast } from "sonner";

export function useToastMessage() {
  const toastError = (msg: string) => {
    toast.error(msg, {
      closeButton: true,
      invert: false,
      style: {
        background: "#ff0000", // full solid red
        color: "#ffffff",      // white text
      },
    });
  };

  const toastSuccess = (msg: string) => {
    toast.success(msg, {
      closeButton: true,
      invert: false,
      style: {
        background: "#00c853", // solid green
        color: "#ffffff",
      },
    });
  };

  const toastWarning = (msg: string) => {
    toast(msg, {
      closeButton: true,
      invert: false,
      style: {
        background: "#ffb300", // solid yellow/orange
        color: "#ffffff",
      },
    });
  };

  const toastInfo = (msg: string) => {
    toast.info(msg, {
      closeButton: true,
      invert: false,
      style: {
        background: "#1e88e5", // solid blue
        color: "#ffffff",
      },
    });
  };

  const toastDefault = (msg: string) => {
    toast(msg, {
      closeButton: true,
      invert: false,
      style: {
        background: "#424242", // solid dark grey
        color: "#ffffff",
      },
    });
  };

  return {
    toastError,
    toastSuccess,
    toastWarning,
    toastInfo,
    toastDefault,
  };
}
