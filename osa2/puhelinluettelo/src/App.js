import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddNewPerson from './components/AddNewPerson'
import Person from './components/Person'
import ShowPersons from './components/ShowPersons'
import PersonFilter from './components/PersonFilter'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => setPersons(res.data))
  }, [])

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
