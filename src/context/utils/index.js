export function parseStores(stores) {
  return stores.map(store => {
    const { _id, store: storeName, CUIT, concepts, currentBalance, active, lastTransaction } = store

    const lastTransactionParsedDate = new Date(lastTransaction).toLocaleDateString([], {})

    const parsedCurrentBalance = currentBalance.toLocaleString(['es-AR'], {
      currency: 'ARS',
      style: 'currency',
      maximumFractionDigits: 0
    })

    return {
      _id,
      storeName,
      CUIT,
      concepts,
      currentBalance: parsedCurrentBalance,
      active,
      lastTransaction: lastTransactionParsedDate
    }
  })
}
