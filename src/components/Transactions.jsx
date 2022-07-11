import React from 'react'

function Transactions({data}) {

   
    console.log(data)

    const {Transfers_owner, Transaction_value, Transactions_bills} = data

    console.log('PRUEBA')
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>
        {Transfers_owner.map((item, index)=>{
            return(
                <div key={index}>

                    <div>
                        <p>Transacion_ID: {Number(item._hex)}</p>
                    </div>
                    <div>
                        <p>Value: {Number(Transaction_value[index])}</p>
                    </div>
                    <div>
                        <div className=''>Denominaciones:</div>
                        {Transactions_bills[index][0].map((item,index)=>{
                            return(
                                <div key={index} className='inline-block mr-2 mb-5'>
                                    <p>{Number(item)}$, </p>
                                </div>
                            )
                        })}
                    </div>
                    
                </div>
            )
        })}
    </div>
  )
}

export default Transactions