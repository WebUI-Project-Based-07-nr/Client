import React from 'react'
import './Container.css'

const Container = () => {
  const items = Array(9).fill(0)

  return (
    <div className='container'>
      {items.map((_, index) => (
        <div className='card' key={index}>
          <div className='card-header'>
            <div>
              <h3>Markian Mark</h3>
              <p>Bro</p>
            </div>
          </div>
          <div className='card-body'>
            <h4>Advanced Driver</h4>
            <p>Subject:</p>
            <p>75 UAH</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Container
