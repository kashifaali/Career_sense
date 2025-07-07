import { createAsyncThunk } from "@reduxjs/toolkit";
import clientServer from "../../axiosClient";


export const loginUser = createAsyncThunk(
    "user/login",
    async (user, thunkAPI)=>{
      console.log(user.email);
      console.log(user.password);
        try{
            const response = await clientServer.post(`/login`,{
                email: user.email,
                password: user.password
            });

            if(response.data.token){
                localStorage.setItem("token",response.data.token)
            }
            else{
                return thunkAPI.rejectWithValue({
                    message: "token not provided"
                })
            }

            return thunkAPI.fulfillWithValue(response.data.token)


        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)



export const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post('/register', {
        username: user.username,
        password: user.password,
        email: user.email,
        name: user.name,
      });

      return thunkAPI.fulfillWithValue(response.data); // ✅ return result
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: 'Something went wrong' });
    }
  }
);

export const getAboutUser = createAsyncThunk(
  "user/getAboutUser",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.get("/get_user_and_profile", {
        params: {
          token: user.token,
        },
      });
      return thunkAPI.fulfillWithValue(response.data); // contains user + profile
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);




// authAction/index.js
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await clientServer.get('/users/get_all_profile');
      return thunkAPI.fulfillWithValue(response.data); // response.data = { profiles: [...] }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: 'Failed to fetch users' });
    }
  }
);


export const sendConnectionRequest = createAsyncThunk(
  "user/sendConnectionRequest",
  async (user, thunkAPI) =>{
    try{
      const response = await clientServer.post("/users/send_connection_request", {
        token: user.token,
        connectionId: user.user_id
      })

      thunkAPI.dispatch(getConnectionRequests({token: user.token}))
      return thunkAPI.fulfillWithValue(response.data);
    }
    catch(error){
      return thunkAPI.rejectWithValue(error.reponse.data.message);
    }
  }
)

export const getConnectionRequests = createAsyncThunk(
  "user/getConnectionRequests",
  async (user, thunkAPI)=>{
    try{

const response = await clientServer.get("/users/getConnectionRequest", {
        params: {
          token: user.token
        }
      })

      return thunkAPI.fulfillWithValue(response.data.connection);
    }

    catch(error){
      return thunkAPI.rejectWithValue(error.reponse.data.message);
    }
  }
)


export const getMyConnectionRequests = createAsyncThunk(
  "user/getMyConnectionRequests",
  async (user, thunkAPI)=>{
    try{

      const response = await clientServer.get("/users/user_connection_request",{
        params: {
          token: user.token
        }
      })

      return thunkAPI.fulfillWithValue(response.data.connection);
    }

    catch(error){
      return thunkAPI.rejectWithValue(error.reponse.data.message);
    }
  }
  
)


export const AcceptConnection = createAsyncThunk(
  "user/acceptConnection",
  async (user, thunkAPI)=>{
    try{

      const response = await clientServer.post("/users/accept_connection_request",{
       token: user.token,
       connection_id: user.connectionId,
       action_type: user.action
      });

      return thunkAPI.fulfillWithValue(response.data);
    }

    catch(error){
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)





