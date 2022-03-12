export default function Row({ store }) {
  const { _id, storeName, CUIT, concepts, currentBalance, active, lastTransaction } = store

  return (
    <tr>
      <td>{_id}</td>
      <td>{storeName}</td>
      <td>{CUIT}</td>
      {concepts.map(concept => {
        return <td key={crypto.randomUUID()}>{concept}</td>
      })}
      <td>{currentBalance}</td>
      <td>{active ? 'Si' : 'No'}</td>
      <td>{lastTransaction}</td>
    </tr>
  )
}
