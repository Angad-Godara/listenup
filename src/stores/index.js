import { configureStore } from '@reduxjs/toolkit'
import playerReducer from "./player"
import userReducer from './userSlice'

export default configureStore({
    reducer: {
        player: playerReducer,
        user: userReducer,
    },
})
