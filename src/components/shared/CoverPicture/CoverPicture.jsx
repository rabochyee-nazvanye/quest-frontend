import React from 'react'
import ProgressiveImage from 'react-progressive-image'
import './CoverPicture.css'
import { PropTypes } from 'prop-types'

export default function CoverPicture (props) {
  return (
    <div className={'rounded-edges'}>
      <ProgressiveImage src={props.url} placeholder="tiny-image.jpg">
        {src => <img src={src} className="cover-image__fluid cover-image__rounded-edges" alt="Обложка" />}
      </ProgressiveImage>
    </div>
  )
}

CoverPicture.propTypes = {
  url: PropTypes.string
}
