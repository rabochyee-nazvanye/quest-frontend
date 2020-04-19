import React from 'react'

function Picture (props) {
  return (
      <img width = "1150" height = "300" src={props.quest.imageUrl} className="img-fluid" alt="Responsive image"/>
      )
}

export default Picture
