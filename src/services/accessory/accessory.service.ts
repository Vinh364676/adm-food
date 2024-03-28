import { AxiosResponse } from "axios";
import { deleteAsync, getAsync, postAsync, putAsync } from "../http-client";

class AccessoryService {
  get = async (params: any): Promise<AxiosResponse> => {
    return await getAsync('/Accessory/GetAll', {
      ...params,
      isPublish: true
    })
  }
  delete = async (id: any): Promise<AxiosResponse> => {
    return await deleteAsync(`/Accessory/Delete/${id}`);
  }
  post = async (data: any): Promise<AxiosResponse> => {
    return await postAsync('/Accessory/Create', data);
  }
  put = async (id: any, data: any): Promise<AxiosResponse> => {
    return await putAsync('/Accessory/Update', data); 
  }

  getById = async (id: any): Promise<AxiosResponse> => {
    return await getAsync(`/Accessory/GetById/${id}`)
  }
  getByType = async (type: any): Promise<AxiosResponse> => {
    return await getAsync(`/Accessory/GetByType/${type}`)
  }
}

export default new AccessoryService();