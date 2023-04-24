import { configureStore } from '@reduxjs/toolkit'
import playerReducer from "./player"
import userReducer from './userSlice'
import podcastReducer from './podcastSlice'

export default configureStore({
    reducer: {
        player: playerReducer,
        user: userReducer,
        podcasts: podcastReducer,
    },
})
