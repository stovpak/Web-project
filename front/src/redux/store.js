import { configureStore } from "@reduxjs/toolkit";
// reducer
import reducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage: storage,
    blacklist: ["likes"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export default { store, persistor };