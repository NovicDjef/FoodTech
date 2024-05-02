// import { createSlice } from '@reduxjs/toolkit';
// import { authenticateUser, verifyOTP } from '../action/authActions';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//     },
//     logoutUser: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       // Effacer les données de l'utilisateur du AsyncStorage
//       AsyncStorage.removeItem('userData');
//     },
//   },
//   extraReducers: {
//     [authenticateUser.pending]: (state) => {
//       state.loading = true;
//     },
//     [authenticateUser.fulfilled]: (state, action) => {
//       state.loading = false;
//       state.user = action.payload;
//       state.isAuthenticated = true;
//     },
//     [authenticateUser.rejected]: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     [verifyOTP.pending]: (state) => {
//       state.loading = true;
//     },
//     [verifyOTP.fulfilled]: (state, action) => {
//       state.loading = false;
//       // Suppose OTP verification successful, you can set isAuthenticated to true here
//       state.isAuthenticated = true;
//     },
//     [verifyOTP.rejected]: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const { setUser, logoutUser } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';
import { authenticateUser, verifyOTP } from '../action/authActions';

import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem('userData');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, logoutUser} = authSlice.actions;
export default authSlice.reducer;

