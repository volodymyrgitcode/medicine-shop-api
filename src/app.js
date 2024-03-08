import 'dotenv/config'
import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import db from './adapters/db.js';
import Medicine from './models/medicine.js';
import Shop from './models/shop.js';
import Order from './models/order.js';

import OrderMedicine from './models/OrderMedicines.js';

const app = express();

await db.authenticate();
console.log("Connection has been established successfully.");
//
Shop.hasMany(Medicine, { foreignKey: 'shopId' });
Medicine.belongsTo(Shop, { foreignKey: 'shopId' });

OrderMedicine.belongsTo(Medicine, { foreignKey: 'medicineId' });
Medicine.hasOne(OrderMedicine, { foreignKey: 'medicineId' });
OrderMedicine.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasMany(OrderMedicine, { foreignKey: 'orderId' });
//
await db.sync();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(process.env.PORT, () => {
    console.log(`server is running on port:  ${process.env.PORT}`);
});
