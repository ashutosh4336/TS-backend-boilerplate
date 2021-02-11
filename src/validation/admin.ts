import Joi from 'joi';
const PhoneJoi = Joi.extend(require('joi-phone-number'));

const createUser = Joi.object().keys({
  email: Joi.string()
    .lowercase()
    .max(50)
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net', 'in', 'co', 'uk', 'biz', 'xyz', 'io'],
      },
    })
    .required()
    .error(new Error('Invalid Email')),
  contactNumber: PhoneJoi.string()
    .phoneNumber()
    .min(10)
    .max(20)
    .required()
    .error(new Error('Invalid Number')),
  firstName: Joi.string().uppercase().max(200).required().messages({
    'string.base': 'First name should be string',
    'string.empty': 'First name required',
    'string.max': 'First name should be less than 50 letter',
    'any.required': 'First name is required',
  }),
  lastName: Joi.string().uppercase().max(200).required().messages({
    'string.base': 'Last name should be string',
    'string.empty': 'Last name required',
    'string.max': 'Last name should be less than 50 letter',
    'any.required': 'Last name is required',
  }),
  password: Joi.string().required(),
  githubUrl: Joi.string().allow(null, ''),
  role: Joi.string().required(),
});

export { createUser };
