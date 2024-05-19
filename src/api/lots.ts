import axios from "axios";
import { Lot } from "interfaces/lots";

const API_URL = "http://localhost:3003/lots";

export const getLots = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Ошибка");
  }
};

export const addLot = async (lot: Lot) => {
  try {
    const response = await axios.post(API_URL, lot, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Ошибка");
  }
};