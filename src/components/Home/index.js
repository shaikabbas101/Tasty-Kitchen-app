import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import './index.css'
import NavBar from '../NavBar'
import RestaurantsDetails from '../RestaurantsDetails'
import Carousels from '../Carousels'
import Footer from '../Footer'
import SortingItems from '../SortingItems'

const sortByOptions = [
  {
    optionId: 'Highest',
    displayText: 'Highest',
  },
  {
    optionId: 'Lowest',
    displayText: 'Lowest',
  },
]

class Home extends Component {
  state = {
    isLoading: true,
    carouselImages: [],
    activePage: 1,
    popularRecipes: [],
    activeOptionId: sortByOptions[0].optionId,
  }

  componentDidMount() {
    this.getPopularRestaurantRecipes()
    this.getCarouselImages()
  }

  getFormattedCarouselData = data =>
    data.offers.map(eachCarousal => ({
      id: eachCarousal.id,
      imageUrl: eachCarousal.image_url,
    }))

  getCarouselImages = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    }
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const response = await fetch(url, options)
    const data = await response.json()
    const formattedData = this.getFormattedCarouselData(data)
    this.setState({
      carouselImages: formattedData,
      isLoading: false,
    })
  }

  getFormattedRestaurantsData = data =>
    data.restaurants.map(eachRestaurant => ({
      costForTwo: eachRestaurant.cost_for_two,
      cuisine: eachRestaurant.cuisine,
      groupByTime: eachRestaurant.group_by_time,
      hasOnlineDelivery: eachRestaurant.has_online_delivery,
      hasTableBooking: eachRestaurant.has_table_booking,
      id: eachRestaurant.id,
      imageUrl: eachRestaurant.image_url,
      isDeliveringNow: eachRestaurant.is_delivering_now,
      location: eachRestaurant.location,
      menuType: eachRestaurant.menu_type,
      name: eachRestaurant.name,
      opensAt: eachRestaurant.opens_at,
      userRating: {
        rating: eachRestaurant.user_rating.rating,
        ratingColor: eachRestaurant.user_rating.rating_color,
        ratingText: eachRestaurant.user_rating.rating_text,
        totalReviews: eachRestaurant.user_rating.total_reviews,
      },
    }))

  getPopularRestaurantRecipes = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {activePage, activeOptionId} = this.state
    const offset = (activePage - 1) * 9
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    }
    const url = `https://apis.ccbp.in/restaurants-list?&offset=${offset}&limit=9&sort_by_rating=${activeOptionId}`
    const response = await fetch(url, options)
    const data = await response.json()
    const formattedData = this.getFormattedRestaurantsData(data)
    this.setState({
      popularRecipes: formattedData,
    })
  }

  updateActiveOptionId = activeOptionId => {
    this.setState({activeOptionId}, this.getPopularRestaurantRecipes)
  }

  renderPopularRestaurants = () => {
    const {activeOptionId, popularRecipes} = this.state
    return (
      <div>
        <h1 className="popular-restaurants-heading">Popular Restaurants</h1>
        <div className="description-and-sorting-container">
          <p className="popular-restaurants-description">
            Select Your favorite restaurant special dish and make your day
            happy...
          </p>

          <SortingItems
            activeOptionId={activeOptionId}
            sortByOptions={sortByOptions}
            updateActiveOptionId={this.updateActiveOptionId}
          />
        </div>
        <hr className="hr-tag" />
        <div className="popular-restaurants-items">
          {popularRecipes.map(eachRestaurant => (
            <RestaurantsDetails
              restaurantsContent={eachRestaurant}
              key={eachRestaurant.id}
            />
          ))}
        </div>
      </div>
    )
  }

  increasePageNo = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getPopularRestaurantRecipes,
      )
    }
  }

  decreasePageNo = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getPopularRestaurantRecipes,
      )
    }
  }

  renderHomePage = () => {
    const {carouselImages, activePage} = this.state
    const settings = {
      animateOut: 'slideOutDown',
      animateIn: 'flipInX',
      items: 1,
      margin: 30,
      stagePadding: 30,
      smartSpeed: 450,
      loop: true,
      dots: true,
      autoplay: true,
    }
    return (
      <div>
        <NavBar />
        <div className="container mt-4">
          <Slider {...settings}>
            {carouselImages.map(eachCarousal => (
              <Carousels carouselData={eachCarousal} />
            ))}
          </Slider>
          <div className="mt-5">{this.renderPopularRestaurants()}</div>
        </div>
        <div className="d-flex flex-row justify-content-center pt-3 pb-4">
          <button
            type="button"
            className="chevron-container"
            onClick={this.decreasePageNo}
          >
            <i className="fas fa-chevron-left"> </i>
          </button>
          <div>
            <p className="ml-2 mr-2 active-page">{activePage} of 4</p>
          </div>
          <button
            type="button"
            className="chevron-container"
            onClick={this.increasePageNo}
          >
            <i className="fas fa-chevron-right"> </i>
          </button>
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
    return <div>{isLoading ? this.renderLoader() : this.renderHomePage()}</div>
  }
}

export default Home
