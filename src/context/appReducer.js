import { SET_LOADING, GET_STORES_SUCCESSFUL } from './types'

export default function appReducer(state, { type, payload }) {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: payload
      }

    case GET_STORES_SUCCESSFUL:
      return {
        ...state,
        totalDocuments: payload.totals.total,
        resultsCount: payload.totals.count,
        totalPages: Math.ceil(payload.totals.total / payload.totals.max),
        stores: payload.data
      }

    default:
      return {
        ...state
      }
  }
}
