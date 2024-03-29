import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [
    ],
    isLoadingUsers: true,
    activeUser: null,
}

//  Revisar porque no esta actualizando correctamente el slice [[ LLega un id diferente al del usuario ]]
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onSetActiveUser: (state, { payload }) => {
      state.activeUser = payload
    },
    onUpdateUser: (state, { payload }) => {
      console.log(payload);
      state.users = state.users.map(user => {
          if(user.id === payload.id) return payload;
          return user
      })
    },
    onDeleteUser: (state) => {
      if(state.activeUser){
          state.users = state.users.filter(user => user.id !== state.activeUser.id);
          state.activeUser = null;
      }
    },
    onLoadUsers: (state, {payload =[]}) => {
      state.isLoadingUsers = false;
      state.users = [];
      payload.forEach(user => {
          const exists = state.users.some(dbUser => dbUser.id === user.id);
          if(!exists){
              state.users.push(user);
          }
      });
    },
    onCleanActive: (state) => {
      state.activeUser = null;
    }
  }
})


export const { onSetActiveUser, onUpdateUser, onDeleteUser, onLoadUsers, onCleanActive, onSetCurrentUser } = userSlice.actions