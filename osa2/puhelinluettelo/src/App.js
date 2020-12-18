import React, { useState } from 'react'
import PersonFilter from './Components/PersonFilter'
import AddPerson from './Components/AddPerson'
import Person from './Components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '050-123123' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
    { name: 'Masa Mainio', number: '09-666' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')

  const doesPersonExistAlready = persons
    .find(x => x.name.toLowerCase() === newName.toLowerCase())

  const clearNewName = () => setNewName('')

  const showPersons = persons
    .filter(x => x.name.toLowerCase().includes(filterValue.toLowerCase()))
    .map(x => <Person name={ x.name } number={ x.number } />)

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()

    if (doesPersonExistAlready)
      return window.alert(`${ newName } is already added to phonebook`)

    const newPerson = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newPerson))
    clearNewName()
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonFilter handleFilterChange={ handleFilterChange } filterValue={ filterValue } />
      <h2>add a new</h2>
      <AddPerson
        addPerson={ addPerson }
        newName={ newName }
        newNumber={ newNumber }
        handleNameChange={ handleNameChange }
        handleNumberChange={ handleNumberChange }
      />
      <h2>Numbers</h2>
      { showPersons }
    </div>
  )

}

export default App
