import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import authorizedUserSlice from "./slices/authorizedUserSlice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "userSession",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, authorizedUserSlice);

const store = configureStore({
  reducer: {
    authorizedUser: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;
export { store, persistor, RootState };
