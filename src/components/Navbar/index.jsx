import styles from './index.module.css'
import useApp from '../../hooks/useApp'
import { Trash } from '../Icons'

const STORE_STATUSES = {
  1: 'ACTIVE',
  0: 'INACTIVE',
  null: 'ALL'
}

export default function Navbar() {
  const { loading, storeStatus, setActiveFilter, searchTerm, setSearchTerm, highlight, prefersHighlight } = useApp()

  function handleActiveFilter(e) {
    setActiveFilter(e.target.value)
  }

  function handleInputChange(event) {
    event.preventDefault()
    const { value } = event.target

    setSearchTerm(value)
  }

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.searchBarContainer}>
          <input
            onChange={handleInputChange}
            value={searchTerm}
            className={styles.input}
            type="text"
            placeholder="Buscar..."
          />
          <select onChange={handleActiveFilter} value={STORE_STATUSES[storeStatus]} className={styles.select}>
            <option value="ALL">Todos</option>
            <option value="ACTIVE">Activo</option>
            <option value="INACTIVE">Inactivo</option>
          </select>
        </div>
        <button className={styles.searchButton}>Buscar</button>
      </nav>
      <div className={styles.controlsContainer}>
        {searchTerm !== '' && <p>Resultados para "{searchTerm}"</p>}
        {searchTerm !== '' && (
          <label>
            Mostrar ocurrencias{' '}
            <input
              onChange={e => prefersHighlight(e.target.checked)}
              type="checkbox"
              name=""
              id=""
              checked={highlight}
            />
          </label>
        )}
        <button disabled={loading} className={styles.removeFiltersButton}>
          Eliminar filtros <Trash stroke="#737373" width={16} />
        </button>
      </div>
    </>
  )
}
