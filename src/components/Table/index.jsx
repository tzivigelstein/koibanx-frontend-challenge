import styles from './index.module.css'

export default function Table({ stores }) {
  return (
    <main>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th className={styles.columnHead}>ID</th>
            <th className={styles.columnHead} aria-sort={true}>
              Comercio <span className={styles.columnHelper}>A-Z</span>
            </th>
            <th className={styles.columnHead} aria-sort={true}>
              CUIT <span className={styles.columnHelper}>A-Z</span>
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
        </tbody>
      </table>
      <footer className={styles.footer}>
        <div className={styles.infoContainer}>
          <span>Página: 0/0</span>
          <p>Mostrando 0 de 0 resultados.</p>
        </div>
        <div className={styles.buttonsContainer}>
          <button className={styles.button}>Anterior</button>
          <button className={styles.button}>Siguiente</button>
        </div>
      </footer>
    </main>
  )
}