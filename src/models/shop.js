import { DataTypes } from 'sequelize';

const Shop = function (sequelize) {
    return sequelize.define('Shop', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
        }
    });
}

export default Shop;