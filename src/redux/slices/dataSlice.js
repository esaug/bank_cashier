import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ContractFactory } from 'ethers';
import { useDispatch } from 'react-redux';


const dataUserSlice = createSlice({
    name:'dataUser',
    initialState:{
        NFTs: [],
        ownerTokens : null,
        id_currencie : [],
        errorMsg: ""
    },
    reducers: {

        getData: (state, action)=>{
            state.NFTs = action.payload.NFTs
            state.ownerTokens = action.payload._ownerTokens
            state.id_currencie = action.payload._id_currencie
        }
    }
})

const {getData} = dataUserSlice.actions


export const fetching = async (_account, dispatch, _contrato)=>{
            
            if(_contrato){
                
                let arrayMetada= new Array()
                arrayMetada = []
                

                dispatch(getData({
                    NFTs: arrayMetada,
                    _ownerTokens: 'ASDF' ,
                
                }))

            }else{}
}



export default dataUserSlice.reducer