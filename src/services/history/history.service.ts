
import { AxiosResponse } from "axios";
import { deleteAsync, getAsync, postAsync, putAsync } from "../http-client";

class HistoryService {
  get = async (params: any): Promise<AxiosResponse> => {
    return await getAsync('/OrderAdmin/GetAll', {
      ...params,
      isPublish: true
    })
  }
  getDetail = async (params: any): Promise<AxiosResponse> => {
    return await getAsync('/OrderAdmin/GetAllDetail', {
      ...params,
      isPublish: true
    })
  }
  put = async (id: any, data: any): Promise<AxiosResponse> => {
    return await putAsync('/OrderAdmin/UpdateStatus', data); 
  }
}

export default new HistoryService();