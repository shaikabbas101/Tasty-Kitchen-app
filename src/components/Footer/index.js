import './index.css'

const Footer = () => (
  <div className="footer-background-container">
    <h1 className="footer-title">Tasty Kitchens</h1>
    <p className="footer-description">
      The only thing we`re serious about is food.
    </p>
    <div className="icons-container">
      <a href="https://www.google.co.in/">
        <i className="fab fa-google social-logo"> </i>
      </a>
      <a href="https://twitter.com/?lang=en">
        <i className="fab fa-twitter social-logo"> </i>
      </a>
      <a href="https://www.instagram.com/">
        <i className="fab fa-instagram social-logo"> </i>
      </a>
      <a href="https://www.youtube.com/">
        <i className="fab fa-youtube social-logo"> </i>
      </a>
    </div>
  </div>
)

export default Footer
