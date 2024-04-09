import axios from "axios";

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
