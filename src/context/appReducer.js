import {
  SET_LOADING,
  GET_STORES_SUCCESSFUL,
  INCREMENT_PAGE,
  DECREMENT_PAGE,
  SET_ACTIVE_FILTER,
  SET_SEARCH_TERM,
  SET_HIGHLIGHT,
  RESET_PAGE_COUNT,
  UPDATE_HINT,
  UPDATE_SORT
} from './types'

export default function appReducer(state, { type, payload }) {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: payload
      }

    case INCREMENT_PAGE:
      return {
        ...state,
        page: state.page + payload
      }

    case DECREMENT_PAGE:
      return {
        ...state,
        page: state.page - payload
      }

    case GET_STORES_SUCCESSFUL:
      return {
        ...state,
        totalDocuments: payload.totals.total,
        resultsCount: payload.totals.count,
        totalPages: Math.ceil(payload.totals.total / payload.totals.max),
        stores: payload.data
      }

    case SET_ACTIVE_FILTER:
      if (payload === null) {
        delete state.query.active
        return {
          ...state,
          storeStatus: null
        }
      }
      return {
        ...state,
        storeStatus: payload,
        query: {
          ...state.query,
          active: payload
        }
      }

    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: payload,
        query: {
          ...state.query,
          $or: [
            { CUIT: { $regex: `/${payload}/` } },
            { store: { $regex: `/${payload}/` } },
            { _id: { $regex: `/${payload}/` } }
          ]
        }
      }

    case SET_HIGHLIGHT:
      return {
        ...state,
        highlight: !state.highlight
      }

    case RESET_PAGE_COUNT:
      return {
        ...state,
        page: payload
      }

    case UPDATE_HINT:
      return {
        ...state,
        hint: payload
      }

    case UPDATE_SORT:
      return {
        ...state,
        sortDirection: state.sortDirection === 1 ? -1 : 1,
        sortColumnId: payload
      }

    default:
      return {
        ...state
      }
  }
}
