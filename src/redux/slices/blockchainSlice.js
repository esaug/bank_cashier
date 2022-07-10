import { createSlice } from "@reduxjs/toolkit";
import { ethers} from "ethers";
import ContratoNFT from "../../contracts/abi.json"
import { fetching} from "./dataSlice";


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

        dispatch(conectando({login:true}))

        try {

           //CONECTAR A METAMASK Y ADQUIRIR NUMERO DE RED

            const account = await window.ethereum.request({
            method: "eth_requestAccounts"
            })

            const networkId = await window.ethereum.request({
            method: "net_version"
            })

            const contractAddress = '0x53FD7C81300314DAf8471B300E7609a44bC09119'
            
            const Provider = await new ethers.providers.Web3Provider(window.ethereum)
            const signer = await Provider.getSigner()
            const NftContract = await new ethers.Contract(contractAddress, ContratoNFT, signer)

            //EXTRACION DATOS DEL CONTRATO 


        if(networkId == 4){
            

            dispatch(conectado({
            login: true,
            account: account[0],   
            contratoNFT: NftContract
        })) 

            
        } else{
            console.log('CONECTED TO THE WORONG NETWORK')
        }

            
        } catch (err) {
            console.log(err)
            console.log('it possible that you havent metamask in your browser')
            
        }
    }

}


export default blockchainSlice.reducer