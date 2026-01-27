import { createContext, useReducer } from "react";

// По сути, это мини-Redux, встроенный в React:
// useReducer = reducer + dispatch
// CounterContext = глобальное хранилище
// CounterContextProvider = аналог Redux Provider

const NotReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload; // текст уведомления
    case "CLEAR":
      return ""; // скрыть уведомление
    default:
      return state;
  }
};
const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notDispatch] = useReducer(NotReducer, "");

  return (
    <NotificationContext.Provider value={{ notification, notDispatch }}>
      {props.children} {/* всё что внутри провайдера */}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
