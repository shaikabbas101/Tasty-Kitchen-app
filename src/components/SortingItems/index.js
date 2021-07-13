import './index.css'
import {BsFilterRight} from 'react-icons/bs'

const SortingItems = props => {
  const {activeOptionId, sortByOptions, updateActiveOptionId} = props
  const onChangeSortBy = event => {
    updateActiveOptionId(event.target.value)
  }
  return (
    <div className="sort-by-container">
      <div className="d-flex flex-row">
        <BsFilterRight className="sort-by-icon" />
        <h1 className="sort-by">Sort by</h1>
      </div>

      <select
        className="sort-by-select"
        value={activeOptionId}
        onChange={onChangeSortBy}
      >
        {sortByOptions.map(eachOption => (
          <option
            key={eachOption.optionId}
            value={eachOption.optionId}
            className="select-option"
          >
            {eachOption.displayText}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SortingItems
