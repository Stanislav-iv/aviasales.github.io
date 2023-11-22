import React from 'react'
import cn from 'classnames'
import cnBind from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux'

import { funTickCheap, funTickFaster, funTickOptima, funDataTicketSort } from '../../store/ReducerFilter'
import { sideNames } from '../utilites/SideName'
import Key from '../utilites/Key'

import styles from './Filter.module.scss'
const cx = cnBind.bind(styles)

const Filter = () => {
  const dispath = useDispatch()
  const check = useSelector((state) => state.filter)

  const classnames = cn(cx('list__filter'))
  const cheapClassnames = cn(cx({ filter__onClick: check.tickCheap }, 'list__cheap', 'filter'))
  const fastClassnames = cn(cx({ filter__onClick: check.tickFaster }, 'list__fast', 'filter'))
  const optimaClassnames = cn(cx({ filter__onClick: check.tickOptima }, 'list__optima', 'filter'))

  const sortTicketByPrice = (state) => {
    const filterTickets = state.slice()
    const tick = filterTickets.sort((previous, next) => (previous.price > next.price ? 1 : -1))
    dispath(funDataTicketSort(tick))
    dispath(funTickCheap(true))
    dispath(funTickFaster(false))
    dispath(funTickOptima(false))
  }
  const getTotalFlyDuration = (ticket) =>
    ticket.segments
      .map((element) => element.duration)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0)

  const sortTicketByDuration = (state) => {
    const filterTickets = state.slice()
    const tick = filterTickets.sort((previous, next) =>
      getTotalFlyDuration(previous) > getTotalFlyDuration(next) ? 1 : -1
    )
    dispath(funDataTicketSort(tick))
    dispath(funTickCheap(false))
    dispath(funTickFaster(true))
    dispath(funTickOptima(false))
  }

  const sortTicketOptimal = (state) => {
    const filterTickets = state.slice()
    const tick = filterTickets.sort((previous, next) =>
      getTotalFlyDuration(previous) + previous.price > getTotalFlyDuration(next) + next.price ? 1 : -1
    )

    dispath(funDataTicketSort(tick))
    dispath(funTickCheap(false))
    dispath(funTickFaster(false))
    dispath(funTickOptima(true))
  }
  const classnameArr = [cheapClassnames, fastClassnames, optimaClassnames]
  const funOnClickArr = [sortTicketByPrice, sortTicketByDuration, sortTicketOptimal]
  const filterBox = sideNames.map((el, index) => {
    return (
      <div
        key={Key()}
        role="presentation"
        className={classnameArr[index]}
        onClick={() => {
          funOnClickArr[index](check.tickets)
        }}
      >
        {el}
      </div>
    )
  })

  return <div className={classnames}>{filterBox}</div>
}
export default Filter
