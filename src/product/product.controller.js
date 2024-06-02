import Product from "./product.model.js";
import createController from "../services/http.services.js";

const productController = createController(Product);

export const post = productController.post;
export const get = productController.getAll;
export const remove = productController.remove;
export const update = productController.update;
export const getOne = productController.getOne;


