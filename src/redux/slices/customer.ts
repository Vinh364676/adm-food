import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BrandState } from "../../@types/brand";
import categoryService from "../../services/category/category.service";
import { CategoryState } from "../../@types/category";
import customerService from "../../services/customer/customer.service";
import { CustomerState } from "../../@types/customer";

export const getCustomer = createAsyncThunk(
    "get/getCustomer",
    async (params: any) => {
      const { data } = await customerService.get(params);
      return data;
    }
  );
  
  export const deleteCustomer = createAsyncThunk(
    "delete/deleteCustomer",
    async (id: number) => {

      await customerService.delete(id);
      return id; 
    }
  );
  export const createCustomer = createAsyncThunk(
    "create/createCustomer",
    async (customerData: any) => {
      const { data } = await customerService.post(customerData);
      return data;
    }
  );
  export const updateCustomer = createAsyncThunk(
    "update/upateCustomer",
    async (data: any) => {
      // Assuming you have a service function for updating a brand
      const { data: updateCustomer } = await customerService.put(data.id, data);
      return updateCustomer;
    }
  );
  export const getByIdCustomer = createAsyncThunk(
    "get/getByIDCustomer",
    async (id: any) => {
      const { data } = await customerService.getById(id);
      return data;
    }
  );
  export const deleteMultipleCustomer = createAsyncThunk(
    'delete/deleteMultiple',
    async (id: number[]) => {
      await customerService.deleteAll(id);
      return id;
    }
  );
  const initialState: CustomerState = {
    customerList: [],
    customerDetail:{
      id: 0,
      fullName: "",
      gender:0,
      email:"",
      phoneNumber:"",
      dateOfBirth:"",
      code:"",
    },
    customerCount:0
  };
  const slice = createSlice({
    name: "Customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getCustomer.fulfilled, (state, action) => {
          state.customerList = action.payload.result.items;
          state.customerCount = action.payload.result.totalCount;
        });
      builder.addCase(deleteCustomer.fulfilled, (state, action) => {
          state.customerList = state.customerList.filter((Customer) => Customer.id !== action.payload);
        });  
        builder.addCase(createCustomer.fulfilled, (state, action) => {
          state.customerList.push(action.payload);
        }); 
        builder.addCase(getByIdCustomer.fulfilled, (state, action) => {
          state.customerDetail = action.payload.result.items;
        });
        builder.addCase(updateCustomer.fulfilled, (state, action) => {
          state.customerList = state.customerList.map((Customer) =>
          Customer.id === action.payload.id ? action.payload : Customer
          );
        });
        builder.addCase(deleteMultipleCustomer.fulfilled, (state, action) => {
          const deletedIds = action.payload;
          state.customerList = state.customerList.filter((Customer) => !deletedIds.includes(Customer.id));
        });
    },
  });
  export default slice.reducer;
  