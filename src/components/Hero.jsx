import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useBlockchain } from '../hook/hooks';
import { conexion } from '../redux/slices/blockchainSlice';
import { fetchData } from '../redux/slices/dataSlice';
import Transactions from './Transactions';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';

function Hero() {
    
    const {blockchain, dataUser, dispatch} = useBlockchain()

    const inputRef = useRef(null)
    const navigate = useNavigate()

    const handleConnection = ()=>{
        dispatch(conexion(dispatch))
        navigate("/Profile")
        
    }

    
    return (
        <>
            <div className='w-full divHero grid grid-cols-3 bg-blue-300'>
                
                <div>
                    
                </div>

                <div className='justify-center grid grid-rows-3'>
                    <div></div>
                    
                    <div>
                        <div>
                            <div>
                                <h1 className='p2 pb-10'>SAU-BANK</h1>
                            </div>
                            <button
                                className="p bg-blue-500 hover:bg-blue-700 
                                text-white font-bold py-2 px-4 rounded"
                                onClick={(e)=>{
                                    e.preventDefault()
                                    handleConnection()
                                }}
                                >Connect Metamask</button>
                                </div>
                    </div>
                </div>
            </div>

            <div className='w-full h-screen transactions bg-blue-300'>
                <div className=''></div>
                <div className=''>
                    
                </div>
                <div className=''></div>
            </div>
        </>
    )
}

export default Hero