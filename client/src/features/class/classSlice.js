import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSubject: "",
  preClassSummary: null,
  inClassSummary: null,
  postClassSummary: null,
  preClassMcqs: [],
  inClassMcqs: [],
  postClassMcqs: [],
};

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    selectSubject: (state, action) => {
      state.selectedSubject = action.payload;
    },
    setPreClassDocument: (state, action) => {
      state.preClassSummary = action.payload.summary;
      state.preClassMcqs = action.payload.mcqs;
    },
    setInClassDocument: (state, action) => {
      state.inClassSummary = action.payload.summary;
      state.inClassMcqs = action.payload.mcqs;
    },
    setPostClassDocument: (state, action) => {
      state.postClassSummary = action.payload.summary;
      state.postClassMcqs = action.payload.mcqs;
    },
    clearAllDocuments: (state) => {
      state.preClassSummary = null;
      state.inClassSummary = null;
      state.postClassSummary = null;
      state.preClassMcqs = [];
      state.inClassMcqs = [];
      state.postClassMcqs = [];
    },
  },
});

export default classSlice.reducer;
export const {
  selectSubject,
  setPreClassDocument,
  setInClassDocument,
  setPostClassDocument,
  clearAllDocuments,
} = classSlice.actions;
