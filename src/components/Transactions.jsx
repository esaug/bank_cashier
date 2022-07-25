import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useBlockchain } from '../hook/blockchain';
import { fetchData } from '../redux/slices/dataSlice';

function Transactions() {

    const {blockchain, dataUser, dispatch} = useBlockchain()

    
    //FETCH DATA FUNCTION

    const fetching = ()=>{
        fetchData(blockchain.account, dispatch, blockchain.contracNFT)
    }


    const {OwnerNFTs, arrayMetadata, saldoCajero} = dataUser

    // FETCH NFT 

    useEffect(()=>{
        fetching()
        const interval = setInterval(()=>{
            fetching()
        }, 1000*8)
        return()=>{
            clearInterval(interval)
        }
    },[blockchain])

  return (
    
    <div className=' grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>
        {OwnerNFTs == null ?(<></>) : (
            <>
                {arrayMetadata.map((item, index)=>{
                    let imagen = item.image.slice(7)
                
                    return(
                        <div key={index} className="p pt-10">
                            
                            <div>
                                <p>
                                {item.name} - ID: {parseInt(OwnerNFTs[index])}
                                </p>
                            </div>
                            <div>
                                <img
                                    src={`https://ipfs.io/ipfs/${imagen}`}
                                    className="imgNFT text-center inline-block justify-center"
                                />
                            </div>
                            <div>
                                <p>
                                    Value: {item.attributes[1].value}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </>
        )}
    </div>
    
  )
}

export default Transactions