import axios from "axios";
import { DOMAIN, getHeaders } from "api/configs/path";
import { Requests } from "interfaces/lots";
import store from "store";

const API_URL = DOMAIN + "/requests";

export const getRequests = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: getHeaders(),
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Ошибка");
  }
};

export const addRequests = async (lotId: number,positionId: number, request: any) => {
  try {
    const response = await axios.post(
      API_URL + `/lots/${lotId}/positions/${positionId}`,
      request,
      {
        headers: getHeaders(),
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Ошибка");
  }
};
