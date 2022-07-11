import { createSlice } from '@reduxjs/toolkit';
import { ContractFactory, ethers } from 'ethers'
import ContratoNFT from "../../contracts/abi.json"

const dataUserSlice = createSlice({
    name:'dataUser',
    initialState:{
        OwnerNFTs: [],
        Transfers_owner: [],
        Transaction_value: [],
        Transactions_bills: [],
        errorMsg: "",
    },
    reducers: {

        getData: (state, action)=>{
            state.OwnerNFTs = action.payload.allOwnerNfts
            state.Transfers_owner = action.payload._transfers_owner
            state.Transaction_value = action.payload._transaction_value
            state.Transactions_bills = action.payload._transactions_bills
        }
    }
})

const {getData} = dataUserSlice.actions


export const fetchData = async(_account, dispatch, _contrato)=>{
    
            // Funcion de traer los NFT desde la blockchains con Ethers
        if(_contrato && _account){
            try {
                    let tx1 = null
                    let tx2 = null
                    let tx3 = null
                    let tx4 = null

                    let transactions = []
                    transactions = []


                    let id_transactions = []
                    id_transactions = []

                    let arrayId = new Array()
                    arrayId = []

                    let billetes = new Array()
                    billetes = []

                    let cantidad
                    let cantidadSumada
                    
                    if( _contrato == null){
                        
                    }else{

                        console.log(_contrato)
                        tx1 = await _contrato.Owner_NFT(_account)
                        tx2 = await _contrato.Owner_transaction(_account)
                        tx3 = await _contrato.Owner_value(_account)
                        
                        cantidad = tx2.length

                        for(let i=0; i < cantidad; i++ ){
                            
                            tx4 = await _contrato.Transaction_bills(i)
                            billetes[i] = new Array(tx4)
                        }

                    }
                    console.log('DENTRO')

                    dispatch(getData({
                        allOwnerNfts: tx1,
                        _transfers_owner: tx2,
                        _transaction_value: tx3,
                        _transactions_bills: billetes
                    }))
            
            }catch (error) {
                console.log(error)
            }
        }   
    }
export default dataUserSlice.reducer