import React, { useState } from 'react'
import AddNewPerson from './components/AddNewPerson'
import Person from './components/Person'
import ShowPersons from './components/ShowPersons'
import PersonFilter from './components/PersonFilter'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')

  const showNames = persons
    .filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
    .map(person => <Person key={ person.name } name={ person.name } number={ person.number } />)
 
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
    const newPerson = { name: newName, number: newNumber }

    if (doesPersonAlreadyExist) {
      return alert(`${newName} is already added to phonebook`)
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  } 

  const doesPersonAlreadyExist = 
    persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
  
  return (
    <div>
      <h2>Phonebook</h2>
      <PersonFilter filterValue={ filterValue } handleFilterChange={ handleFilterChange } />
      <h2>add a new</h2>
      <AddNewPerson
        addPerson={ addPerson }
        newName={ newName }
        handleNameChange={ handleNameChange }
        newNumber={ newNumber }
        handleNumberChange={ handleNumberChange }
      />
      <h2>Numbers</h2>
      <ShowPersons persons={ showNames }  /> 
    </div>
  )

}

export default App
