import React from 'react'

function PopUpNFT (props)  {



  return (props.trigger) ? (
        <div className='profile_popup'>
            <div className='profile_popup_innner'>
                <button onClick={()=>{props.settrigger(false)}} className='profile_popup_close_btn' >X</button>
                {props.children}
            </div>
        </div>
        
        ) : "";
    
}

export default PopUpNFT