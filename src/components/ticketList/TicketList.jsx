import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Ticket from '../ticket/Ticket'
import ErrorTicket from '../error/Error'
import Spiner from '../spiner/Spiner'
import { searchFetchId } from '../../store/Service'
import { funShowTicket, funErrorTicket } from '../../store/ReducerFilter'
import Key from '../utilites/Key'

import styles from './TicketList.module.scss'
const TicketList = () => {
  const dispath = useDispatch()
  const check = useSelector((state) => state.filter)

  useEffect(() => {
    try {
      dispath(searchFetchId())
    } catch (error) {
      dispath(funErrorTicket(true))
    }
  }, [dispath])
  const filterdTick = useCallback(
    (tickArr) => {
      return tickArr.filter((current) => {
        if (check.checkAll) return current
        if (check.checkNo && current.segments[0].stops.length === 0 && current.segments[1].stops.length === 0)
          return true
        if (check.checkOne && current.segments[0].stops.length === 1 && current.segments[1].stops.length === 1)
          return true
        if (check.checkTwo && current.segments[0].stops.length === 2 && current.segments[1].stops.length === 2)
          return true
        if (check.checkTre && current.segments[0].stops.length === 3 && current.segments[1].stops.length === 3)
          return true
        return false
      })
    },
    [check]
  )
  const hasData = !(check.loading || check.isError)
  const errorTicket = check.isError ? <ErrorTicket /> : null
  const spinner = check.loading ? <Spiner /> : null
  const notLoading =
    !check.checkAll && !check.checkNo && !check.checkOne && !check.checktwo && !check.checkTre ? (
      <p> not results</p>
    ) : null
  /* eslint-disable */
  const view = hasData
    ? filterdTick(check.tickets)
        .slice(0, check.ShowTicket)
        .map((ticket) => {
          return <Ticket key={Key()} segments={ticket.segments} price={ticket.price} carrier={ticket.carrier} />
        })
    : null
  /* eslint-enable */
  return (
    <div>
      {spinner}
      {errorTicket}
      {notLoading}
      {view}

      <button
        className={styles.list__button}
        type="button"
        onClick={() => dispath(funShowTicket(check.ShowTicket + 5))}
      >
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
      </button>
    </div>
  )
}
export default TicketList
