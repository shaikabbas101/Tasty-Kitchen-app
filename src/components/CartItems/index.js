import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import './index.css'

class CartItems extends Component {
  state = {
    itemCount: 1,
  }

  increaseCartItemCount = () => {
    this.setState(preState => ({
      itemCount: preState.itemCount + 1,
    }))
  }

  decreaseCartItemCount = () => {
    const {itemCount} = this.state
    if (itemCount > 1) {
      this.setState(preState => ({
        itemCount: preState.itemCount - 1,
      }))
    }
  }

  renderCounterItem = () => {
    const {itemCount} = this.state
    return (
      <div className="d-flex flex-row align-items-center">
        <button
          type="button"
          onClick={this.decreaseCartItemCount}
          className="plus-minus-btn mr-2"
        >
          -
        </button>
        <p className="item-count">{itemCount}</p>
        <button
          type="button"
          onClick={this.increaseCartItemCount}
          className="plus-minus-btn ml-2"
        >
          +
        </button>
      </div>
    )
  }

  render() {
    const {itemCount} = this.state
    const {cartItem} = this.props
    const {imageUrl, cost, name} = cartItem
    return (
      <>
        <div className="cart-item-details-container d-none d-md-flex">
          <div className="d-flex flex-row mb-3">
            <img src={imageUrl} alt="cart_food_img" className="cart-food-img" />
            <h1 className="cart-item-name ml-3 mt-5">{name}</h1>
          </div>
          <div className="counter-container">{this.renderCounterItem()}</div>
          <div className="cost-container">
            <BiRupee className="mt-1" />
            <p>{cost * itemCount}</p>
          </div>
        </div>

        <div className="cart-item-mobile-details-container d-md-none mb-3">
          <img src={imageUrl} alt="cart_food_img" className="cart-food-img" />
          <div className="mobile-cart-details-container ml-3">
            <h1 className="cart-item-name mt-5">{name}</h1>
            <div className="counter-container">{this.renderCounterItem()}</div>
            <div className="cost-container mr-auto">
              <BiRupee className="mt-1" />
              <p>{cost * itemCount}</p>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default CartItems
