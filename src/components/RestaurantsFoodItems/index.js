import {Component} from 'react'
import './index.css'

class RestaurantsFoodItems extends Component {
  state = {
    isAdded: false,
    itemCount: 1,
    totalPrice: 0,
  }

  increaseItemCount = () => {
    this.setState(preState => ({
      itemCount: preState.itemCount + 1,
    }))
  }

  decreaseItemCount = () => {
    const {itemCount} = this.state
    const {onRemoveCartItem, itemsDetails} = this.props
    if (itemCount > 1) {
      this.setState(preState => ({
        itemCount: preState.itemCount - 1,
      }))
    } else {
      this.setState(
        {
          isAdded: false,
        },
        onRemoveCartItem(itemsDetails.id),
      )
    }
  }

  renderCounterItem = () => {
    const {itemCount} = this.state
    return (
      <div className="d-flex flex-row align-items-center">
        <button
          type="button"
          onClick={this.decreaseItemCount}
          className="plus-minus-btn mr-2"
        >
          -
        </button>
        <p className="item-count">{itemCount}</p>
        <button
          type="button"
          onClick={this.increaseItemCount}
          className="plus-minus-btn ml-2"
        >
          +
        </button>
      </div>
    )
  }

  setTotalPriceInLocalStorage = () => {
    const {totalPrice} = this.state
    localStorage.setItem('totalCost', JSON.stringify(totalPrice))
  }

  onAddItem = () => {
    const {onAddCartItem, itemsDetails} = this.props
    this.setState(
      prevState => ({
        isAdded: !prevState.isAdded,
      }),
      onAddCartItem(itemsDetails),
    )
    this.setState(
      prevState => ({
        totalPrice: prevState.totalPrice + itemsDetails.cost,
      }),
      this.setTotalPriceInLocalStorage(),
    )
  }

  renderAddButton = () => (
    <button className="add-btn" type="button" onClick={this.onAddItem}>
      ADD
    </button>
  )

  render() {
    const {isAdded} = this.state
    const {itemsDetails} = this.props
    const {name, imageUrl, rating, cost} = itemsDetails
    return (
      <div className="d-flex flex-row mb-3">
        <img alt="food_img" src={imageUrl} className="food-item-img" />
        <div className="restaurant-item-description ml-3">
          <h1 className="restaurant-item-name">{name}</h1>
          <p className="item-cost">
            <i className="fas fa-rupee-sign mr-2"> </i>
            <span>{cost}.00</span>
          </p>
          <div className="d-flex flex-row">
            <i className="fas fa-star star-icon"> </i>
            <p className="rating">{rating}</p>
          </div>
          <div>
            {isAdded ? this.renderCounterItem() : this.renderAddButton()}
          </div>
        </div>
      </div>
    )
  }
}

export default RestaurantsFoodItems
