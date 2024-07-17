import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Flip } from "react-toastify";

interface NotificationProps {
  title: string;
  type: "info" | "success" | "warning" | "error" | "default";
  transition?: ToastOptions["transition"];
}

const Notification: React.FC<NotificationProps> = ({
  title,
  type,
  transition = Flip,
}) => {
  return toast(title, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition,
    type,
  });
};

export default Notification;
