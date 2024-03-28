
import { AxiosResponse } from "axios";
import { deleteAsync, getAsync, postAsync, putAsync } from "../http-client";

class ReceiptService {
  get = async (params: any): Promise<AxiosResponse> => {
    return await getAsync('/Receipt/GetAll', {
      ...params,
      isPublish: true
    })
  }
  getDetail = async (params: any): Promise<AxiosResponse> => {
    return await getAsync('/Receipt/GetAllDetail', { // Thay đổi đường dẫn API
      ...params,
      isPublish: true
    });
  }
  delete = async (id: any): Promise<AxiosResponse> => {
    return await deleteAsync(`/Receipt/Delete/${id}`);
  }
  post = async (data: any): Promise<AxiosResponse> => {
    return await postAsync('/Receipt/Create', data);
  }
  put = async (id: any, data: any): Promise<AxiosResponse> => {
    return await putAsync('/Receipt/Update', data); 
  }

  getById = async (id: any): Promise<AxiosResponse> => {
    return await getAsync(`/Receipt/GetById/${id}`)
  }
  deleteAll= async (data: number[] | string[]) => {
    return  await deleteAsync(`/Receipt/delete-multiple`, data);
  }
}

export default new ReceiptService();
