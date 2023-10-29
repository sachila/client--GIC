import { useSelector } from "react-redux";
import { RootState } from "./store";

export function useBankSelector() {
  return useSelector((state: RootState) => state.bank);
}
