import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import NavBar from '../NavBar'
import Footer from '../Footer'
import RestaurantsFoodItems from '../RestaurantsFoodItems'
import './index.css'

// localStorage.removeItem('cartItems')

// localStorage.removeItem('totalCost')

class AddFood extends Component {
  state = {
    isLoading: true,
    specificRestaurantDetails: [],
    cart: [],
  }

  componentDidMount() {
    this.getSpecificRestaurantData()
  }

  getFormattedFoodItems = foodItem =>
    foodItem.map(eachItem => ({
      cost: eachItem.cost,
      foodType: eachItem.food_type,
      id: eachItem.id,
      imageUrl: eachItem.image_url,
      name: eachItem.name,
      rating: eachItem.rating,
    }))

  getFormattedData = data => ({
    costForTwo: data.cost_for_two,
    cuisine: data.cuisine,
    foodItems: this.getFormattedFoodItems(data.food_items),
    id: data.id,
    imageUrl: data.image_url,
    itemsCount: data.items_count,
    location: data.location,
    name: data.name,
    opensAt: data.opens_at,
    rating: data.rating,
    reviewsCount: data.reviews_count,
  })

  getSpecificRestaurantData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const formattedData = this.getFormattedData(data)
    this.setState({
      specificRestaurantDetails: formattedData,
      isLoading: false,
    })
  }

  addToLocalStorage = () => {
    const {cart} = this.state
    localStorage.setItem('cartItems', JSON.stringify(cart))
  }

  addToCart = items => {
    const {cart} = this.state
    this.setState(
      {
        cart: [...cart, items],
      },
      this.addToLocalStorage,
    )
  }

  removeFromCart = itemId => {
    const {cart} = this.state
    const itemIndex = cart.findIndex(eachItem => {
      if (itemId === eachItem.id) {
        return true
      }
      return false
    })
    cart.splice(itemIndex, 1)
    localStorage.setItem('cartItems', JSON.stringify(cart))
  }

  renderAddFood = () => {
    const {specificRestaurantDetails} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      costForTwo,
      foodItems,
    } = specificRestaurantDetails
    return (
      <div>
        <NavBar />
        <div className="specific-hotel-banner">
          <img alt="food_img" src={imageUrl} className="hotel-food-img" />
          <div className="specific-hotel-details ml-4 pt-3 pb-3 pr-3">
            <h1 className="specific-hotel-name">{name}</h1>
            <p className="specific-cuisine">{cuisine}</p>
            <p className="specific-hotel-location">{location}</p>
            <div className="d-flex flex-row">
              <div>
                <p className="text-white">
                  <i className="fas fa-star mr-2"> </i>
                  <span>{rating}</span>
                </p>
                <p className="ratings-and-cost-of-two">200+ ratings</p>
              </div>
              <vl className="vertical-line ml-3 mr-3" />
              <div>
                <p className="text-white">
                  <i className="fas fa-rupee-sign mr-2"> </i>
                  <span>{costForTwo}</span>
                </p>
                <p className="ratings-and-cost-of-two ">Cost of two</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-3">
          <div className="d-md-none">
            <h1 className="popular-restaurants-heading">Popular Restaurants</h1>
            <div>
              <p className="popular-restaurants-description">
                Select Your favorite restaurant special dish and make your day
                happy...
              </p>
            </div>
          </div>

          <div className="food-items-container">
            {foodItems.map(eachItem => (
              <RestaurantsFoodItems
                itemsDetails={eachItem}
                key={eachItem.id}
                onAddCartItem={this.addToCart}
                onRemoveCartItem={this.removeFromCart}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container" id="loaderContainer">
      <Loader type="Oval" color="#F7931E" height="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return <div>{isLoading ? this.renderLoader() : this.renderAddFood()}</div>
  }
}

export default AddFood

//   increaseItemCount = itemId => {
//     const {cart} = this.state
//     const itemIndex = cart.findIndex(eachItem => {
//       if (itemId === eachItem.id) {
//         return true
//       }
//       return false
//     })
//     cart[itemIndex].cost += cart[itemIndex].cost
//     localStorage.setItem('cartItems', JSON.stringify(cart))
//   }

//   decreaseItemCount = (itemId, itemCount) => {
//     const {cart} = this.state
//     const itemIndex = cart.findIndex(eachItem => {
//       if (itemId === eachItem.id) {
//         return true
//       }
//       return false
//     })
//     cart[itemIndex].cost *= itemCount
//     localStorage.setItem('cartItems', JSON.stringify(cart))
//   }
