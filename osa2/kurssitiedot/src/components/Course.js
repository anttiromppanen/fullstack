import React from 'react'

const Course = ({ course }) => {
  return (
    <div>
      <Header name={ course.name } />
      <Content parts={ course.parts } />
      <Total parts={ course.parts } />
    </div>
  )
}

const Header = ({ name }) => <h2>{ name }</h2>

const Content = ({ parts }) => {

  const partsMapped = 
    parts.map(part => <Part key={ part.id } name={ part.name } exercises={ part.exercises } />)

  return (
    <div>
      { partsMapped }
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Total = ({ parts }) => {

  const numOfExercises = 
    parts.reduce((a, b) => a + b.exercises, 0)

  return (
    <div>
      <b>Total of { numOfExercises } exercises</b>
    </div>
  )
}

export default Course
