import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice/apiSlice";
import { IDLE, PENDING, SUCCESS, FAILED } from "../../utils/index";

export const userLogin = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiSlice.post("/client/login", data);
      return response?.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  "addToCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiSlice.post("/addToCart", data);
      return response?.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "getCartItems",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiSlice.get(`/getCart/${data.id}`);
      return response?.data?.cartItems;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "deleteCartItem",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiSlice.post(`/deleteCartItem`, data);
      return response?.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const placingOrder = createAsyncThunk(
  "placingOrder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiSlice.post(`/checkout`, data);
      return response?.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  loginStatus: IDLE,
  loginStatusError: "",
  cartStatus: IDLE,
  cartStatusError: "",
  orderNumber: null,
  deleteCartItemStatus: IDLE,
  orderStatus: IDLE,
  orderStatusError: "",
  cartListItems: [],
  cartListStatus: IDLE,
  cartListStatusError: "",
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    defaultLogintStatus: (state) => {
      state.loginStatus = IDLE;
      state.loginStatusError = "";
    },
    defaultDeleteCartStatus: (state) => {
      state.deleteCartItemStatus = IDLE;
    },
    defaultCartListStatus: (state) => {
      state.cartListStatus = IDLE;
      state.cartListStatusError = "";
      state.cartListItems = [];
    },
    defaultCartStatus: (state) => {
      state.cartStatus = IDLE;
      state.cartStatusError = "";
    },
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = null;
    },
    defaultOrderStatus: (state) => {
      state.orderStatus = IDLE;
      state.orderStatusError = "";
      state.orderNumber = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loginStatus = PENDING;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.loginStatus = FAILED;
      state.loginStatusError = "Some error occured";
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      const { client } = action.payload;
      localStorage.setItem("user", JSON.stringify(client));
      apiSlice.defaults.headers.common["Authorization"] = client.accessToken;
      state.loginStatus = SUCCESS;
      state.user = action.payload.client;
    });

    builder.addCase(addToCart.pending, (state) => {
      state.cartStatus = PENDING;
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.cartStatus = FAILED;
      state.cartStatusError = "Some error occured";
    });
    builder.addCase(addToCart.fulfilled, (state) => {
      state.cartStatus = SUCCESS;
    });

    builder.addCase(getCartItems.pending, (state) => {
      state.cartListStatus = PENDING;
    });
    builder.addCase(getCartItems.rejected, (state) => {
      state.cartListStatus = FAILED;
      state.cartListStatusError = "Some error occured";
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.cartListStatus = SUCCESS;
      state.cartListItems = [...action.payload];
    });

    builder.addCase(deleteCartItem.pending, (state) => {
      state.deleteCartItemStatus = PENDING;
    });
    builder.addCase(deleteCartItem.rejected, (state) => {
      state.deleteCartItemStatus = FAILED;
    });
    builder.addCase(deleteCartItem.fulfilled, (state) => {
      state.deleteCartItemStatus = SUCCESS;
    });
    builder.addCase(placingOrder.pending, (state) => {
      state.orderStatus = PENDING;
    });
    builder.addCase(placingOrder.rejected, (state, action) => {
      state.orderStatus = FAILED;
      const { payload } = action;
      state.orderStatusError = payload?.error
        ? payload.error
        : payload?.message;
    });
    builder.addCase(placingOrder.fulfilled, (state, action) => {
      state.orderStatus = SUCCESS;
      state.orderNumber = action.payload.orderNumber;
    });
  },
});
export const {
  defaultLogintStatus,
  saveUser,
  deleteUser,
  defaultCartListStatus,
  defaultOrderStatus,
  defaultCartStatus,
  defaultDeleteCartStatus,
} = userSlice.actions;
export default userSlice.reducer;
