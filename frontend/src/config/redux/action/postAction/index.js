import clientServer from "../../axiosClient";
import {createAsyncThunk} from "@reduxjs/toolkit";


export const getAllPosts = createAsyncThunk(
    "post/getAllPosts",
    async(_, thunkAPI)=>{
        try{
            const response = await clientServer.get('/posts')

            return thunkAPI.fulfillWithValue(response.data)
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)


export const createPost = createAsyncThunk(
  "post/createPost",
  async (userData, thunkAPI) => {
    const { file, body } = userData;

    try {
      const formData = new FormData();
      formData.append("token", localStorage.getItem("token")); // ✅ token
      formData.append("body", body);
      if (file) {
        formData.append("media", file);
      }

      const response = await clientServer.post("/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.status === 200) {
        return thunkAPI.fulfillWithValue("Post uploaded");
      } else {
        return thunkAPI.rejectWithValue("Post not uploaded");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Upload failed");
    }
  }
);


export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (post_id, thunkAPI) => {
    try {
      const response = await clientServer.delete("/delete_post", {
        data:{
          token: localStorage.getItem("token"),
          post_id: post_id.post_id
        }
      });
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Post deletion error");
    }
  }
);


export const incrementPostLike = createAsyncThunk(
  "post/incrementLike",
  async ({ post_id }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await clientServer.post(`/increment_post_like`, { post_id }, {
        headers: { Authorization: `Bearer ${token}` },
        
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: "Like failed" });
    }
  }
);


// export const addCommentToPost = createAsyncThunk(
//   "post/addCommentToPost",

//   async ({ post_id, commentBody }, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await clientServer.post("/comment", {
//         token,
//         post_id,
//         commentBody,
//       });

//       console.log(response.data);

//       return thunkAPI.fulfillWithValue(response.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || "Failed to add comment");
//     }
//   }
// );



export const getAllComments = createAsyncThunk(
  "post/getAllComments",
  async(postData, thunkAPI)=>{
    try{
      const response = await clientServer.get("/get_comments",{
        params: {
          post_id: postData.post_id
        }
      });
      return thunkAPI.fulfillWithValue({
        comments: response.data,
        post_id: postData.post_id
      })
    }
    catch(error){
      return thunkAPI.rejectWithValue("something went wrong")
    }
  }
)

export const postComment = createAsyncThunk(
  "post/postComment",
  async(commentData, thunkAPI)=>{
    try{
      console.log({
        post_id: commentData.post_id,
        body: commentData.body
      })
      const response  = await clientServer.post("/comment",{
        token: localStorage.getItem("token"),
        post_id: commentData.post_id,
        commentBody: commentData.body
      });
      return thunkAPI.fulfillWithValue(response.data)
    }
    catch(error){
      return thunkAPI.rejectWithValue("something went wrong")
    }
  }
)