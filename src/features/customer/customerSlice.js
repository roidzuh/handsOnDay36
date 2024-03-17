import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
  isLoading: false,
};

export const fetchCustomers = createAsyncThunk(
  "customer/fetchCustomers",
  async (payload, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("https://dummyjson.com/users/1");
      const data = await res.json();
      const customerData = {
        fullName: `${data.firstName} ${data.lastName}`,
        nationalId: data.id,
        createdAt: new Date().toISOString(),
      };
      return customerData;
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: (state, action) => {
      state.fullName = action.payload.fullName;
      state.nationalId = action.payload.nationalId;
      state.createdAt = action.payload.createdAt;
    },
    updateName: (state, action) => {
      state.fullName = action.payload.fullName;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fullName = action.payload.fullName;
      state.nationalId = action.payload.nationalId;
      state.createdAt = action.payload.createdAt;
    });
    builder.addCase(fetchCustomers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCustomers.rejected, (state) => {
      state.isLoading = false;
      // handle error if needed
    });
  },
});

// const customerReducer = (state = initialStateCustomer, action) => {
//   switch (action.type) {
//     case "customer/create":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalId: action.payload.nationalId,
//         createdAt: action.payload.createdAt,
//       };
//     case "customer/updateName":
//       return { ...state, fullName: action.payload.fullName };
//     default:
//       return { ...state };
//   }
// };

// export const createCustomer = (fullName, nationalId) => {
//   return {
//     type: "customer/create",
//     payload: {
//       fullName,
//       nationalId,
//       createdAt: new Date().toISOString(),
//     },
//   };
// };

// export const updateName = (fullName) => {
//   return { type: "account/updateName", payload: fullName };
// };

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;
