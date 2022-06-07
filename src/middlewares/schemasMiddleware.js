import joi from 'joi'

export function signUpSchemaValidate(req, res, next) {
  const {body} = req
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(50).required(),
    confirmPassword: joi.ref('password')
  })

  const { error, value } = schema.validate(body, {abortEarly: false});

  if(error) {
    const errors = error.details.map(e => {return e.message})
    return res.status(422).send(errors)
  }

  next()
}

export function signInSchemaValidate(req, res, next) {
  const {body} = req
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(50).required()
  })

  const { error, value } = schema.validate(body, {abortEarly: false});

  if(error) {
    const errors = error.details.map(e => {return e.message})
    return res.status(422).send(errors)
  }

  next()
}

export function urlSchemaValidate(req, res, next) {
  const {body} = req
  const schema = joi.object({
    url: joi.string().uri().required()
  })

  const { error, value } = schema.validate(body, {abortEarly: false});

  if(error) {
    const errors = error.details.map(e => {return e.message})
    return res.status(422).send(errors)
  }

  next()
}
