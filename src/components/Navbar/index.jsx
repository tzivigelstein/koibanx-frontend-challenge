import styles from './index.module.css'
import useApp from '../../hooks/useApp'

const STORE_STATUSES = {
  1: 'ACTIVE',
  0: 'INACTIVE',
  null: 'ALL'
}

export default function Navbar() {
  const { storeStatus, setActiveFilter } = useApp()

  function handleActiveFilter(e) {
    setActiveFilter(e.target.value)
  }

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.searchBarContainer}>
          <input className={styles.input} type="text" placeholder="Buscar..." />
          <select onChange={handleActiveFilter} value={STORE_STATUSES[storeStatus]} className={styles.select}>
            <option value="ALL">Todos</option>
            <option value="ACTIVE">Activo</option>
            <option value="INACTIVE">Inactivo</option>
          </select>
        </div>
        <button className={styles.searchButton}>Buscar</button>
      </nav>
      <div className={styles.controlsContainer}>
        <button className={styles.removeFiltersButton}>Eliminar filtros</button>
      </div>
    </>
  )
}
