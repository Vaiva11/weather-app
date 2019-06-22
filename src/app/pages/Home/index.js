import React from 'react';
import './index.scss';
import 'react-dropdown/style.css'
import Select from 'react-select'

function Home() {
  const countries = [
    {
      label: "Lithuania", value: 1
    },
    {
      label: "Latvia", value: 2
    },
    {
      label: "Estonia", value: 3
    },
    {
      label: "Poland", value: 4
    },
  ]

  return (
    <div className="home">
      <div className="home--list">
        <h1>Choose country</h1>
        <Select options={countries} className="selector" />
      </div>
      <div className="home--map">
        MAP
      </div>
      <div className="home--cities">
        cities
      </div>
    </div>
  )
}

export default Home;