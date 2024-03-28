import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import receiptService from "../../services/receipt/receipt.service";
import { ReceiptState } from "../../@types/receipt";

export const getReceipt = createAsyncThunk(
  "get/getReceipt",
  async (params: any) => {
    const { data } = await receiptService.get(params);
    return data;
  }
);
export const getReceiptDetail = createAsyncThunk(
  "get/getReceiptDetail",
  async (params: any) => {
    const { data } = await receiptService.getDetail(params);
    return data;
  }
);
  export const updateReceipt = createAsyncThunk(
    "update/updateReceipt",
    async (data: any) => {
      // Assuming you have a service function for updating a Receipt
      const { data: updatedReceipt } = await receiptService.put(data.id, data);
      return updatedReceipt;
    }
  );
  export const deleteReceipt = createAsyncThunk(
    "delete/deleteReceipt",
    async (id: number) => {

      await receiptService.delete(id);
      return id; 
    }
  );
  export const createReceipt = createAsyncThunk(
    "create/createReceipt",
    async (ReceiptData: any) => {
      const { data } = await receiptService.post(ReceiptData);
      return data;
    }
  );
  
  export const getByIdReceipt = createAsyncThunk(
    "get/getByIDReceipt",
    async (id: any) => {
      const { data } = await receiptService.getById(id);
      return data;
    }
  );
  export const deleteMultiple = createAsyncThunk(
    'delete/deleteMultiple',
    async (id: number[]) => {
      await receiptService.deleteAll(id);
      return id;
    }
  );
  const initialState: ReceiptState = {
    receiptList: [],
    receiptDetail: {  // Đảm bảo receiptDetail không phải là null
      id: 0,
      supplierId: 0,
      userId: 0,
      total:0,
      productId: 0,
      createDate: "",
      receiptDetails: [],
    },
    receiptCount: 0,
  };
  const slice = createSlice({
    name: "Receipt",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getReceipt.fulfilled, (state, action) => {
        state.receiptList = action.payload.result.items;
        state.receiptCount = action.payload.result.totalCount;
      });
      builder.addCase(getReceiptDetail.fulfilled, (state, action) => {
        state.receiptDetail = action.payload.result.items;
      });
      builder.addCase(deleteReceipt.fulfilled, (state, action) => {
          state.receiptList = state.receiptList.filter((receipt) => receipt.id !== action.payload);
        });  
        builder.addCase(createReceipt.fulfilled, (state, action) => {
          state.receiptList.push(action.payload);
        }); 
        builder.addCase(getByIdReceipt.fulfilled, (state, action) => {
          state.receiptDetail = action.payload.result;
        });
        builder.addCase(updateReceipt.fulfilled, (state, action) => {
          state.receiptList = state.receiptList.map((receipt) =>
          receipt.id === action.payload.id ? action.payload : receipt
          );
        });
        builder.addCase(deleteMultiple.fulfilled, (state, action) => {
          const deletedIds = action.payload;
          state.receiptList = state.receiptList.filter((receipt) => !deletedIds.includes(receipt.id));
        });
    },
  });
  export default slice.reducer;
  