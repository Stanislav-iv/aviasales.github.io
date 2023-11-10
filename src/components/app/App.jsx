import React from 'react'

import logo from '../img/Logo.svg'
import Side from '../side/Side'
import Filter from '../filter/Filter'
import TicketList from '../ticketList/TicketList'

import './App.scss'

const App = () => {
  return (
    <div className="main">
      <div className="menu">
        <div className="header">
          <img src={logo} alt="logo" />
        </div>
        <div className="list">
          <Side />
          <div className="list__main">
            <Filter />
            <TicketList />
          </div>
        </div>
      </div>
    </div>
  )
}
export default App
