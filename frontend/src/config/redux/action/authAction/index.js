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
      return thunkAPI.fulfillWithValue(response.data); // ✅ This line was missing!
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


