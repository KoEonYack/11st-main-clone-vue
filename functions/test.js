exports.handler = async function () {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'Covenant',
      age: 33,
      email: 'covneant@gmail.com'
    })
  }
}
