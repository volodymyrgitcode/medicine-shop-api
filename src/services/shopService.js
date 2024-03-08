import { Shop } from "../models/index.js";

export const getAllShops = async () => {
    const shops = await Shop.findAll();
    return shops;
};

export const getShopById = async (id) => {
    const shop = await Shop.findByPk(id);
    return shop;
};

export const addShop = async (data) => {
    const { name, address } = data;

    // Validate input data
    if (!name) {
        throw new Error('Name is a required field');
    }

    const shop = await Shop.create({
        name,
        address,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    });

    return shop;
};

export const deleteShopById = async (id) => {
    const shop = await Shop.findByPk(id);
    await shop.destroy();
};

export const updateShopById = async (id, updatedData) => {
    const shop = await Shop.findByPk(id);

    updatedData.updatedAt = Date.now();

    await shop.update(updatedData);
    return shop;
};
