import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Types/User.tsx";

interface AuthorizedUserState {
  authorizedUser: User | null;
}

const initialState: AuthorizedUserState = {
  authorizedUser: {} as User,
};

const authorizedUserSlice = createSlice({
  name: "authorizedUser",
  initialState,
  reducers: {
    setAuthorizedUser(state, action: PayloadAction<User>) {
      state.authorizedUser = action.payload;
    },
    clearAuthorizedUser(state) {
      state.authorizedUser = null;
    },
  }
});

export const {
  setAuthorizedUser,
  clearAuthorizedUser,
} = authorizedUserSlice.actions;
export default authorizedUserSlice.reducer;
