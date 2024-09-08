export const validate = (req, res, schema) => {
  const data = schema.validate(req.body)
  if (data.error) {
    return res.status(400).send({ data: null, message: data.error })
  }
}
