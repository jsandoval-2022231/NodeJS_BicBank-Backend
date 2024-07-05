import User from "./user.model.js";
import Account from '../account/account.model.js'
import RequestModel from "../request/request.model.js";
import bcrypt from "bcryptjs";
import { generateRandomPassword } from "../helpers/generatePassword.js";
import { sendConfirmationSMS } from "../helpers/confirmation.js";
import createController from "../services/http.services.js";

const userController = createController(User);

export const acceptRequest = async (req, res) => {
    try {
      const request = await RequestModel.findById(req.body.id);
      if(request.status === false ){
        return res.status(400).json({ error: 'The request has already been answered' });
      }
      console.log('requestId: ', request);
  
      if(request.income < 100){
        sendConfirmationSMS(`+502${request.phone}`, `Your request was rejected because the income is not enough. ${request.income}`);
        return res.status(400).json({ error: 'The income must be greater than 100' });
      }
  
      const accountNumber = Math.floor(100000000000 + Math.random() * 900000000000);
      const account = new Account({
        accountNumber,
        typeAccount: request.typeAccount,
      });
  
      await account.save();
  
      const showPassoword = await generateRandomPassword();
      const password = bcrypt.hashSync(showPassoword, 10);
  
      const user = new User({
        name: request.name,
        nickname: request.nickname,
        DPI: request.DPI,
        email: request.email,
        password,
        direction: request.direction,
        phone: request.phone,
        workName: request.workName,
        workDirection: request.workDirection,
        account: account._id
      });

      await user.save();
      await RequestModel.findByIdAndUpdate(req.body.id, { status: false });
      sendConfirmationSMS(`+502${request.phone}`, `Your request was accepted with the following user: ${request.email} and password: ${showPassoword}`);
      return res.status(200).json({ user });
    }
    catch (error) {
      return res.status(500).json({ error: error.message });
    }
}

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