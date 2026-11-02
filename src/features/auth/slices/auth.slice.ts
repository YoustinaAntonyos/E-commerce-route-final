import { createSlice } from "@reduxjs/toolkit";


type User ={
    name:string,
    id?:string,
    email?:string,
    role:string,
    phone?:string
}

export type InitialState ={ isAuthenticated:boolean, userInfo:null|User}

const initialState:InitialState ={ isAuthenticated:false, userInfo:null}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setAuthStates: function(state, action){
            console.log(action);
            state.isAuthenticated = action.payload.isAuthenticated;
            state.userInfo = action.payload.userInfo;
            
        },

        logout: function(state){
            state.isAuthenticated = false;
            state.userInfo = null;
        }
    }
})


export const authReducer = authSlice.reducer
export const authAction = authSlice.actions