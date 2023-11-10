import React from 'react'

import styles from './Ticket.module.scss'
const Ticket = ({ segments, price, carrier }) => {
  const priceStr = String(price).replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
  const transplants = (num) => {
    switch (num) {
      case 1:
        return 'ПЕРСАДКА'
      case 2:
      case 3:
      case 4:
        return 'ПЕРЕСАДКИ'
      default:
        return 'ПРЕСАДОК'
    }
  }
  const Minute = (hour, min, indicateHandM = false) => {
    if (indicateHandM) {
      return `${hour < 10 ? `0${hour}` : hour}ч  ${min < 10 ? `0${min}` : min}м`
    }
    return `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`
  }
  const TimeStart = (Dated) => {
    const date = new Date(Dated)
    const hours = date.getHours()
    const min = date.getMinutes()
    return Minute(hours, min)
  }
  const TimeEnd = (Dated, duration) => {
    const date = new Date(Dated)
    let hours = date.getHours() + Math.trunc(duration / 60)
    const min = (date.getMinutes() + duration) % 60
    if (hours > 24) hours -= 24

    return Minute(hours, min)
  }
  const TimeAll = (duration) => {
    const hours = Math.trunc(duration / 60)
    const min = duration % 60
    return Minute(hours, min, true)
  }
  return (
    <div className={styles.list__tick}>
      <div className={styles.list__tickHeader}>
        <div className={styles.list__price}> {`${priceStr} \u20bd`}</div>
        <div className="list__logo">
          <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="logoAvia" />
        </div>
      </div>

      <div className="list__track">
        {segments.map((item) => {
          return (
            <div className={styles.list__data} key={item.date}>
              <div className={styles.list__item}>
                <p className={styles.list__item_color}>
                  {item.origin}-{item.destination}
                </p>
                <p>
                  {TimeStart(item.date)} - {TimeEnd(item.date, item.duration)}
                </p>
              </div>
              <div className={styles.list__item}>
                <p className={styles.list__item_color}>В ПУТИ</p>
                <p>{TimeAll(item.duration)}</p>
              </div>
              <div className={styles.list__item}>
                <p className={styles.list__item_color}>
                  {item.stops.length} {transplants(item.stops.length)}
                </p>
                <p>{item.stops.join(', ')}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Ticket
