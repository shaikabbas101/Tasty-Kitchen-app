import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-bg-container">
    <div className="w-75">
      <img
        className="not-found-img"
        alt="not_found_img"
        src="https://res.cloudinary.com/dkr26vkii/image/upload/v1626118808/Layer_1_hpmu1g.png"
      />
      <h1 className="not-found-heading mt-3">PAGE NOT FOUND</h1>
      <p className="not-found-description mt-3">
        we’re sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <Link to="/">
        <button className="not-found-home-btn mb-5" type="button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
