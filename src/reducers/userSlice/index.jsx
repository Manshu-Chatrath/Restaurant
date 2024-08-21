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

export const editCartItem = createAsyncThunk(
  "editCartItem",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiSlice.put("/editCartItem", data);
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
      const response = await apiSlice.get(`/getCart/${data.cartId}`);
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
export const getCartLength = createAsyncThunk(
  "getCartLength",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiSlice.get(`/cartLength/${data.id}`);
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
  cartLength: 0,
  cartLengthStatus: IDLE,
  orderStatusError: "",
  cartListItems: [],
  editCartItemStatus: IDLE,
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
    defaultEditCartItemStatus: (state) => {
      state.editCartItemStatus = IDLE;
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
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cartStatus = SUCCESS;
      state.cartLength = action.payload.cartLength;
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
      state.cartLength = state.cartLength - 1;
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
      state.cartLength = 0;
    });
    builder.addCase(getCartLength.pending, (state) => {
      state.cartLengthStatus = PENDING;
    });
    builder.addCase(getCartLength.rejected, (state) => {
      state.cartLengthStatus = FAILED;
    });
    builder.addCase(getCartLength.fulfilled, (state, action) => {
      state.cartLength = action.payload.cartLength;
      state.cartLengthStatus = SUCCESS;
    });
    builder.addCase(editCartItem.pending, (state) => {
      state.editCartItemStatus = PENDING;
    });
    builder.addCase(editCartItem.rejected, (state) => {
      state.editCartItemStatus = FAILED;
    });
    builder.addCase(editCartItem.fulfilled, (state, action) => {
      state.editCartItemStatus = SUCCESS;
      state.cartLength = action.payload.cartLength;
    });
  },
});
export const {
  defaultLogintStatus,
  saveUser,
  deleteUser,
  defaultEditCartItemStatus,
  defaultCartListStatus,
  defaultOrderStatus,
  defaultCartStatus,
  defaultDeleteCartStatus,
} = userSlice.actions;
export default userSlice.reducer;
