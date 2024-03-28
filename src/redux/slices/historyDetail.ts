import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "../../services/category/category.service";
import { CategoryState } from "../../@types/category";
import historyService from "../../services/history/history.service";
import { HistoryState } from "../../@types/history";
import { HistoryDetailState } from "../../@types/historyDetail";

export const getHistoryDetail = createAsyncThunk(
    "get/getHistoryDetail",
    async (params: any) => {
      const { data } = await historyService.getDetail(params);
      return data;
    }
  );


  const initialState: HistoryDetailState = {
    historyDetailList: [],
    historydetail:{
      id: 0,
      billId: 0,
      productId:0,
      quantity:0,
      unitPrice:0,

    },
    historycount:0
  };
  const slice = createSlice({
    name: "HistoryDetail",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getHistoryDetail.fulfilled, (state, action) => {
          state.historyDetailList = action.payload.result.items;
          state.historycount = action.payload.result.totalCount;
        });
    },
  });
  export default slice.reducer;
  