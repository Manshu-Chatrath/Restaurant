import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice/apiSlice";
import { IDLE, PENDING, SUCCESS, FAILED } from "../../utils/index";

export const getCategories = createAsyncThunk(
  "getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiSlice.get("/categories");
      return response?.data?.categories;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const getItems = createAsyncThunk(
  "getItems",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiSlice.get(
        `/getDishes?index=${data.page}&search=${data.search}&categoryId=${data.categoryId}&count=${data.count}`
      );
      return response?.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const getItem = createAsyncThunk(
  "getItem",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiSlice.get(`/getDish/${data.id}`);
      return response?.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCart = createAsyncThunk(
  "getCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiSlice.get(`/getCart/?cartId=${data.id}`);
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
  itemsListStatusError: "",
  itemsList: [],
  itemsListStatus: IDLE,
  selectedItem: null,
  selectedItemStatus: IDLE,
  selectedItemError: "",
  categoriesList: [],
  categoriesListStatus: IDLE,
  itemId: null,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    defaultItemListStatus: (state) => {
      state.itemsListStatus = IDLE;
      state.itemsList = [];
    },
    defaultSelectedItemStatus: (state) => {
      state.selectedItemStatus = IDLE;
      state.selectedItem = null;
      state.selectedItemError = "";
    },
    defaultCategoriesListStatus: (state) => {
      state.categoriesListStatus = IDLE;
      state.categoriesList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state) => {
      state.itemsListStatus = PENDING;
    });
    builder.addCase(getItems.rejected, (state) => {
      state.itemsListStatus = FAILED;
    });
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.itemsListStatus = SUCCESS;
      state.totalItems = action.payload.total;
      state.itemsList = action.payload.dishes;
    });
    builder.addCase(getItem.pending, (state) => {
      state.itemsListStatus = PENDING;
    });
    builder.addCase(getItem.rejected, (state, action) => {
      state.itemsListStatus = FAILED;
      const { payload } = action;
      state.uploadStatusError = payload?.error
        ? payload.error
        : payload?.message;
    });
    builder.addCase(getItem.fulfilled, (state, action) => {
      state.selectedItemStatus = SUCCESS;
      state.selectedItem = action.payload.selectedDish;
    });
    builder.addCase(getCategories.pending, (state) => {
      state.categoriesListStatus = PENDING;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.categoriesListStatus = FAILED;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categoriesList = action.payload;
      state.categoriesListStatus = SUCCESS;
    });
  },
});
export const {
  defaultItemListStatus,
  defaultSelectedItemStatus,
  defaultCategoriesListStatus,
} = itemsSlice.actions;
export default itemsSlice.reducer;
