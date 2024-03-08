import { getAllOrders, getOrderById, addOrder, deleteOrderById, updateOrderById } from "../services/orderService.js";

export const getOrders = async (req, res) => {
    try {
        const orders = await getAllOrders();

        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: 'No orders found' });
        }

        return res.status(200).json(orders);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await getOrderById(id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error retrieving order:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const createOrder = async (req, res) => {
    try {
        const order = await addOrder(req.body);

        res.status(201).json({
            order,
        });
    } catch (error) {
        console.error('Error creating order:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        await deleteOrderById(id);

        res.status(204).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedOrder = await updateOrderById(id, updatedData);

        if (updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        return res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error.message);
        res.status(500).json({ error: error.message });
    }
};
