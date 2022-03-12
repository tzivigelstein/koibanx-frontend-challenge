import useApp from '../../hooks/useApp'
import TextHighlight from '../TextHighlight'

export default function Row({ store }) {
  const { searchTerm, loading, highlight } = useApp()
  const { _id, storeName, CUIT, concepts, currentBalance, active, lastTransaction } = store

  return (
    <tr>
      <td>{highlight && !loading ? <TextHighlight text={_id} shouldBeHighlighted={searchTerm} /> : _id}</td>
      <td>{highlight && !loading ? <TextHighlight text={storeName} shouldBeHighlighted={searchTerm} /> : storeName}</td>
      <td>{highlight && !loading ? <TextHighlight text={CUIT} shouldBeHighlighted={searchTerm} /> : CUIT}</td>
      {concepts.map(concept => {
        return <td key={crypto.randomUUID()}>{concept}</td>
      })}
      <td>{currentBalance}</td>
      <td>{active ? 'Si' : 'No'}</td>
      <td>{lastTransaction}</td>
    </tr>
  )
}
