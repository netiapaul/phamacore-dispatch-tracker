import { getInvoices } from "@/helpers/api_helper";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getInvoiceList = createAsyncThunk(
  "/Invoices",
  async (
    {
      startDate,
      endDate,
      searchWord,
    }: { startDate: string; endDate: string; searchWord: string },
    thunkAPI
  ) => {
    try {
      const response = await getInvoices({ startDate, endDate, searchWord });
      return response;
    } catch (error: any) {
      //   console.log("ERROR", error);
      return thunkAPI.rejectWithValue(error.message || "Login failed");
    }
  }
);

const initialState = {
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  searchWord: "",
  isLoading: false,
  invoices: [],
  error: "",
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setStartDate(state, action: PayloadAction<Date>) {
      state.startDate = new Date(action.payload).toISOString();
    },
    setEndDate(state, action: PayloadAction<Date>) {
      state.endDate = new Date(action.payload).toISOString();
    },
    setSearchWord(state, action: PayloadAction<string>) {
      state.searchWord = action.payload;
    },
    // updateInvoiceField(
    //   state,
    //   action: PayloadAction<{ field: string; value: any }>
    // ) {
    //   const { field, value } = action.payload;
    //   (state as any)[field] = value;
    // },
    // addInvoiceItem(state, action: PayloadAction<ItemType>) {
    //   state.items.push(action.payload);
    // },
    // removeInvoiceItem(state, action: PayloadAction<number>) {
    //   state.items.splice(action.payload, 1);
    // },
    // resetInvoice(state) {
    //   return initialState;
    // },
  },
  extraReducers(builder) {
    builder.addCase(getInvoiceList.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(getInvoiceList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.invoices = action.payload;
      state.error = "";
    });
    builder.addCase(getInvoiceList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const {
  setStartDate,
  setEndDate,
  setSearchWord,
  //  loginSuccess, loginFailure, logout
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
