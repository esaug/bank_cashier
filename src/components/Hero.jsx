import React, { useRef, useEffect } from 'react'
import { useBlockchain } from '../hook/blockchain';
import { conexion } from '../redux/slices/blockchainSlice';
import { fetching } from '../redux/slices/dataSlice';

function Hero() {
    
    const {blockchain, dataUser, dispatch} = useBlockchain()
    const inputRef = useRef(null)

    const handleConnection = ()=>{
        dispatch(conexion())
    }

    const handleMint = ()=>{
        minter(inputRef.current.value)
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

    const fetch = (_blockchain, _dispatch, _contract)=>{
        fetching(_blockchain, _dispatch, _contract)
    }


    useEffect(()=>{

    },[blockchain])

    useEffect(()=>{
        
        fetch(blockchain.account, dispatch, blockchain.contracNFT)
        const interval = setInterval(()=>{ 
            console.log(blockchain)
            fetch(blockchain.account, dispatch, blockchain.contracNFT)
        },5000)
        return()=>clearInterval(interval)
    }, [])

    return (
        <>
            <div className='w-full divHero grid grid-cols-3 bg-lime-500'>
                
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
                                            className="bg-blue-500 hover:bg-blue-700 
                                            text-white font-bold py-2 px-4 rounded"
                                            onClick={(e)=>{
                                                e.preventDefault()
                                                handleMint()
                                            }}
                                        >Submit</button>
                                    </div>
                                </form> 
                            </>
                        ) : (
                            <>
                                <div>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 
                                        text-white font-bold py-2 px-4 rounded"
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            handleConnection()
                                        }}
                                    >Connect</button>
                                </div>
                            </>
                        )}
                    </div>
                    
                </div>

            </div>

            <div className='w-full h-screen transactions bg-lime-500'>
                <div className=''></div>
                <div className=''>
                    <h1>HOLA</h1>
                </div>
                <div className=''></div>
            </div>
        </>
    )
}

export default Hero