import MedicineCreator from "./medicine.js";
import OrderCreator from "./order.js";
import OrderMedicineCreator from "./orderMedicines.js";
import ShopCreator from "./shop.js";
import Sequelize from "sequelize"

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
});

export const Medicine = MedicineCreator(sequelize)
export const Order = OrderCreator(sequelize)
export const OrderMedicine = OrderMedicineCreator(sequelize)
export const Shop = ShopCreator(sequelize)


Shop.hasMany(Medicine, { foreignKey: 'shopId' });
Medicine.belongsTo(Shop, { foreignKey: 'shopId' });
OrderMedicine.belongsTo(Medicine, { foreignKey: 'medicineId' });
Medicine.hasOne(OrderMedicine, { foreignKey: 'medicineId' });
OrderMedicine.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasMany(OrderMedicine, { foreignKey: 'orderId' });

