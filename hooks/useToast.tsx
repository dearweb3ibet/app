import { truncate } from "lodash";
import { useSnackbar } from "notistack";

/**
 * Hook for work with toasts.
 */
export default function useToasts() {
  const { enqueueSnackbar } = useSnackbar();

  let showToastSuccess = function (message: string) {
    enqueueSnackbar(message, {
      variant: "success",
    });
  };

  let showToastError = function (error: any) {
    let message = JSON.stringify(error);
    if (error?.message) {
      message = error.message;
    }
    if (error?.error?.data?.message) {
      message = error.error.data.message.replace("execution reverted: ", "");
    }
    message = truncate(`Error: ${message}`, { length: 256 });
    enqueueSnackbar(message, {
      variant: "error",
    });
  };

  return {
    showToastSuccess,
    showToastError,
  };
}
