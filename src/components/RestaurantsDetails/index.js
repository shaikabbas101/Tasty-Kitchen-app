import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class RestaurantsDetails extends Component {
  render() {
    const {restaurantsContent} = this.props
    const {imageUrl, name, cuisine, userRating, id} = restaurantsContent
    const {rating, totalReviews} = userRating
    return (
      <Link to={`/add-food/${id}`}>
        <div className="d-flex flex-row justify-content-center align-items-center mb-5">
          <img className="restaurant-img" src={imageUrl} alt="restaurant_img" />
          <div className="restaurant-description ml-3">
            <h1 className="restaurant-name">{name}</h1>
            <p className="cuisine">{cuisine}</p>
            <div className="d-flex flex-row">
              <i className="fas fa-star star-icon"> </i>
              <p className="rating">
                {rating}
                <span className="total-reviews"> ({totalReviews} rating)</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default RestaurantsDetails
