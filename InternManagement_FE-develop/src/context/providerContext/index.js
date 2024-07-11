import { store } from "@/store";
import { Provider } from "react-redux";

export default function ContextProvider({ children }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}