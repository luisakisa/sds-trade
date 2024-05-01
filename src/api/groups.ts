import axios from "axios";

const API_URL = "http://localhost:3003/groups";

export const getGroups = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.status === 200 ? response.data : null;
  } catch (error) {
    throw new Error("Ошибка");
    1;
  }
};
