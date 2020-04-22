import React from 'react'
import ProgressiveImage from 'react-progressive-image'

function Picture (props) {
  return (
      <ProgressiveImage src={props.quest.imageUrl} placeholder="/img/ww-quest-low.jpg">
          {src => <img src={src} className="img-fluid" alt="Responsive image" />}
      </ProgressiveImage>
      )
}

export default Picture
