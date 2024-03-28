import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/user/user.service";
import { UserState } from "../../@types/user";


export const getUser = createAsyncThunk(
    "get/getUser",
    async (params: any) => {
      const { data } = await userService.get(params);
      return data;
    }
  );
  export const updateUser = createAsyncThunk(
    "update/updateUser",
    async (data: any) => {
      // Assuming you have a service function for updating a brand
      const { data: updatedBrand } = await userService.put(data.id, data);
      return updatedBrand;
    }
  );
  export const updateUserLocked = createAsyncThunk(
    "update/updateUserLocked",
    async (data: any) => {
      // Assuming you have a service function for updating a brand
      const { data: updatedBrand } = await userService.putLocked(data.id, data);
      return updatedBrand;
    }
  );
  const initialState: UserState = {
    userList: [],
    userCount:0
  };
  const slice = createSlice({
    name: "User",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getUser.fulfilled, (state, action) => {
          state.userList = action.payload.result.items;
          state.userCount = action.payload.result.totalCount;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
          state.userList = state.userList.map((user) =>
          user.id === action.payload.id ? action.payload : user
          );
        });
        builder.addCase(updateUserLocked.fulfilled, (state, action) => {
          state.userList = state.userList.map((user) =>
          user.id === action.payload.id ? action.payload : user
          );
        });
    },
  });
  export default slice.reducer;