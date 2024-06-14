import axios from "axios";
import { DOMAIN, getHeaders } from "api/configs/path";

const API_URL = DOMAIN + "/positions/";

export const getPositionsById = async (id: number) => {
  try {
    const response = await axios.get(
      API_URL + id,
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

export const updatePositionsById = async (id: number, requestId: number) => {
  try {
    console.log(id,requestId);
    const response = await axios.put(
      API_URL + id,
      { supplierWinnerId: requestId },
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
