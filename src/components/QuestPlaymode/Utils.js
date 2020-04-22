// todo Unit tests
export const dataFullyReady = (object) => {
  const values = Object.values(object)
  const onlyFalseValues = values.filter((x) => x === false)
  return onlyFalseValues.length === 0
}

// todo Unit tests, make less ACM, optimize
export const groupBy = (collection, key) => {
  return collection.reduce(function (x, y) {
    (x[y[key]] = x[y[key]] || []).push(y)
    return x
  }, {})
}
