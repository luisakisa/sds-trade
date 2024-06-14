import axios from "axios";
import { DOMAIN, getHeaders } from "api/configs/path";
import { Lot } from "interfaces/lots";
import store from "store";

const API_URL = DOMAIN + "/lots";

export const getLots = async () => {
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

export const addLot = async (lot: any) => {
  try {
    console.log(lot);
    const response = await axios.post(API_URL, lot, {
      headers: getHeaders(),
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Ошибка");
  }
};

export const getLot = async(id:number) => {
  try {
    const response = await axios.get(API_URL + `/${id}`, {
      headers: getHeaders(),
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Ошибка");
  }
};

export const updateLot = async (id:number, lot: any) => {
  console.log(lot);
  try {
    const response = await axios.put(API_URL + `/${id}`, lot, {
      headers: getHeaders(),
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Ошибка");
  }
};

export const deleteLot = async (id:number) => {
  try {
    const response = await axios.delete(API_URL + `/${id}`, {
      headers: getHeaders(),
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Ошибка");
  }
};

export const getLotsByGroup = async (groupId:number) => {
  try {
    const response = await axios.get(API_URL + `/groups/${groupId}`, {
      headers: getHeaders(),
    });
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    throw new Error("Ошибка");
  }
};

export const getLotById = async (groupId:number) => {
  try {
    const response = await axios.get(DOMAIN + `/lists/lots/${groupId}`, {
      headers: getHeaders(),
    });
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    throw new Error("Ошибка");
  }
};

export const getListForSupplierByEmail = async (supplierEmail:string, lotId:number) => {
  try {
    const response = await axios.get(DOMAIN + `/lists/lots/${lotId}/suppliers/${supplierEmail}`, {
      headers: getHeaders(),
    });
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    throw new Error("Ошибка");
  }
};

// export const getLotsByUserIdByStatus = async (status:string, userId: number ) => {
//   try {
//     const response = await axios.get(API_URL + `/${userId}/statuses/${status}`, {
//       headers: getHeaders(),
//     });
//     console.log(response.data);
//     return response.data;
//   }
//   catch (error) {
//     throw new Error("Ошибка");
//   }
// };
