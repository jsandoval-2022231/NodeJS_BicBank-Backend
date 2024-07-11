import User from "../user/user.model.js";
import Account from '../account/account.model.js';
import RequestModel from "../request/request.model.js";
import bcrypt from "bcryptjs";
import { generateRandomPassword } from "../helpers/generatePassword.js";
import { sendConfirmationSMS } from "./twilio.services.js";

export const processAcceptRequest = async (requestId) => {
    const request = await RequestModel.findById(requestId);

    const userExists = await User.findOne({ email: request.email });
    if (userExists) {
        throw new Error('Email already exists');
    }
    if (request.status === false) {
        throw new Error('The request has already been answered');
    }

    if (request.income < 100) {
        sendConfirmationSMS(`+502${request.phone}`, `Your request was rejected because the income is not enough. ${request.income}`);
        throw new Error('The income must be greater than 100 try again when you have a higher income POOR!!!!');
    }

    const accountNumber = Math.floor(100000000000 + Math.random() * 900000000000);
    const account = new Account({
        accountNumber,
        balance: request.income,
        typeAccount: request.typeAccount,
    });

    await account.save();

    const showPassword = await generateRandomPassword();
    const password = bcrypt.hashSync(showPassword, 10);

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
    await RequestModel.findByIdAndUpdate(requestId, { status: false });
    sendConfirmationSMS(`+502${request.phone}`, `Your request was accepted with the following user: ${request.email} and password: ${showPassword}`);

    return user;
};

export const processRejectRequest = async (requestId) => {
    const request = await RequestModel.findById(requestId); 
    if (request.status === false) {
        throw new Error('The request has already been answered');
    }
    await Request.findByIdAndDelete(requestId);
    sendConfirmationSMS(`+502${request.phone}`, `Your request was rejected`);
}

export const verifyIfEmailExists = async (email) => {
    const user = await User.findOne({ email });
    if (user) {
        throw new Error('Email already exists');
    }
}
