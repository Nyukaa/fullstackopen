// components/AppNotification.js
const AppNotification = ({ message, type }) => {
  if (!message) return null;

  const style = {
    color: type === "error" ? "red" : "green",
    fontSize: 16,
    borderColor: type === "error" ? "red" : "green",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={style}>{message}</div>;
};

export default AppNotification;
