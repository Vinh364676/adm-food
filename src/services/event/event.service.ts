import { AxiosResponse } from "axios"
import { getAsync } from "../http-client";

class EventService {
  get = async (params: any): Promise<AxiosResponse> => {
    return await getAsync('/event', {
      ...params,
      isPublish: true
    })
  }
  getOne = async (id: any): Promise<AxiosResponse> => {
    return await getAsync(`/event/${id}`)
  }
}

export default new EventService();
