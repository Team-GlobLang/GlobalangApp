import * as Joi from "joi";

const envSchema = Joi.object({
  VITE_API_URL: Joi.string().uri().required(),
  VITE_PAY_URL: Joi.string().uri().required()
}).unknown(true); 

const { error, value } = envSchema.validate(import.meta.env, {
  allowUnknown: true,
  abortEarly: false,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs = {
  APIURL: value.VITE_API_URL,
  PaymentUrl: value.VITE_PAY_URL
};
