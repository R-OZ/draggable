import React from 'react'

const Buttons = ({id, addFunc, updateFunc}) => {
  return (
    <div className='button-container'>
        <button className='button btn-add' 
            // style={{filter: id ? 'brightness(0.6)' : 'brightness(1)'}} 
            type='submit'
            onClick={addFunc}
            >
            ADD
        </button>
        <button className='button btn-edit' 
            disabled={!id} 
            style={{filter: !id ? 'brightness(0.6)' : 'brightness(1)'}} 
            type='button'
            onClick={updateFunc}
            >
            UPDATE
        </button>
    </div>          
  )
}

export default Buttons