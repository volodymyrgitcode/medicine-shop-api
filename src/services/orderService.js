import { Order } from "../models/index.js";
import { Medicine } from "../models/index.js";
import { OrderMedicine } from "../models/index.js";


export const getAllOrders = async () => {
    const orders = await Order.findAll({
        include: {
            model: OrderMedicine,
            as: 'OrderMedicines',
            include: { model: Medicine }
        }
    });

    const formattedOrders = orders.map(order => ({
        id: order.id,
        username: order.username,
        email: order.email,
        address: order.address,
        phoneNumber: order.phoneNumber,
        orderDate: order.createdAt,
        totalPrice: order.totalPrice,
        medicines: order.OrderMedicines.map(orderMedicine => ({
            id: orderMedicine.medicineId,
            quantity: orderMedicine.quantity,
            name: orderMedicine.Medicine.name,
            description: orderMedicine.Medicine.description,
            imageUrl: orderMedicine.Medicine.imageUrl,
            price: orderMedicine.Medicine.price,
            shopId: orderMedicine.Medicine.shopId,
        }))
    }));

    return formattedOrders;
};


export const getOrderById = async (id) => {

    const order = await Order.findByPk(id, { include: { model: OrderMedicine, as: 'OrderMedicines', include: { model: Medicine } } });

    const orderData = {
        id: order.id,
        username: order.username,
        email: order.email,
        address: order.address,
        phoneNumber: order.phoneNumber,
        orderDate: order.createdAt,
        totalPrice: order.totalPrice,
        medicines: order.OrderMedicines.map(orderMedicine => ({
            id: orderMedicine.medicineId,
            quantity: orderMedicine.quantity,
            name: orderMedicine.Medicine.name,
            description: orderMedicine.Medicine.description,
            imageUrl: orderMedicine.Medicine.imageUrl,
            price: orderMedicine.Medicine.price,
            shopId: orderMedicine.Medicine.shopId,
        }))
    };

    return orderData;
};

export const addOrder = async (data) => {
    const { username, email, address, phoneNumber, totalPrice, medicines } = data;

    if (!username || !email || !address || !phoneNumber || !totalPrice || !medicines || medicines.length === 0) {
        throw new Error('Email, address, phoneNumber, and at least one medicine are required');
    }

    if (totalPrice <= 0) {
        throw new Error('Total price must be greater than 0');
    }

    let totalPriceFromMedicines = 0;

    for (const { medicineId, quantity } of medicines) {
        const medicine = await Medicine.findByPk(medicineId);

        if (!medicine) {
            throw new Error(`Medicine with ID ${medicineId} not found`);
        }

        if (quantity > medicine.stock) {
            throw new Error(`Not enough stock for medicine ${medicine.name}`);
        }

        totalPriceFromMedicines += quantity * medicine.price;
    }

    if (totalPrice !== totalPriceFromMedicines) {
        throw new Error('Total price does not match the sum of prices of all medicines');
    }

    const order = await Order.create({
        username,
        email,
        address,
        phoneNumber,
        totalPrice,
    });

    for (const { medicineId, quantity } of medicines) {
        await OrderMedicine.create({
            orderId: order.id,
            medicineId,
            quantity,
        });

        const medicine = await Medicine.findByPk(medicineId);
        medicine.stock -= quantity;
        await medicine.save();
    }

    return order;
};

export const deleteOrderById = async (id) => {
    const order = await Order.findByPk(id);
    await order.destroy();
};

export const updateOrderById = async (id, updatedData) => {
    const order = await Order.findByPk(id);
    await order.update(updatedData);
    return order;
};
