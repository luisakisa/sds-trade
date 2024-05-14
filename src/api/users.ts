import axios from "axios";

const API_URL = "http://localhost:3003/users";

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
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
    const response = await axios.put(API_URL+id, userData, {
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

export const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete(API_URL+id, {
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
