import {BsFillStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
  } = similarJobDetails
  return (
    <li className="each-similar-job-item">
      <div className="logo-title-star-container">
        <img src={companyLogoUrl} alt="company logo" className="company-logo" />
        <div>
          <h1 className="title">{title}</h1>
          <div className="star-container">
            <BsFillStarFill className="fill-star icon" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description">Description</h1>
      <p>{jobDescription}</p>
      <div className="location-job-type-salary-container">
        <div className="location-job-type-container">
          <div className="location-container">
            <MdLocationOn className="icon" />
            <p>{location}</p>
          </div>
          <div className="location-container">
            <MdLocationOn className="icon" />
            <p>{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
