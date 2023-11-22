import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { funCheckALL, funCheckNo, funcheckOne, funcheckTwo, funcheckTre } from '../../store/ReducerFilter'
import { checkboxNames } from '../utilites/CheckBoxName'
import Key from '../utilites/Key'

import styles from './Side.module.scss'
const Side = () => {
  const dispath = useDispatch()
  const check = useSelector((state) => state.filter)
  useEffect(() => {
    if (check.checkNo && check.checkOne && check.checkTwo && check.checkTre) {
      dispath(funCheckALL(true))
    } else if (!check.checkNo || !check.checkOne || !check.checkTwo || !check.checkTre) {
      dispath(funCheckALL(false))
    }
  }, [check.checkNo, check.checkOne, check.checkTwo, check.checkTre, dispath])

  const handlCheck = (event) => {
    dispath(funCheckALL(event))
    dispath(funcheckOne(event))
    dispath(funcheckTwo(event))
    dispath(funCheckNo(event))
    dispath(funcheckTre(event))
  }
  const handlCheckNo = (event) => {
    dispath(funCheckNo(event))
  }
  const handlCheckOne = (event) => {
    dispath(funcheckOne(event))
  }
  const handlCheckTwo = (event) => {
    dispath(funcheckTwo(event))
  }
  const handlCheckTre = (event) => {
    dispath(funcheckTre(event))
  }
  const arr = [check.checkAll, check.checkNo, check.checkOne, check.checkTwo, check.checkTre]
  const arr1 = [handlCheck, handlCheckNo, handlCheckOne, handlCheckTwo, handlCheckTre]
  const chekBox = checkboxNames.map((el, index) => {
    return (
      <label key={Key()}>
        <input
          type="checkbox"
          className={`inputed ${styles.list__check}`}
          checked={arr[index]}
          onChange={(event) => {
            arr1[index](event.target.checked)
          }}
        />
        <span className="list__checkSpan"></span>
        {el}
      </label>
    )
  })

  return (
    <div className={styles.list__side}>
      <h3>Количество пересадок</h3>
      <form className={styles.list__form}>{chekBox}</form>
    </div>
  )
}
export default Side
