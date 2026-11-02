import { authReducer } from "@/features/auth/slices/auth.slice";
import { InitialState } from "@/features/auth/slices/auth.slice";
import { cartReducer, CartValuesTypes } from "@/features/card/slices/cart.slice";
import { wishlistReducer } from "@/features/wishlist/slices/wishlist.slice";
import { WishlistState } from "@/features/wishlist/types/wishlist.type";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";


export type PreloadedState = {
  authReducer:InitialState;
  cartReducer:CartValuesTypes;
  wishlistReducer: WishlistState;
};

export function createStore(preloadedState:PreloadedState){

  const myStore = configureStore({
  reducer: 
  // (state = {}) => state, 
  {authReducer, cartReducer, wishlistReducer},
  preloadedState
});

return myStore
}


// export type RootState = ReturnType<typeof myStore.getState>;
// export type AppDispatch = typeof myStore.dispatch;

export type AppStore = ReturnType<typeof createStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();