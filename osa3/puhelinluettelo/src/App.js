import React, { useState, useEffect } from 'react'
import PersonFilter from './Components/PersonFilter'
import AddPerson from './Components/AddPerson'
import Person from './Components/Person'
import personService from './services/persons'
import Notification from './Components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errorOrSuccess, setErrorOrSuccess ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(res => setPersons(res))
  }, [])

  const doesPersonExistAlready = persons
    .find(x => x.name.toLowerCase() === newName.toLowerCase())

  const clearNewName = () => setNewName('')
  const clearNewNumber = () => setNewNumber('')
  const makeLowerCase = word => word.toLowerCase()
  const filterPerson = name => [...persons].filter(x => makeLowerCase(x.name) !== makeLowerCase(name))
  const setMessageHelper = (msg, trueForSuccessFalseForError) => {
    setMessage(msg)
    setErrorOrSuccess(trueForSuccessFalseForError)
    setTimeout(() => {
      setMessage(null)
      setErrorOrSuccess(null)
    }, 3000)
  }

  const handlePersonDelete = (id, name) => {
    if (!window.confirm(`Delete ${ name }?`)) return

    personService
      .deletePerson(id)
      .then(res => setPersons(filterPerson(name)))
      .catch(res => {
        setMessageHelper(`Information of ${ name } has already been removed from server`, false)
        setPersons(filterPerson(name))
      })
  }

  const showPersons = persons
    .filter(x => makeLowerCase(x.name).includes(makeLowerCase(filterValue)))
    .map(x => 
      <Person 
        key={ x.name } 
        name={ x.name } 
        number={ x.number }
        handlePersonDelete={ () => handlePersonDelete(x.id, x.name) }
      />
    )

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

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (doesPersonExistAlready) {
      if (!window.confirm(`${ newName } is already added to phonebook, replace the old number with a new one?`)) {
        clearNewName()
        clearNewNumber()
        return
      }

      const person = persons.find(x => makeLowerCase(x.name) === makeLowerCase(newName))
      const updatedPerson = { ...person, number: newNumber }

      personService
        .updatePerson(person.id, newPerson)
        .then(res => setPersons(persons.map(x => makeLowerCase(x.name) !== makeLowerCase(newName) ? x : updatedPerson)))
        .then(res => {
          clearNewName()
          clearNewNumber()
        })

        return
      }

      personService
        .create(newPerson)
        .then(res => {
          setPersons(persons.concat(res))
          setMessageHelper(`Added ${ res.name }`, true)
        })
        .then(() => {
          personService
            .getAll()
            .then(res => setPersons(res))
        })
     

      clearNewName()
      clearNewNumber()
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={ message } errorOrSuccess={ errorOrSuccess } />
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
