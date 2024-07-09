'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import UserRoutes from '../src/user/user.routes.js';
import ProductRoutes from '../src/product/product.routes.js';
import AuthRoutes from '../src/auth/auth.routes.js';
import RequestRoutes from '../src/request/request.routes.js';
import TransactionRoutes from '../src/transaction/transaction.routes.js';
import User from '../src/user/user.model.js';
import AccountRoutes from '../src/account/account.routes.js';
import bcrypt from 'bcryptjs';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/BicBank/v1/user'
        this.productPath = '/BicBank/v1/product'
        this.authPath = '/BicBank/v1/auth'
        this.requestPath = '/BicBank/v1/request'
        this.transactionPath = '/BicBank/v1/transaction'
        this.accountPath = '/BicBank/v1/account'

        this.middlewares();
        this.conectarDB();
        this.createDefaultAdmin();
        this.routes();
    }

    async createDefaultAdmin() {
        const adminEmail = 'admin@gmail.com';
        const admin = await User.findOne({ email: adminEmail });

        if (!admin) {
            const hashedPassword = await bcrypt.hash('ADMINB', 10);
            const defaultAdmin = new User({
                name: 'ADMINB',
                DPI: '123456789',
                email: adminEmail,
                password: hashedPassword,
                direction: 'Admin Direction',
                phone: '1234567890',
                role: 'ADMIN_ROLE'
            });
            await defaultAdmin.save();
            console.log('Default admin user created');
        } else {
            console.log('Admin user already exists');
        }
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
        this.app.use(this.userPath, UserRoutes);
        this.app.use(this.productPath, ProductRoutes);
        this.app.use(this.authPath, AuthRoutes);
        this.app.use(this.requestPath, RequestRoutes);
        this.app.use(this.transactionPath, TransactionRoutes);
        this.app.use(this.accountPath, AccountRoutes);
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port', this.port);
        });
    }
}

export default Server;