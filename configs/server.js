'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
//import UserRoutes from '../src/user/user.routes.js';
import ProductRoutes from '../src/product/product.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/BicBank/v1/user'
        this.productPath = '/BicBank/v1/product'

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes() {
        //this.app.use(this.userPath, UserRoutes);
        this.app.use(this.productPath, ProductRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port', this.port);
        });
    }
}

export default Server;