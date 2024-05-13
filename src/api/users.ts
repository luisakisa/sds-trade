import axios from "axios";

const API_URL = "http://localhost:3003/";

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL + "users");
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Ошибка");
  }
};

export const updateUser = async (
  id: number,
  userData: SupplierFullData | SupplySpecialistFullData| undefined
) => {
  try {
    const response = await axios.put(API_URL+'user/'+id, userData, {
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
