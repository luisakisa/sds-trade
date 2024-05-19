import axios from "axios";
import { DOMAIN } from "configs/path";

const API_URL = DOMAIN + "/feedback";

export const sendFeedback = async (data: {
  name: string;
  email: string;
  organization: string;
  phone: string;
  message: string;
}) => {
  try {
    const response = await axios.post(
      API_URL,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Ошибка отправки обратной связи");
  }
};
