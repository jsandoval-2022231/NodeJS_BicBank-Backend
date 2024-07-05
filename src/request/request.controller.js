import RequestModel from './request.model.js';
import createController from '../services/http.services.js';

const requestController = createController(RequestModel);

export const post = requestController.post;
export const get = requestController.getAll;
export const getOne = requestController.getOne;
export const remove = requestController.remove;

export default requestController;

