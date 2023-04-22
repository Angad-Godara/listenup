import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    current: false,
    controls: false,
    playing: false,
    sidebar: false,
    playerState: null,
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            state.current = action.payload
        },
        setControls: (state, action) => {
            state.controls = action.payload
        },
        setPlaying: (state, action) => {
            state.playing = action.payload
        },
        setSidebar: (state, action) => {
            state.sidebar = action.payload
        },
        setplayerState: (state, action) => {
            state.playerState = action.payload
        },
    },
})

export const {
    setControls,
    setCurrent,
    setPlaying,
    setSidebar,
    setplayerState,
} = playerSlice.actions

export default playerSlice.reducer
