import React from 'react'
import Country from './Country'
import GetCapitalWeather from './GetCapitalWeather' 

const ShowCountries = ({ countries, setFilterValue }) => {

  const handleClick = (name) => {
    setFilterValue(name)
  }

  const printCountries = () => {
    if (countries.length > 10) {
      return <p> Too many matches, specify another filter </p>
    } else if (countries.length > 1) {
        const listOfCountries = 
          countries
            .map(x => <li key={ x.numericCode }>{ x.name } <button onClick={ () => handleClick(x.name) }>show</button></li>)
        return <ul>{ listOfCountries }</ul>
    } else if (countries.length === 1) {
        const country = countries[0]

        return (
          <div>
             <Country 
               name={ country.name }
               capital={ country.capital }
               population={ country.population }
               languages={ country.languages }
               flag={ country.flag }
             />
             <GetCapitalWeather capital={ country.capital } />
          </div>
        )
    }
  }

  return (
    <>
      { printCountries() }
    </>
  )
}

export default ShowCountries
