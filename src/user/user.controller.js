import User from "./user.model.js";
import Account from '../account/account.model.js'
import RequestModel from "../request/request.model.js";
import bcrypt from "bcryptjs";
import { generateRandomPassword } from "../helpers/generatePassword.js";
import { sendConfirmationSMS } from "../services/twilio.services.js";
import { processAcceptRequest  } from "../services/user.service.js"
import createController from "../services/http.services.js";

export const custumLogic = async (req, res) => {
  const { id } = req.body;
  const request = await processAcceptRequest(id);
  return { message: 'Request accepted successfully', request };
} 


const userController = createController(User, custumLogic);

export const post = userController.post;
export const get = userController.get;
export const put = userController.put;


export const getOwnUser = async (req, res) => {
    try {
      const user = await User.findById(req.user);
      console.log("iduser: ", user);
      return res.status(200).json({ user });
    }
    catch (error) {
      return res.status(500).json({ error: error.message });
    }
}

export const updateOwnUser = async (req, res) => {
    try {
      const id = req.user;
      const { _id, password, email, DPI, role, ...rest } = req.body;

      if (password) {
        const salt = bcrypt.genSaltSync(10);
        rest.password = bcrypt.hashSync(password, salt);
      }
      
      await User.findByIdAndUpdate(id, rest);
      return res.status(200).json({ User: 'User updated successfully'});
    }
    catch (error) {
      return res.status(500).json({ error: error.message });
    }
}

export const remove = userController.remove;