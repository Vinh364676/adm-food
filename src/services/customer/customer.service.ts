
import { AxiosResponse } from "axios";
import { deleteAsync, getAsync, postAsync, putAsync } from "../http-client";

class CustomerService {
  get = async (params: any): Promise<AxiosResponse> => {
    return await getAsync('/Customer/GetAll', {
      ...params,
      isPublish: true
    })
  }
  delete = async (id: any): Promise<AxiosResponse> => {
    return await deleteAsync(`/Customer/Delete/${id}`);
  }
  post = async (data: any): Promise<AxiosResponse> => {
    return await postAsync('/Customer/Create', data);
  }
  put = async (id: any, data: any): Promise<AxiosResponse> => {
    return await putAsync('Customer/Update', data); 
  }

  getById = async (id: any): Promise<AxiosResponse> => {
    return await getAsync(`/Customer/GetById/${id}`)
  }
  deleteAll= async (data: number[] | string[]) => {
    return  await deleteAsync(`/Customer/delete-multiple`, data);
  }
}

export default new CustomerService();
