import './index.css'

const FilterGroup = props => {
  const renderTypesOfSalaryRange = () => {
    const {salaryRangesList} = props
    return (
      <ul>
        {salaryRangesList.map(eachType => {
          const {changePackage} = props
          const onSalary = () => changePackage(eachType.salaryRangeId)
          return (
            <li key={eachType.salaryRangeId} onClick={onSalary}>
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox">{eachType.label}</label>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderTypesOfEmployments = () => {
    const {employmentTypesList} = props
    return (
      <ul>
        {employmentTypesList.map(eachType => {
          const {changeEmployment} = props
          const onEmployment = () => changeEmployment(eachType.employmentTypeId)
          return (
            <li key={eachType.employmentTypeId} onClick={onEmployment}>
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox">{eachType.label}</label>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div>
      <p>Type Of Employment</p>
      {renderTypesOfEmployments()}
      <p>Salary Range</p>
      {renderTypesOfSalaryRange()}
    </div>
  )
}

export default FilterGroup
