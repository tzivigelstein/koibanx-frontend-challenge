import { useEffect } from 'react'

import useApp from './hooks/useApp'

import Navbar from './components/Navbar'
import Table from './components/Table'

function App() {
  const { page, getStores, stores } = useApp()

  useEffect(() => {
    getStores()
  }, [page])

  return (
    <div className="App">
      <Navbar />
      <Table stores={stores} />
    </div>
  )
}

export default App
