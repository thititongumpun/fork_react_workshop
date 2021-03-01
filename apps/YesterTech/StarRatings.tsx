import * as React from 'react'
import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa'
import { ReactFCNoChildren } from 'YesterTech/types'
import 'YesterTech/StarRatings.scss'

export interface StarRatingsProps {
  rating: number
}

const StarRatings: ReactFCNoChildren<StarRatingsProps> = ({ rating }): React.ReactElement => {
  let stars = []

  // Add filled in star(s)
  for (let i = 0; i < Math.floor(rating); i++) {
    stars.push(<FaStar key={`star-${i}`} />)
  }

  // Add half star
  if (rating % 1 > 0) stars.push(<FaStarHalfAlt key={`star-half`} />)

  // Add empty star(s)
  while (stars.length < 5) stars.push(<FaRegStar key={`star-empty-${stars.length}`} />)

  return <span className="star-ratings">{stars}</span>
}

export default StarRatings
