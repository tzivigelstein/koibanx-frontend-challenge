import styles from './index.module.css'

export default function Row({ store }) {
  const { _id, storeName, CUIT, concepts, currentBalance, active, lastTransaction } = store

  return (
    <tr className={styles.row}>
      <td title={_id} className={styles.idColumn}>
        {_id}
      </td>
      <td>{storeName}</td>
      <td>{CUIT}</td>
      {concepts.map(concept => {
        return <td key={concept}>{concept}</td>
      })}
      <td>{currentBalance}</td>
      <td>{active ? 'Si' : 'No'}</td>
      <td>{lastTransaction}</td>
    </tr>
  )
}
