import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import Select from 'react-select'
import { EDIT_AUTHOR_AGE, ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const [age, setAge] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const [ editAuthorAge ] = useMutation(EDIT_AUTHOR_AGE, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (!props.show || !props.authors) {
    return null
  }

  const authors = props.authors.allAuthors.map(x => {
    return { value: x, label: x.name }
  })

  const submit = async (event) => {
    event.preventDefault()

    const author = selectedOption.label
    editAuthorAge({ variables: { name: author, setBornTo: age } })
    setAge('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {props.authors.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={ submit }>
        <Select 
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={authors}
        />
        born
        <input
          type="text"
          value={age}
          onChange={({ target }) => setAge(parseInt(target.value))}
        />
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors