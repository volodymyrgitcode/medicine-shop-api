import { sequelize } from '../models/index.js';

export async function connectDB() {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
}