import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ACCEPT_FRIEND, ADD_FRIEND, LOGIN_USER, SIGNUP_USER, STAY_LOGIN, USERS_LIST } from "../../constants/urls";
import { apiGet, apiPost, apiPut } from "../../services/apiRequests";


export const login = createAsyncThunk("user/login", async (userData) => {
  try {
    const response = await apiPost(LOGIN_USER, userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data.error);
    throw error.response.data.error;
  }
});

export const signUp = createAsyncThunk("user/signUp", async (userData) => {
    try {
        const response = await apiPost(SIGNUP_USER,userData);
        return response.data;
    } catch (error) {
        console.log(error.response.data.error);
        throw error.response.data.error;
    }
})

export const stayLogin = createAsyncThunk("user/stayLogin", async () => {
    try {
      const response = await apiPost(STAY_LOGIN,{});
      return response.data;
    } catch (error) {
      console.log(error.response.data.error);
      throw error.response.data.error;
    }
})

export const addFriends = createAsyncThunk("user/addFriends", async (_id) => {
  try {
    const response = await apiPost(ADD_FRIEND + `/${_id}`,{});
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
})

export const acceptFriend = createAsyncThunk("user/acceptFriend" , async (_id) => {
  try {
    const response = await apiPost(ACCEPT_FRIEND + `/${_id}`,{});
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
})
export const updateUser = createAsyncThunk("user/updateUser" , async (data) => {
  try {
    const response = await apiPut(data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
})





const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: true,
    error: null,
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
        state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload;
        state.loading = false;
    })
    .addCase(login.rejected, (state, action) => {
        console.log(action.error.message);
        state.error = action.error.message;
        state.loading = false;
    }) 
    .addCase(signUp.pending , (state,action) => {
        state.loading = true;
    })
    .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
    })
    .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
    .addCase(stayLogin.pending , (state,action) => {
        state.loading = true;
    })
    .addCase(stayLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
    })
    .addCase(stayLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
    .addCase(updateUser.pending , (state,action) => {
        state.loading = true;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
    })
    .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
    .addCase(acceptFriend.pending , (state,action) => {
        state.loading = true;
    })
    .addCase(acceptFriend.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
    })
    .addCase(acceptFriend.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

  },
  reducers: {},
});
//acceptFriend

export const {} = userSlice.actions;
export default userSlice.reducer;
