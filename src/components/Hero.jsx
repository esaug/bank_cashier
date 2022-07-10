import React from 'react'
import { useBlockchain } from '../hook/blockchain';
import { conexion } from '../redux/slices/blockchainSlice';

function Hero() {
    
    const {blockchain, dataUser, dispatch} = useBlockchain()

    const handleConnection = ()=>{
        dispatch(conexion())
    }

    console.log(blockchain)

    return (
        <div className='w-full h-screen grid grid-cols-3 bg-lime-500'>
            <div></div>
            <div className='justify-center grid grid-rows-3'>
                <div></div>
                <div>
                    {blockchain.account ?(
                        <>
                            <form>
                                <div className='pb-5 pl-8'>
                                    <label>
                                    ConvertDenom
                                    </label>
                                </div>
                        
                                <div className='pb-5'>
                                    <input 
                                            type="Number" 
                                            name="Convert" 
                                            className=' border-none'
                                            />
                                </div>
                        
                                <div className='pl-11'>
                                    <input 
                                        type="submit" 
                                        value="Submit" 
                                        className="bg-blue-500 hover:bg-blue-700 
                                        text-white font-bold py-2 px-4 rounded"
                                        />
                                </div>
                            </form> 
                        </>
                    ) : (
                        <>
                            <div>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 
                                    text-white font-bold py-2 px-4 rounded"
                                    onClick={()=>{
                                        handleConnection()
                                    }}
                                >Connect</button>
                            </div>
                        </>
                    )}
                </div>
                <div></div>
            </div>
            <div></div>
        </div>
    )
}

export default Hero