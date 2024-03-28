import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eventService from "../../services/event/event.service";
import { EventNewState } from "../../@types/news";
import brandService from "../../services/brand/brand.service";
import { BrandState } from "../../@types/brand";
import { AccessoryState } from "../../@types/accessory";
import accessoryService from "../../services/accessory/accessory.service";

export const getAccessory = createAsyncThunk(
    "get/getAccessory",
    async (params: any) => {
      const { data } = await accessoryService.get(params);
      return data;
    }
  );
  export const updateAccessory = createAsyncThunk(
    "update/updateAccessory",
    async (data: any) => {
      // Assuming you have a service function for updating a Accessory
      const { data: updatedAccessory } = await accessoryService.put(data.id, data);
      return updatedAccessory;
    }
  );
  export const deleteAccessory = createAsyncThunk(
    "delete/deleteAccessory",
    async (id: number) => {

      await accessoryService.delete(id);
      return id; 
    }
  );
  export const createAccessory = createAsyncThunk(
    "create/createAccessory",
    async (brandData: any) => {
      const { data } = await accessoryService.post(brandData);
      return data;
    }
  );
  
  export const getByIdAccessory = createAsyncThunk(
    "get/getByIDAccessory",
    async (id: any) => {
      const { data } = await accessoryService.getById(id);
      return data;
    }
  );
  export const getByTypeAccessory = createAsyncThunk(
    "get/getByTypeAccessory",
    async (type: any) => {
      const { data } = await accessoryService.getByType(type);
      return data;
    }
  );
  
  const initialState: AccessoryState = {
    accessoryList: [],
    accessoryDetail:{
      id: 0,
      name: "",
      createdDT:"",
      type:0,
    },
    accessoryCount:0
  };
  const slice = createSlice({
    name: "Accessory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getAccessory.fulfilled, (state, action) => {
          state.accessoryList = action.payload.result.items;
        });
        builder.addCase(getByTypeAccessory.fulfilled, (state, action) => {
          state.accessoryList = action.payload.result;
        });
      builder.addCase(deleteAccessory.fulfilled, (state, action) => {
          state.accessoryList = state.accessoryList.filter((accessory) => accessory.id !== action.payload);
        });  
        builder.addCase(createAccessory.fulfilled, (state, action) => {
          state.accessoryList.push(action.payload);
        }); 
        builder.addCase(getByIdAccessory.fulfilled, (state, action) => {
          state.accessoryDetail = action.payload.result;
        });
        builder.addCase(updateAccessory.fulfilled, (state, action) => {
          state.accessoryList = state.accessoryList.map((accessory) =>
          accessory.id === action.payload.id ? action.payload : accessory
          );
          
        });
    },
  });
  export default slice.reducer;
  