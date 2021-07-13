import './index.css'
import {Link} from 'react-router-dom'

const Payment = () => (
  <div className="payment-bg-container">
    <div className="payment-content-container shadow">
      <img
        className="mb-3"
        alt="success_icon"
        src="https://res.cloudinary.com/dkr26vkii/image/upload/v1626115960/Vector_kqvxus.png"
      />
      <h1 className="payment-heading mb-3">Payment Successful</h1>
      <p className="payment-description">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/">
        <button className="home-page-btn" type="button">
          Go To Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default Payment
