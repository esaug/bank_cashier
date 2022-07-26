import { createSlice } from '@reduxjs/toolkit';
import { ContractFactory, ethers } from 'ethers'


const dataUserSlice = createSlice({
    name:'dataUser',
    initialState:{
        OwnerNFTs: [],
        arrayMetadata: [],
        saldoCajero: null,
        errorMsg: "",
    },
    reducers: {

        getData: (state, action)=>{
            state.OwnerNFTs = action.payload._ownerNFT
            state.arrayMetadata = action.payload._arrayMetadata
            state.saldoCajero = action.payload._saldoCajero
        }
    }
})

const {getData} = dataUserSlice.actions


export const fetchData = async(_account, dispatch, _contrato)=>{
    
    
            // Funcion de traer los NFT desde la blockchains con Ethers
        if(_contrato && _account){
            try {

                    let saldoCajero
                    let saldoCajeroConvertido

                    let arrayMetadata = new Array()
                    arrayMetadata = []

                    let ownerNFT
                    ownerNFT= []
                    let nftBalance
                    
                    if( _contrato == null){

                    }else{

                            saldoCajero = await _contrato.Saldo_Cashier()
                            saldoCajeroConvertido = parseInt(saldoCajero._hex)
                            nftBalance = await _contrato.balanceOf(_account)
                            nftBalance = parseInt(nftBalance)

                        if(nftBalance == 0 && _contrato == null){

                        }else{



                            ownerNFT = await _contrato.get_OWNERNFT(_account)

                            for(let i =0; i < nftBalance; i++){
                                
                                let tokenMetadataURI =  await _contrato.tokenURI(ownerNFT[i])
                                if(tokenMetadataURI.startsWith('ipfs://')){ 
                                tokenMetadataURI = `https://ipfs.io/ipfs/${tokenMetadataURI.split("ipfs://")[1]}`
                                }         
                                
                                const tokenMetadata = await fetch(tokenMetadataURI).then((resp)=>resp.json())
                                arrayMetadata.push(tokenMetadata) 
                            }

                        }
                            
                    }
        
                    dispatch(getData({
                        _ownerNFT: ownerNFT,
                        _arrayMetadata : arrayMetadata,
                        _saldoCajero: saldoCajeroConvertido
                        
                    }))
            
            }catch (error) {
                console.log(error)
            }
        }   
    }
export default dataUserSlice.reducer