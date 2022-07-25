import { createSlice } from "@reduxjs/toolkit";
import { ethers} from "ethers";
import { _fetchData } from "ethers/lib/utils";
import ContratoNFT from "../../abi/abi.json"
import { fetchData} from "./dataSlice";


// ESTADO INICIAL Y CAMBIO DE ESTADO EN REDUCERS 

const blockchainSlice = createSlice({
    name:'blockchain',
    initialState:{
        login: false,
        account: '',
        contracNFT : null ,
            errorMsg: ""
    },
    reducers: {

        conectando: (state, action)=> {
            state.login = action.payload.login
        
        },

        conectado: (state, action)=>{
            state.login = action.payload.login
            state.account = action.payload.account
            state.contracNFT = action.payload.contratoNFT

        }
    }
})


// ACTIONS 

const {conectando, conectado} = blockchainSlice.actions


export const conexion= ()=>{

    return async (dispatch)=>{

        try {
           //CONECTAR A METAMASK Y ADQUIRIR NUMERO DE RED

            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            let userAddress = await signer.getAddress();


            const networkId = await window.ethereum.request({
            method: "net_version"
            })

            const contractAddress = '0xFAA33397d8A5a16D5523b75505Ca6d3Dc37a411D'
    
            const NftContract = await new ethers.Contract(contractAddress, ContratoNFT, signer)

            //EXTRACION DATOS DEL CONTRATO 


        if(networkId == 4){
            

            dispatch(conectado({
            login: true,
            account: userAddress,   
            contratoNFT: NftContract
        })) 

            
        } else{
            console.log('CONECTED TO THE WORONG NETWORK')
        }

        fetchData(userAddress, dispatch, NftContract)
            
        } catch (err) {
            console.log(err)
            console.log('it possible that you havent metamask in your browser')
            
        }
    }

}


export default blockchainSlice.reducer