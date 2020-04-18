import React from 'react'
import localPict from '../Picture/localPict.png'

function Picture (props) {
  return (
      <img width = "1150" height = "300" src={localPict} className="img-fluid" alt="Responsive image"/>
      )
}

export default Picture
