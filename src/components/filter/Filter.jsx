import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { funTickCheap, funTickFaster, funTickOptima, funGetTicket } from '../../store/ReducerFilter'

import styles from './Filter.module.scss'
const Filter = () => {
  const dispath = useDispatch()
  const check = useSelector((state) => state.filter)

  const sortTicketByPrice = (state) => {
    const filterTickets = state.slice()
    const tick = filterTickets.sort((previous, next) => (previous.price > next.price ? 1 : -1))
    dispath(funGetTicket(tick))
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
    dispath(funGetTicket(tick))
  }

  const sortTicketOptimal = (state) => {
    const filterTickets = state.slice()
    const tick = filterTickets.sort((previous, next) =>
      getTotalFlyDuration(previous) + previous.price > getTotalFlyDuration(next) + next.price ? 1 : -1
    )

    dispath(funGetTicket(tick))
  }

  return (
    <div className={styles.list__filter}>
      <div
        role="presentation"
        className={
          check.tickCheap
            ? `${styles.list__cheap}  ${styles.filter} ${styles.filter__onClick}`
            : `${styles.list__cheap} ${styles.filter}`
        }
        onClick={() => {
          dispath(funTickCheap(true))
          dispath(funTickFaster(false))
          dispath(funTickOptima(false))
          sortTicketByPrice(check.tickets)
        }}
      >
        самый дешевый
      </div>
      <div
        role="presentation"
        className={
          check.tickFaster
            ? `${styles.list__fast}  ${styles.filter} ${styles.filter__onClick}`
            : `${styles.list__fast} ${styles.filter}`
        }
        onClick={() => {
          dispath(funTickCheap(false))
          dispath(funTickFaster(true))
          dispath(funTickOptima(false))
          sortTicketByDuration(check.tickets)
        }}
      >
        самый быстрый
      </div>
      <div
        role="presentation"
        className={
          check.tickOptima
            ? `${styles.list__optima}  ${styles.filter} ${styles.filter__onClick}`
            : `${styles.list__optima} ${styles.filter}`
        }
        onClick={() => {
          dispath(funTickCheap(false))
          dispath(funTickFaster(false))
          dispath(funTickOptima(true))
          sortTicketOptimal(check.tickets)
        }}
      >
        оптимальный
      </div>
    </div>
    // do something
  )
}
export default Filter
