import React from 'react'
import ProgressiveImage from 'react-progressive-image'

function Picture (props) {
  return (
      <ProgressiveImage src={props.quest.imageUrl} placeholder="tiny-image.jpg">
          {src => <img width = "1150" height = "300" src={src} className="img-fluid" alt="Responsive image" />}
      </ProgressiveImage>
      )
}

export default Picture
