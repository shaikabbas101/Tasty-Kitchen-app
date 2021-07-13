import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import './index.css'
import Footer from '../Footer'
import NavBar from '../NavBar'
import CartItems from '../CartItems'

class Cart extends Component {
  renderEmptyCart = () => (
    <div className="empty-cart-bg-container">
      <div className="empty-cart-content-container">
        <img
          className="empty-cart-img"
          alt="empty_cart_img"
          src="https://res.cloudinary.com/dkr26vkii/image/upload/v1626117321/Layer_2_i5mgp1.png"
        />
        <h1 className="empty-cart-heading mt-3">No Orders Yet</h1>
        <p className="empty-cart-description mt-3">
          Your cart is empty. Add something from the menu.
        </p>
        <Link to="/">
          <button className="empty-cart-order-now-btn mb-5" type="button">
            Order Now
          </button>
        </Link>
      </div>
    </div>
  )

  renderCartOrders = () => {
    const cartItems = localStorage.getItem('cartItems')
    const parsedCartItems = JSON.parse(cartItems)
    const costArray = parsedCartItems.map(eachItem =>
      parseFloat(eachItem.cost, 10),
    )
    const initialValue = 0
    const reducer = (accumulator, item) => accumulator + item

    const totalCost = costArray.reduce(reducer, initialValue)

    return (
      <>
        <div className="cart-bg-container container mt-4 p-3">
          <div className="item-quantity-price-heading-container d-none d-md-flex">
            <p className="item-head">Item</p>
            <p className="item-head quantity">Quantity</p>
            <p className="item-head">Price</p>
          </div>

          <div className="cart-items-bg-container">
            {parsedCartItems.map(cartItem => (
              <CartItems cartItem={cartItem} />
            ))}
            <hr className="cart-hr-tag" />
            <div className="order-total-container">
              <h1 className="order-total-heading">Order Total:</h1>
              <div className="d-flex flex-row total-price">
                <BiRupee className="mt-1" />
                <p>{totalCost}</p>
              </div>
            </div>
            <Link to="/payment" className="order-btn-container mt-4">
              <button type="button" className="confirm-btn">
                Confirm Order
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  renderCartPage = () => {
    const cartItems = localStorage.getItem('cartItems')
    const parsedCartItems = JSON.parse(cartItems)
    const isCartEmpty = parsedCartItems === null || parsedCartItems.length === 0
    return (
      <div className="d-flex flex-column">
        <NavBar />

        <div>
          {isCartEmpty ? this.renderEmptyCart() : this.renderCartOrders()}
        </div>
      </div>
    )
  }

  render() {
    return <div className="carts-container">{this.renderCartPage()}</div>
  }
}

export default Cart
