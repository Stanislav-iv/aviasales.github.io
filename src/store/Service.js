import { funGetId, funGetTicket, funLoadingTicket } from './ReducerFilter'

export const searchFetchId = () => async (dispatch) => {
  const res = await fetch('https://aviasales-test-api.kata.academy/search')

  if (!res.ok) {
    throw new Error('Not fetch')
  }
  const resId = await res.json()
  const data = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${resId.searchId}`)
  if (!data.ok) {
    throw new Error('Not fetch')
  }
  const resData = await data.json()
  dispatch(funLoadingTicket(false))
  dispatch(funGetId(resId))
  dispatch(funGetTicket(resData.tickets))
}
