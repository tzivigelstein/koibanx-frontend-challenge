import { useReducer } from 'react'

import appReducer from './appReducer'
import AppContext from './appContext'

import {
  SET_LOADING,
  GET_STORES_SUCCESSFUL,
  DECREMENT_PAGE,
  INCREMENT_PAGE,
  SET_ACTIVE_FILTER,
  SET_SEARCH_TERM,
  SET_HIGHLIGHT,
  RESET_PAGE_COUNT,
  UPDATE_SORT,
  UPDATE_HINT,
  RESET_FILTERS
} from './types'
import { parseStores } from './utils/'

const BASE_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY
const HEADERS = {
  'cache-control': 'no-cache',
  'x-apikey': API_KEY
}

export default function AppState({ children }) {
  const initialState = {
    page: 1,
    results: 10,
    loading: false,
    resultsCount: 0,
    totalDocuments: 0,
    totalPages: 0,
    stores: [],
    query: {},
    hint: {},
    searchTerm: '',
    highlight: true,
    sortDirection: -1,
    sortColumnId: ''
  }

  const [state, dispatch] = useReducer(appReducer, initialState)

  function incrementPage() {
    const DEFAULT_INCREMENT = 1
    dispatch({ type: INCREMENT_PAGE, payload: DEFAULT_INCREMENT })
  }

  function decrementPage() {
    const DEFAULT_DECREMENT = 1
    dispatch({ type: DECREMENT_PAGE, payload: DEFAULT_DECREMENT })
  }

  function getStores() {
    if (state.searchTerm !== '') return

    const { page, results, query } = state

    const jsonQuery = JSON.stringify(query)

    const url = `${BASE_URL}q=${jsonQuery}&h={"$max": ${results}, "$skip":${(page - 1) * results}}&totals=true`

    console.log('GETTING STORES')
    console.log(url)

    dispatch({
      type: SET_LOADING,
      payload: true
    })

    fetch(url, { headers: HEADERS })
      .then(res => res.json())
      .then(({ data, totals }) => {
        dispatch({
          type: GET_STORES_SUCCESSFUL,
          payload: { data: parseStores(data), totals }
        })
      })
      .catch(console.error)
      .finally(() => {
        dispatch({
          type: SET_LOADING,
          payload: false
        })
      })
  }

  function setActiveFilter(filter) {
    const FILTER_VALUES = {
      ACTIVE: 1,
      INACTIVE: 0,
      ALL: null
    }

    dispatch({ type: SET_ACTIVE_FILTER, payload: FILTER_VALUES[filter] })
  }

  function setSearchTerm(searchTerm) {
    dispatch({
      type: SET_SEARCH_TERM,
      payload: searchTerm.trim()
    })
  }

  function prefersHighlight() {
    dispatch({
      type: SET_HIGHLIGHT
    })
  }

  function search(page) {
    console.log('EXECUTING SEARCH')

    dispatch({
      type: SET_LOADING,
      payload: true
    })

    const { results, query, hint } = state

    const newHint = {
      ...hint,
      $max: results,
      $skip: (page - 1) * results
    }

    const jsonQuery = JSON.stringify(query)
    const jsonHint = JSON.stringify(newHint)

    const url = `${BASE_URL}q=${jsonQuery}&h=${jsonHint}&totals=true`

    console.log(url)

    fetch(url, { headers: HEADERS })
      .then(res => res.json())
      .then(({ data, totals }) => {
        dispatch({
          type: GET_STORES_SUCCESSFUL,
          payload: { data: parseStores(data), totals }
        })
      })
      .catch(console.error)
      .finally(() => {
        dispatch({
          type: SET_LOADING,
          payload: false
        })
      })
  }

  function resetPageCount() {
    const DEFAULT_PAGE_COUNT = 1
    dispatch({ type: RESET_PAGE_COUNT, payload: DEFAULT_PAGE_COUNT })
  }

  function sortBy(id) {
    console.log('EXECUTING SORT', id)

    dispatch({
      type: SET_LOADING,
      payload: true
    })

    const { page, results, query, hint } = state

    const newHint = {
      ...hint,
      $max: results,
      $skip: (page - 1) * results,
      $orderby: { [id]: state.sortDirection === 1 ? -1 : 1 }
    }

    const jsonQuery = JSON.stringify(query)
    const jsonHint = JSON.stringify(newHint)

    dispatch({
      type: UPDATE_HINT,
      payload: newHint
    })

    dispatch({
      type: UPDATE_SORT,
      payload: id
    })

    const url = `${BASE_URL}q=${jsonQuery}&h=${jsonHint}&totals=true`

    console.log(url)

    fetch(url, { headers: HEADERS })
      .then(res => res.json())
      .then(({ data, totals }) => {
        dispatch({
          type: GET_STORES_SUCCESSFUL,
          payload: { data: parseStores(data), totals }
        })
      })
      .catch(console.error)
      .finally(() => {
        dispatch({
          type: SET_LOADING,
          payload: false
        })
      })
  }

  function resetFilters() {
    dispatch({
      type: RESET_FILTERS
    })
  }

  return (
    <AppContext.Provider
      value={{
        page: state.page,
        results: state.results,
        query: state.query,
        hint: state.hint,
        loading: state.loading,
        stores: state.stores,
        totalDocuments: state.totalDocuments,
        resultsCount: state.resultsCount,
        totalPages: state.totalPages,
        searchTerm: state.searchTerm,
        highlight: state.highlight,
        sortDirection: state.sortDirection,
        sortColumnId: state.sortColumnId,
        incrementPage,
        decrementPage,
        getStores,
        setActiveFilter,
        setSearchTerm,
        prefersHighlight,
        search,
        resetPageCount,
        sortBy,
        resetFilters
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
