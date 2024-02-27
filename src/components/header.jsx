import React from 'react'

const Header = ({children, color}) => {
  return (
    <div className='header' style={{background: color}}>
        {children}
    </div>
  )
}

export default Header