import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'podcasts',
    initialState: {
        podcasts: null,
        artists: null,
        genre: null,
    },
    reducers: {
        storeAllPodcasts: (state, action) => {
            state.podcasts = action.payload
        },
        storeAllArtists: (state, action) => {
            state.artists = action.payload
        },
        storeAllGenres: (state, action) => {
            state.genre = action.payload
        }
    }
})

export const { storeAllArtists, storeAllGenres, storeAllPodcasts } = userSlice.actions;
export const selectPodcasts = (state) => state.podcasts;
export default userSlice.reducer;
