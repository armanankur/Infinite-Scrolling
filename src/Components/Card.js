import React from 'react'
import "./Card.css"

function Card(props) {
  const {person}= props;
  return (
    <div className = "card" key = {person.id}>
         <img className = "cardImg" src={person.url} loading="lazy" alt='image_not_found'/>
        <h3>
          {person.name}
        </h3>
    </div>
  )
}

export default Card