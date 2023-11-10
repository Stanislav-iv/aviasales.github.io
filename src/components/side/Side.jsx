import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { funCheckALL, funCheckNo, funcheckOne, funcheckTwo, funcheckTre } from '../../store/ReducerFilter'

import styles from './Side.module.scss'
const Side = () => {
  const dispath = useDispatch()
  const check = useSelector((state) => state.filter)

  useEffect(() => {
    if (check.checkNo && check.checkOne && check.checkTwo && check.checkTre) {
      dispath(funCheckALL(true))
    } else if (check.checkNo || check.checkOne || check.checkTwo || check.checkTre) {
      dispath(funCheckALL(false))
    }
  }, [check.checkNo, check.checkOne, check.checkTwo, check.checkTre, dispath])

  const handlCheck = (event) => {
    dispath(funCheckALL(event.target.checked))
    dispath(funcheckOne(event.target.checked))
    dispath(funcheckTwo(event.target.checked))
    dispath(funCheckNo(event.target.checked))
    dispath(funcheckTre(event.target.checked))
  }

  return (
    <div className={styles.list__side}>
      <h3>Количество пересадок</h3>
      <form className={styles.list__form}>
        <label>
          <input
            name="All"
            type="checkbox"
            className={`inputed ${styles.list__check}`}
            checked={check.checkAll}
            onChange={(event) => handlCheck(event)}
          />
          <span className="list__checkSpan"></span>
          Все
        </label>
        <label>
          <input
            name="checkNo"
            type="checkbox"
            className={`inputed ${styles.list__check}`}
            checked={check.checkNo}
            onChange={(event) => {
              dispath(funCheckNo(event.target.checked))
            }}
          />
          <span className="list__checkSpan"></span>
          Без пересадок
        </label>
        <label>
          <input
            name="checkOne"
            type="checkbox"
            className={`inputed ${styles.list__check}`}
            checked={check.checkOne}
            onChange={(event) => {
              dispath(funcheckOne(event.target.checked))
            }}
          />
          <span className="list__checkSpan"></span>1 пересадка
        </label>
        <label>
          <input
            type="checkbox"
            className={`inputed ${styles.list__check}`}
            checked={check.checkTwo}
            onChange={(event) => {
              dispath(funcheckTwo(event.target.checked))
            }}
          />
          <span className="list__checkSpan"></span>2 пересадки
        </label>
        <label>
          <input
            type="checkbox"
            className={`inputed ${styles.list__check}`}
            checked={check.checkTre}
            onChange={(event) => {
              dispath(funcheckTre(event.target.checked))
            }}
          />
          <span className="list__checkSpan"></span>3 пересадки
        </label>
      </form>
    </div>
  )
}
export default Side
