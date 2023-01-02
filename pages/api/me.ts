import validateRoute from '../../lib/auth'

export default validateRoute((req, res, user) => {
  res.json({ message: 'everything is great', user })
})
