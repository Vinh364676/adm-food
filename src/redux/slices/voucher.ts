import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eventService from "../../services/event/event.service";
import { EventNewState } from "../../@types/news";
import brandService from "../../services/brand/brand.service";
import { BrandState } from "../../@types/brand";
import voucherService from "../../services/voucher/voucher.service";
import { VoucherState } from "../../@types/voucher";

export const getVoucher = createAsyncThunk(
    "get/getVoucher",
    async (params: any) => {
      const { data } = await voucherService.get(params);
      return data;
    }
  );
  export const updateVoucher = createAsyncThunk(
    "update/updateVoucher",
    async (data: any) => {
      // Assuming you have a service function for updating a brand
      const { data: updatedVoucher } = await voucherService.put(data.id, data);
      return updatedVoucher;
    }
  );
  export const deleteVoucher = createAsyncThunk(
    "delete/deleteVoucher",
    async (id: number) => {

      await voucherService.delete(id);
      return id; 
    }
  );
  export const createVoucher = createAsyncThunk(
    "create/createVoucher",
    async (VoucherData: any) => {
      const { data } = await voucherService.post(VoucherData);
      return data;
    }
  );
  
  export const getByIdVoucher = createAsyncThunk(
    "get/getByIDVoucher",
    async (id: any) => {
      const { data } = await voucherService.getById(id);
      return data;
    }
  );
  export const deleteMultiple = createAsyncThunk(
    'delete/deleteMultiple',
    async (id: number[]) => {
      await voucherService.deleteAll(id);
      return id;
    }
  );
  const initialState: VoucherState = {
    voucherList: [],
    voucherDetail:{
      id: 0,
      code: "",
      startDate:"",
      endDate:"",
      value:0
    },
    voucherCount:0
  };
  const slice = createSlice({
    name: "Voucher",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getVoucher.fulfilled, (state, action) => {
          state.voucherList = action.payload.result.items;
          state.voucherCount = action.payload.result.totalCount;
        });
      builder.addCase(deleteVoucher.fulfilled, (state, action) => {
          state.voucherList = state.voucherList.filter((voucher) => voucher.id !== action.payload);
        });  
        builder.addCase(createVoucher.fulfilled, (state, action) => {
          state.voucherList.push(action.payload);
        }); 
        builder.addCase(getByIdVoucher.fulfilled, (state, action) => {
          state.voucherList = action.payload.result;
        });
        builder.addCase(updateVoucher.fulfilled, (state, action) => {
          state.voucherList = state.voucherList.map((voucher) =>
          voucher.id === action.payload.id ? action.payload : voucher
          );
        });
        builder.addCase(deleteMultiple.fulfilled, (state, action) => {
          const deletedIds = action.payload;
          state.voucherList = state.voucherList.filter((voucher) => !deletedIds.includes(voucher.id));
        });
    },
  });
  export default slice.reducer;
  