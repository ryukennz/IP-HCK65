// import { configureStore } from '@reduxjs/toolkit'
// import catList from './catSlice'

// export default configureStore({
//     reducer: {
//         cats: catList.reducer
//     }
// })

import { configureStore } from "@reduxjs/toolkit";
import catReducer from './catSlice.js'

const store = configureStore({
    reducer: {
        cats: catReducer
    }
})

export default store