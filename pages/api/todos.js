export default (req, res) => {
  if (req.method === 'POST') {
    // Process your POST request
  } else {
    // Handle the rest of your HTTP methods
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify([
      {
        id: 1,
        task: 'Deploy app',
      },
      {
        id: 2,
        task: 'Clean House',
      },
      {
        id: 3,
        task: 'Wash Car',
      }
    ]))
  }
}
