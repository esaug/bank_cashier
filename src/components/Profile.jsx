import React, { useRef } from 'react'
import { useBlockchain } from '../hook/blockchain';
import { conexion } from '../redux/slices/blockchainSlice';
import Transactions from './Transactions';



const Profile = () => {

    const {blockchain, dataUser, dispatch} = useBlockchain()

    const inputRef = useRef(null)

    const handleMint = ()=>{
        if(inputRef.current.value>0){minter(inputRef.current.value)}
        else{
            console.log('Value could not be 0')
        }
    }

    const minter = async(_value)=>{

        let data = {
            from: blockchain.account
        }

        const tx = await blockchain.contracNFT.ConvertDenom(_value, data)
        await tx.wait().then((resp)=>{
            console.log(resp)
        })
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
                                handleMint()
                            }}
                            >Submit</button>
                    </div>
                </form>       
            </div>   

        </div>    
        
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