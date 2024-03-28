
import axios, { AxiosResponse } from "axios";
import { deleteAsync, getAsync, postAsync, putAsync } from "../http-client";
import { async } from "rxjs";

class SupplierService {
  get = async (params: any): Promise<AxiosResponse> => {
    return await getAsync('/Supplier/GetAll', {
      ...params,
      isPublish: true
    })
  }
  delete = async (id: any): Promise<AxiosResponse> => {
    return await deleteAsync(`/Supplier/Delete/${id}`);
  }
  post = async (productData: any): Promise<AxiosResponse> => {
    return await postAsync('/Supplier/Create',productData);
  }
  put = async (id: any, data: any): Promise<AxiosResponse> => {
    return await putAsync('Supplier/Update', data); 
  }
  getById = async (id: any): Promise<AxiosResponse> => {
    return await getAsync(`/Supplier/GetById/${id}`)
  }
  deleteAll= async (data: number[] | string[]) => {
    return  await deleteAsync(`/Supplier/delete-multiple`, data);
  }
}

export default new SupplierService();
