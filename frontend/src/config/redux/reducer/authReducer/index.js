import { createSlice } from "@reduxjs/toolkit"
import { getAboutUser, getConnectionRequests, getMyConnectionRequests, loginUser } from "../../action/authAction"
import { registerUser } from "../../action/authAction"
import { getAllUsers } from "../../action/authAction"

const initialState = {
    user: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    loggedIn: false,
    message: "",
    isTokenThere: false,
    profileFetched: false,
    connections: [],
    connectionRequest: [],
    all_users: [],
    all_profiles_fetched: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: ()=> initialState,
        handleLoginUser: (state) => {
            state.message = "hello"
        }
    },

    extraReducers: (builder) =>{
        builder.addCase(loginUser.pending, (state)=>{
            state.isLoading = true
            state.message = "Login Successful..."
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.loggedIn = true;
            state.message = "login is sucessfull"

        })
        .addCase(loginUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(registerUser.pending, (state)=>{
            state.isLoading = true
            state.message = "registering you.."
        })
         .addCase(registerUser.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.loggedIn = true;
            state.message = "login is sucessfull"
        })
        .addCase(registerUser.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload || "invalid email or password";
        })
        .addCase(getAboutUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.profileFetched = true;
            state.user = action.payload;
        })
        .addCase(getAllUsers.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.all_profiles_fetched = true;
            state.all_users = action.payload.profiles
        })
        .addCase(getConnectionRequests.fulfilled, (state, action)=>{
            state.connections = action.payload
        })
        .addCase(getConnectionRequests.rejected, (state, action)=>{
            state.message = action.payload
        })
        .addCase(getMyConnectionRequests.fulfilled, (state, action)=>{
            state.connectionRequest = action.payload
        })
        .addCase(getMyConnectionRequests.rejected, (state, action)=>{
            state.message = action.payload
        })
        
        
    }
})

export default authSlice.reducer;


