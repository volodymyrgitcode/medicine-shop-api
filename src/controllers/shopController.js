import { getAllShops, getShopById, addShop, deleteShopById, updateShopById } from "../services/shopService.js";

export const getShops = async (req, res) => {
    try {
        const shops = await getAllShops();

        if (!shops || shops.length === 0) {
            return res.status(404).json({ error: 'No shops found' });
        }

        return res.status(200).json(shops);

    } catch (error) {
        console.error('Error retrieving shops:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getShop = async (req, res) => {
    try {
        const { id } = req.params;
        const shop = await getShopById(id);

        if (!shop) {
            return res.status(404).json({ error: 'Shop not found' });
        }

        res.status(200).json(shop);
    } catch (error) {
        console.error('Error retrieving shop:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const createShop = async (req, res) => {
    try {
        const shop = await addShop(req.body);

        res.status(201).json(shop);
    } catch (error) {
        console.error('Error creating shop:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const deleteShop = async (req, res) => {
    try {
        const { id } = req.params;

        await deleteShopById(id);

        res.status(204).json({ message: 'Shop deleted successfully' });
    } catch (error) {
        console.error('Error deleting shop:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const updateShop = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedShop = await updateShopById(id, updatedData);

        if (!updatedShop) {
            return res.status(404).json({ error: 'Shop not found' });
        }

        return res.status(200).json(updatedShop);
    } catch (error) {
        console.error('Error updating shop:', error.message);
        res.status(500).json({ error: error.message });
    }
};
