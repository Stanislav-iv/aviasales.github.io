const defStore = {
  checkAll: true,
  checkNo: true,
  checkOne: true,
  checkTwo: true,
  checkTre: true,
  tickCheap: false,
  tickFaster: false,
  tickOptima: false,
  loading: true,
  loadingShow: true,
  isError: false,
  tickets: [],
  ShowTicket: 5,
}
const checkALL = 'checkALL'
const checkNo = 'checkNo'
const checkOne = 'checkOne'
const checkTwo = 'checkTwo'
const checkTre = 'checkTre'
const tickCheap = 'tickCheap'
const tickFaster = 'tickFaster'
const tickOptima = 'tickOptima'

export const reducerFilter = (state = defStore, action) => {
  switch (action.type) {
    case 'Loading':
      return {
        ...state,
        loading: action.payload,
      }
    case 'loadingShow':
      return {
        ...state,
        loadingShow: action.payload,
      }
    case 'Error':
      return {
        ...state,
        isError: action.payload,
      }
    case 'DataTicket':
      return {
        ...state,
        tickets: [...state.tickets, ...action.payload],
      }
    case 'DataTicketSort':
      return {
        ...state,
        tickets: action.payload,
      }
    case 'Show':
      return {
        ...state,
        ShowTicket: action.payload,
      }
    case checkALL:
      return {
        ...state,
        checkAll: action.payload,
      }
    case checkNo:
      return { ...state, checkNo: action.payload }
    case checkOne:
      return { ...state, checkOne: action.payload }
    case checkTwo:
      return { ...state, checkTwo: action.payload }
    case checkTre:
      return { ...state, checkTre: action.payload }
    case tickCheap:
      return { ...state, tickCheap: action.payload }
    case tickFaster:
      return { ...state, tickFaster: action.payload }
    case tickOptima:
      return { ...state, tickOptima: action.payload }
    default:
      return state
  }
}
export const funCheckALL = (payload) => ({ type: checkALL, payload })
export const funCheckNo = (payload) => ({ type: checkNo, payload })
export const funcheckOne = (payload) => ({ type: checkOne, payload })
export const funcheckTwo = (payload) => ({ type: checkTwo, payload })
export const funcheckTre = (payload) => ({ type: checkTre, payload })
export const funTickCheap = (payload) => ({ type: tickCheap, payload })
export const funTickFaster = (payload) => ({ type: tickFaster, payload })
export const funTickOptima = (payload) => ({ type: tickOptima, payload })
export const funGetTicket = (payload) => ({ type: 'DataTicket', payload })
export const funDataTicketSort = (payload) => ({ type: 'DataTicketSort', payload })
export const funShowTicket = (payload) => ({ type: 'Show', payload })
export const funErrorTicket = (payload) => ({ type: 'Error', payload })
export const funLoadingTicket = (payload) => ({ type: 'Loading', payload })
export const funLoadingShow = (payload) => ({ type: 'loadingShow', payload })
