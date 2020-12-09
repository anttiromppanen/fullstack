import React from 'react'

const Country = ({ name, capital, population, languages, flag }) => {

  const languagesList = languages.map(x => <li key={ x.name }>{ x.name }</li>)

  return (
    <div>
      <h2>{ name }</h2>
      <p>Capital: { capital }</p>
      <p>Population: { population }</p>
      <h3>Languages</h3>
      <ul>
        { languagesList }
      </ul>
      <img src={ flag } alt={`Flag of ${ name }`} title={`Flag of ${ name }`} height="200"  width="300" />
    </div>
  )
}

export default Country
