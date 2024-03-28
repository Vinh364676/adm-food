import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supplierService from "../../services/supplier/supplier.service";
import { SupplierState } from "../../@types/supplier";



export const getSupplier = createAsyncThunk(
    "get/getSupplier",
    async (params: any) => {
      const { data } = await supplierService.get(params);
      return data;
    }
  );
  export const updateSupplier = createAsyncThunk(
    "update/updateSupplier",
    async (data: any) => {
      // Assuming you have a service function for updating a brand
      const { data: updatedSupplier } = await supplierService.put(data.id, data);
      return updatedSupplier;
    }
  );
  export const deleteSupplier = createAsyncThunk(
    "delete/deleteSupplier",
    async (id: number) => {

      await supplierService.delete(id);
      return id; 
    }
  );
  export const createSupplier = createAsyncThunk(
    "create/createSupplier",
    async (brandData: any) => {
      const { data } = await supplierService.post(brandData);
      return data;
    }
  );
  
  export const getByIdSupplier = createAsyncThunk(
    "get/getByIdSupplier",
    async (id: any) => {
      const { data } = await supplierService.getById(id);
      return data;
    }
  );
  export const deleteMultiple = createAsyncThunk(
    'delete/deleteMultiple',
    async (id: number[]) => {
      await supplierService.deleteAll(id);
      return id;
    }
  );
  const initialState: SupplierState = {
    supplierList: [],
    supplierDetail:{
      id: 0,
      name: "",
      address:"",
      phoneNumber:"",
      email:""
    },
    supplierCount:0
  };
  const slice = createSlice({
    name: "Brand",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getSupplier.fulfilled, (state, action) => {
          state.supplierList = action.payload.result.items;
          state.supplierCount = action.payload.result.totalCount;
        });
      builder.addCase(deleteSupplier.fulfilled, (state, action) => {
          state.supplierList = state.supplierList.filter((supplier) => supplier.id !== action.payload);
        });  
        builder.addCase(createSupplier.fulfilled, (state, action) => {
          state.supplierList.push(action.payload);
        }); 
        builder.addCase(updateSupplier.fulfilled, (state, action) => {
          state.supplierList = state.supplierList.map((supplier) =>
          supplier.id === action.payload.id ? action.payload : supplier
          );
        });
        builder.addCase(deleteMultiple.fulfilled, (state, action) => {
          const deletedIds = action.payload;
          state.supplierList = state.supplierList.filter((supplier) => !deletedIds.includes(supplier.id));
        });
    },
  });
  export default slice.reducer;
  