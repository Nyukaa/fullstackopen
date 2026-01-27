import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const Notification = () => {
  const { notification } = useContext(NotificationContext);
  console.log("Notification message:", notification);
  if (!notification) return null;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: "blue",
  };

  if (!notification) {
    return null;
  }
  return <div style={style}>{notification}</div>;
};

export default Notification;
