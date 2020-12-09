import React, { useState, useEffect } from 'react'
import AddNewPerson from './components/AddNewPerson'
import Person from './components/Person'
import ShowPersons from './components/ShowPersons'
import PersonFilter from './components/PersonFilter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ successOrFailure, setSuccessOrFailure ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(res => setPersons(res))
  }, [])

  const resetNameAndNumberFields = () => {
    setNewName('')
    setNewNumber('')
  }

  const setSuccessOrErrorMessage = (msg, success) => {
    success ? setSuccessOrFailure(true) : setSuccessOrFailure(false)

    setMessage(msg)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value)
  }

  const handlePersonDelete = (id, name) => {
    if (!window.confirm(`Delete ${ name }?`)) return

    personService
      .deletePerson(id)
      .then(res => {
        setSuccessOrErrorMessage(`Removed ${ name } from phonebook`, true)
      })
      .catch(res => {
        setSuccessOrErrorMessage(`Information of ${ name } has already been removed from server`)
      })

      setPersons([...persons].filter(x => x.id !== id))
  }

  const showNames = persons
    .filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
    .map(person => <Person key={ person.name } name={ person.name } number={ person.number } handlePersonDelete={ () => handlePersonDelete(person.id, person.name) } />)

  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    if (doesPersonAlreadyExist) {
      if (!window.confirm(`${ newName } is already added to phonebook, replace the old number with a new one?`)) {
        resetNameAndNumberFields()
        return
      }

      setSuccessOrErrorMessage(`Updated number for ${ newName }`, true)
      updatePerson()
      resetNameAndNumberFields()
      return
    }

    personService
      .create(newPerson)
      .then(res => {
        newPerson.id = res.id
        setPersons(persons.concat(newPerson))
        setSuccessOrErrorMessage(`Added ${res.name} to phonebook`, true)
      })

    resetNameAndNumberFields()
  } 

  const updatePerson = () => {
    const personToModify = persons.find(x => x.name.toLowerCase() === newName.toLowerCase())
    personToModify.number = newNumber

    personService
      .updatePerson(personToModify)
      .then(res => console.log(`${ res.name } updated`))
  }

  const doesPersonAlreadyExist = 
    persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
  
  return (
    <div>
      <Notification message={ message } success={ successOrFailure } />
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
