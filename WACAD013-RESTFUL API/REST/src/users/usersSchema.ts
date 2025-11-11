import Joi from "joi";
import { UserTypes } from "../userType/userTypes.constants";

const VALID_USER_TYPE_IDS = Object.values(UserTypes);

const userSchema = Joi.object().keys({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  userTypeId: Joi.string()
    .valid(...VALID_USER_TYPE_IDS)
    .required(),
});

export default userSchema;
