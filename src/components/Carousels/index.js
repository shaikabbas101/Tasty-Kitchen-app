import './index.css'

const Carousels = props => {
  const {carouselData} = props
  const {imageUrl} = carouselData
  return (
    <div className="carousel-container">
      <img alt="carousel_img" src={imageUrl} className="w-100" />
    </div>
  )
}
export default Carousels
