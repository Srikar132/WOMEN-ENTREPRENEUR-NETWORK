import { create } from "zustand";
import { authSlice } from "./slices/authSlice.js";
export const useStore = create((set) => ({
    ...authSlice(set)
}))