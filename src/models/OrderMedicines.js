import { DataTypes } from 'sequelize';
import sequelize from '../adapters/db.js';

const OrderMedicine = sequelize.define('OrderMedicine', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
}, {
    timestamps: false,
});

export default OrderMedicine;