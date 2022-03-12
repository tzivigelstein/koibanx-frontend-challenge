import styles from './index.module.css'
import useApp from '../../hooks/useApp'
import Row from '../Row'
import ActivityIndicator from '../ActivityIndicator'
import { Arrow } from '../Icons'

export default function Table({ stores }) {
  const {
    loading,
    page,
    totalPages,
    resultsCount,
    totalDocuments,
    incrementPage,
    decrementPage,
    searchTerm,
    search,
    sortBy,
    sortColumnId,
    sortDirection
  } = useApp()

  function handleNextPage() {
    if (page !== totalPages) {
      incrementPage()
      if (searchTerm !== '') {
        search(page + 1)
      }
    }
  }

  function handlePreviousPage() {
    if (page !== 1) {
      decrementPage()
      if (searchTerm !== '') {
        search(page - 1)
      }
    }
  }

  function setCUITOrder(id) {
    if (loading) return
    sortBy(id)
  }

  function setStoreOrder(id) {
    if (loading) return
    sortBy(id)
  }

  return (
    <main>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th className={styles.columnHead}>ID</th>
            <th onClick={() => setStoreOrder('store')} className={styles.columnHead} aria-sort={true}>
              Comercio{' '}
              <span className={styles.columnHelper}>
                A-Z
                {sortColumnId !== '' && sortColumnId === 'store' && (
                  <Arrow dir={sortDirection === 1 ? 'down' : 'up'} width={16} />
                )}
              </span>
            </th>
            <th onClick={() => setCUITOrder('CUIT')} className={styles.columnHead} aria-sort={true}>
              CUIT{' '}
              <span className={styles.columnHelper}>
                A-Z{' '}
                {sortColumnId !== '' && sortColumnId === 'CUIT' && (
                  <Arrow dir={sortDirection === 1 ? 'down' : 'up'} width={16} />
                )}
              </span>
            </th>
            <th className={styles.columnHead}>Concepto 1</th>
            <th className={styles.columnHead}>Concepto 2</th>
            <th className={styles.columnHead}>Concepto 3</th>
            <th className={styles.columnHead}>Concepto 4</th>
            <th className={styles.columnHead}>Concepto 5</th>
            <th className={styles.columnHead}>Concepto 6</th>
            <th className={styles.columnHead}>Balance actual</th>
            <th className={styles.columnHead}>Activo</th>
            <th className={styles.columnHead}>Última venta</th>
          </tr>
          {stores.length !== 0 &&
            stores.map(store => {
              return <Row key={store._id} store={store} />
            })}
          {stores.length === 0 && !loading && (
            <tr>
              <td colSpan={8}>No hay resultados</td>
            </tr>
          )}
        </tbody>
      </table>
      <footer className={styles.footer}>
        <div className={styles.infoContainer}>
          <span>
            Página: {page}/{totalPages}
          </span>
          <p>
            Mostrando {resultsCount} de {totalDocuments} resultados.
          </p>
        </div>
        <div className={styles.buttonsContainer}>
          {loading && <ActivityIndicator width={20} colorstyle="dark" />}
          <button className={styles.button} disabled={page === 1 || loading} onClick={handlePreviousPage}>
            Anterior
          </button>
          <button disabled={page === totalPages || loading} className={styles.button} onClick={handleNextPage}>
            Siguiente
          </button>
        </div>
      </footer>
    </main>
  )
}
