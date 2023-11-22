import { funGetTicket, funLoadingTicket, funLoadingShow } from './ReducerFilter'

export const searchFetchId = () => async () => {
  const res = await fetch('https://aviasales-test-api.kata.academy/search')

  if (!res.ok) {
    throw new Error('Not fetch')
  }
  return res
}

export const searchTicket = (tick) => async (dispatch) => {
  const data = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${tick}`)

  if (data.status >= 500 && data.status < 600) {
    dispatch(searchTicket(tick))
  } else if (!data.ok) {
    throw new Error('Not fetch')
  }

  if (data.ok) {
    const resData = await data.json()
    if (!resData.stop) {
      dispatch(searchTicket(tick))
    }
    if (resData.stop) {
      dispatch(funLoadingTicket(false))
    }
    dispatch(funLoadingShow(false))
    return dispatch(funGetTicket(resData.tickets))
  }
}
