import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import blockchain from './slices/blockchainSlice'
import dataUser from './slices/dataSlice'



export default configureStore (
    {
        reducer :{
            blockchain,
            dataUser
        },
        
        middleware: [
            ...getDefaultMiddleware({
                serializableCheck: false
            })]

    }
)
