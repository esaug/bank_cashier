import React from 'react'

function PopUpLoading (props)  {



return (props.trigger) ? (
        <div className='mint_popup'>
            <div className='mint_popup_innner rounded'>
                
                {props.children}
            </div>
        </div>
        
        ) : "";
    
}

export default PopUpLoading