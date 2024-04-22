// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface SupplierSpecialist {
//   id: number;
//   role: number;
//   email: string;
//   password: string;
//   type_of_business: number;
//   is_approved: boolean;
// }

// const initialState: SupplierSpecialist ={
//   id: 0,
//   role: 0,
//   email: '',
//   password: '',
//   type_of_business: 0,
//   is_approved: false,
// };

// export const SupplierSpecialistSlice = createSlice({
//   name: "supplierSpecialists",
//   initialState,
//   reducers: {
//   },
//   extraReducers: (builder) => {
//     builder.addCase(supplierSpecialistsMiddleware.fulfilled, (state, action) => {
//       return action.payload;
//     });
//   }
// });
