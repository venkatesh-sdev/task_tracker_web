import { configureStore } from "@reduxjs/toolkit";

// Reducers
import tasksReducer from "./reducers/tasksReducer";
import generalReducer from "./reducers/generalReducer";


// Store 
export default configureStore({
    reducer: {
        tasks: tasksReducer,
        general: generalReducer,
    },
    // For Removing state management serialzable Problems
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})