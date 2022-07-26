import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useBlockchain } from '../hook/blockchain';
import { conexion } from '../redux/slices/blockchainSlice';
import Transactions from './Transactions';
import PopUpLoading from './popUps/popUpUniversal';
import imgPop from '../assets/5.png'


const Profile = () => {

    let popupState= {
        bool: false,
        mensaje: 'LOADING...',
        mensaje2: ''
    }

    const [popUpUniversal, setPopUpUniversal] = useState(popupState)
    const {blockchain, dataUser, dispatch} = useBlockchain()
    const navigate = useNavigate()

    const inputRef = useRef(null)

    const closePopUp = ()=>{
        setTimeout(()=>{
            setPopUpUniversal({
            bool:false
        })
      }, 1000 * 5)
    }

    const closePopRestart = ()=>{
        setTimeout(()=>{
            setPopUpUniversal({
                bool:false
            })
        navigate('/')
      }, 1000 * 5)
    }

    const handleMint = ()=>{
        if(inputRef.current.value>0){
            minter(inputRef.current.value)
            setPopUpUniversal({
                bool: true,
                mensaje: "LOADING..."
            })
        }
        else{
            console.log('Value could not be 0')
        }
    }    

    const minter = async(_value)=>{

        let data = {
            from: blockchain.account
        }

        try {
            
            const tx = await blockchain.contracNFT.ConvertDenom(_value, data)
            await tx.wait().then((resp)=>{
            if(resp){
                setPopUpUniversal({
                    bool: true,
                    mensaje: "Your NFT has been minted"
                })
                closePopUp()
            }else{
                
            }
        })

        } catch (err) {
            console.log(err)
            if(err.code == 4001){
                setPopUpUniversal({
                    bool: true,
                    mensaje:"Transaction has been cancel"
                })
                closePopUp() 
            } else if(err.reason == "execution reverted: Y/T/L"){
    
            setPopUpUniversal({
                bool: true,
                mensaje: "You have reached the limit of NFT you can mint"
            })

            closePopUp() 
            } else if(err.reason == "execution reverted: Insufficient balance"){
            setPopUpUniversal({
                bool: true,
                mensaje: "Not enough USDC"
            })
            closePopUp() 
        }
        }
    }

return (
    <>
        <div className='w-full divHero grid grid-cols-3 bg-blue-300'>
                    
            <div>             
            </div>
            
            <div className='justify-center grid grid-rows-3'>
                <form>
                    <div className='div pb-5'>
                        <label className='p3'>
                            ConvertDenom
                        </label>
                    </div>
                                    
                    <div className='pb-5'>
                        <input 
                            ref={inputRef}
                            type="Number" 
                            id="Convert" 
                            name="Conver"
                            className=' border-none'
                                                        
                    />
                    </div>
                                    
                    <div className='pl-11'>
                        <button
                            type="submit" 
                            value="Submit" 
                            className="p bg-blue-500 hover:bg-blue-700 
                            text-white font-bold py-2 px-4 rounded"
                            onClick={(e)=>{
                                e.preventDefault()
                                if (blockchain.account) {
                                    handleMint()
                                } else {
                                    setPopUpUniversal({
                                        bool:true,
                                        mensaje: "You need to connect your MetaMask"
                                    })
                
                                    closePopRestart()
                                }
                            }}
                            >Submit</button>
                    </div>
                </form>       
            </div>   

        </div>

        <PopUpLoading trigger={popUpUniversal.bool} settrigger={setPopUpUniversal} >
            <div className='mint_div'>
                <div className='mint_div_img'>
                    <img className='mint_img' src={imgPop}/>
                </div>
                <div className='mint_div_subtitle1'>
                    <h2 className={popUpUniversal.mensaje == 'The transaction has been cancel' ? 'mint__titulo2' : 
                        popUpUniversal.mensaje == 'Insufficient Funds'? 'mint__titulo3':  
                        popUpUniversal.mensaje == 'Connect your Metamask'? 'mint__titulo4': 'mint__titulo1_1'}>{popUpUniversal.mensaje}</h2>
                </div>
                <div className='mint_div_subtitle2'>
                    <h4 className='mint__titulo2_1'>{popUpUniversal.mensaje2}</h4>
                </div>
            </div>
        </PopUpLoading>
    
        
        <div className='w-full h-screen transactions bg-blue-300'>
            <div className=''></div>
                <div >
                    <div>
                        <h2 className='p2'>Your NFTs</h2>
                    </div>
                    <Transactions   />
                </div>
            <div className=''></div>
        </div>   
    </> 
    )
}

export default Profile