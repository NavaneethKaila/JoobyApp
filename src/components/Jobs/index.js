import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {Component} from 'react'
import './index.css'
import Header from '../Header'
import Profile from '../Profile'
import FilterGroup from '../FilterGroup'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    activeEmploymentId: '',
    activeSalaryRangeId: '',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    jobsData: [],
  }

  //   renderTypesOfEmployment = () => {
  //     const {employmentTypesList} = this.props
  //     const {activeEmploymentId} = this.state
  //     onClickEmployment = () => {
  //       this.setState({activeEmploymentId: employmentTypeId})
  //     }
  //     return (
  //       <ul>
  //         {employmentTypesList.map(eachType => {
  //           const {label, employmentTypeId} = eachType

  //           return (
  //             <li key={employmentTypeId} onClick={this.onClickEmployment}>
  //               <input type="checkbox" id="checkbox" />
  //               <label htmlFor="checkbox">{label}</label>
  //             </li>
  //           )
  //         })}
  //       </ul>
  //     )
  //   }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeEmploymentId, activeSalaryRangeId, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentId}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput}, this.getJobsData)
  }

  changePackage = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId}, this.getJobsData)
  }

  changeEmployment = activeEmploymentId => {
    this.setState({activeEmploymentId}, this.getJobsData)
  }

  renderJobsListView = () => {
    const {jobsData} = this.state
    return (
      <ul className="jobs-list-container">
        {jobsData.map(eachJob => (
          <li className="job-item-container">
            <div>
              <img src={eachJob.companyLogoUrl} alt="company logo" />
              <div>
                <h1>{eachJob.title}</h1>
                <div>
                  <BsFillStarFill />
                  <p>{eachJob.rating}</p>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <MdLocationOn />
              <p>{eachJob.location}</p>
            </div>
            <hr />
            <p>Description</p>
            <p>{eachJob.jobDescription}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    return (
      <div className="jobs-page-container">
        <Header />
        <div className="jobs-page">
          <div className="profile-filter-options-section">
            <Profile />
            <hr />
            <FilterGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeEmployment={this.changeEmployment}
              changePackage={this.changePackage}
              changeSearchInput={this.changeSearchInput}
            />
          </div>
          {this.renderAllJobs()}
        </div>
      </div>
    )
  }
}

export default Jobs
