import React from 'react'

const Notification = ({ error, response, addCount, updateCount, closeNotification}) => {
  return (
    <>
      {error || response ?
        <div className='notification-container' >
          <p className='notification' style={{ background: error? 'red' : 'green'}}>{ error ?? response}</p>
          {addCount || updateCount &&<p className='notification-count'>
            {addCount && <span> Add Count: {addCount}</span>}  
            {updateCount && <span> Update Count: {updateCount}</span>}
          </p>}
          <button onClick={closeNotification} className='notification-close'>X</button>
        </div>
      : null}
    </>
  )
}

export default Notification