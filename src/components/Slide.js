import React from 'react'
import { css } from '@emotion/css'

const Slide = ({ content }) => (
  <div
    className={css`
      height: 100%;
      width: 100%;
      background-image: url('${content}');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50% 50%;
    `}
  />
)

export default Slide