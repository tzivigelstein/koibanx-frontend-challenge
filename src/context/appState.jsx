import { useReducer } from 'react'
import appReducer from './appReducer'
import AppContext from './appContext'
import { SET_LOADING, GET_STORES_SUCCESSFUL } from './types'

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
    query: {}
  }

  const [state, dispatch] = useReducer(appReducer, initialState)

  function getStores() {
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
        getStores
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
