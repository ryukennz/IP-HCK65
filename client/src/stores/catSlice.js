import { createSlice } from '@reduxjs/toolkit'


const catSlice = createSlice({
    name: 'cats',
    initialState: {
        data: [],
        loading: false,
        error: ""
    },
    reducers: {
        fetchCatSuccess(state, action) {
            state.loading = false
            state.data = action.payload
        }
    }
})

export const { fetchCatStart, fetchCatSuccess } = catSlice.actions

export default catSlice.reducer