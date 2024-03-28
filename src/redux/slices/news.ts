import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eventService from "../../services/event/event.service";
import { EventNewState } from "../../@types/news";

export const getNewsEvent = createAsyncThunk(
    "get/getNewsEvent",
    async (params: any) => {
      const { data } = await eventService.get(params);
      return data;
    }
  );
  export const getOneEvent = createAsyncThunk(
    "get/getOneEvent",
    async (id: any) => {
      const { data } = await eventService.getOne(id);
      return data;
    }
  );
  const initialState: EventNewState = {
    news: [],
  };
  const slice = createSlice({
    name: "Event",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getNewsEvent.fulfilled, (state, action) => {
          state.news = action.payload.items;
        });   
    },
  });
  export default slice.reducer;
  