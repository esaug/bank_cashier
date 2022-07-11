import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useBlockchain } from '../hook/hooks';
import { conexion } from '../redux/slices/blockchainSlice';
import { fetchData } from '../redux/slices/dataSlice';
import Transactions from './Transactions';

function Hero() {
    
    //const {blockchain, dataUser, dispatch} = useBlockchain()

    const blockchain = useSelector((store)=>store.blockchain)
    const dataUser = useSelector((store)=>store.dataUser)

    const dispatch = useDispatch()

    const inputRef = useRef(null)

    

    const handleConnection = ()=>{
        dispatch(conexion(dispatch))
        
    }

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

    // FETCH NFT 
    
    useEffect(()=>{

        fetchData(blockchain.account, dispatch, blockchain.contracNFT)
        const interval = setInterval(()=>{
            fetchData(blockchain.account, dispatch, blockchain.contracNFT)
        },5000)
        return()=>clearInterval(interval)
    },[]) 

    useEffect(()=>{

        const interval = setInterval(()=>{
            console.log(dataUser)
        },1000*5)

        return()=>clearInterval(interval)
    },[dataUser])

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
                                    <div></div>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 
                                        text-white font-bold py-2 px-4 rounded"
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            handleConnection()
                                        }}
                                    >Connect Metamask</button>
                                </div>
                            </>
                        )}
                    </div>
                    
                </div>

            </div>

            <div className='w-full h-screen transactions bg-lime-500'>
                <div className=''></div>
                <div className=''>
                    <Transactions data = {dataUser}/>
                </div>
                <div className=''></div>
            </div>
        </>
    )
}

export default Hero