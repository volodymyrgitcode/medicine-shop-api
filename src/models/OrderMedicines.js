import { DataTypes } from 'sequelize';

const OrderMedicine = function (sequelize) {
    return sequelize.define('OrderMedicine', {
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
}

export default OrderMedicine;