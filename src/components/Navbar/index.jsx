import styles from './index.module.css'

export default function Navbar() {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.searchBarContainer}>
          <input className={styles.input} type="text" placeholder="Buscar..." />
          <select value="" className={styles.select}>
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
