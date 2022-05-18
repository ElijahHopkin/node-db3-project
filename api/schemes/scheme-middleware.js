const db = require ('../../data/db-config')
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
// const checkSchemeId = (req, res, next) => {
//   db('schemes').where({id: req.params.id}).first()
//     .then(result => {
//       if(result!= null) {
//         next();
//       }else{
//         next({message: `scheme with scheme_id ${req.params.id} not found`, status: 404})
//       }
//     })

// }

const checkSchemeId = async (req, res, next) => {
  const scheme = await db('schemes').where('scheme_id', req.params.scheme_id).first()
//await findById(req.params.scheme_id)
  if(scheme) {
    next();
  }else{
    next({message: `scheme with scheme_id ${req.params.scheme_id} not found`, status: 404})
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const {scheme_name} = req.body
  if(scheme_name === '' || typeof scheme_name !== 'string'){
    next({ message: `invalid scheme_name`, status:400})
}else{
  next();
}
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const {instructions} = req.body
  if((!instructions || instructions.trim() == '' || typeof instructions != 'string' )|| (parseInt(req.body.step_number) != 'number' || parseInt(req.body.step_number) < 1 )){
    next({ message: 'invalid step', status:400})
  }else{
    next();
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
