import Joi from "joi";
import { UserTypes } from "../userType/userTypes.constants";

const userSchema = Joi.object().keys({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  userTypeId: Joi.string().required(),
});

export default userSchema;
