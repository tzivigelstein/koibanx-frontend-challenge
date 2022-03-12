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
  SET_HIGHLIGHT
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
    searchTerm: '',
    highlight: true
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

  return (
    <AppContext.Provider
      value={{
        page: state.page,
        results: state.results,
        query: state.query,
        loading: state.loading,
        stores: state.stores,
        totalDocuments: state.totalDocuments,
        resultsCount: state.resultsCount,
        totalPages: state.totalPages,
        searchTerm: state.searchTerm,
        highlight: state.highlight,
        incrementPage,
        decrementPage,
        getStores,
        setActiveFilter,
        setSearchTerm,
        prefersHighlight,
        search
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
