import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



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
            
    console.log('DENTRO DEL FETCH')
    console.log(_contrato)
            if(_contrato){
                console.log('DENTRO DEL FETCH')
                let arrayMetada= new Array()
                arrayMetada = []

                let arrayNFTs = new Array()
                arrayNFTs = []

                console.log(_contrato)
                
                const tx1 = _contrato.Owner_NFT(_account).then((resp)=>{
                    arrayNFTs = resp
                })
                
                console.log(arrayNFTs)

                dispatch(getData({
                    NFTs: arrayMetada,
                    _ownerTokens: 'ASDF' ,
                
                }))

            }else{}
}



export default dataUserSlice.reducer