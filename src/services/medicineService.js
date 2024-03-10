import { Medicine } from "../models/index.js";

export const getAllMedicines = async (page, perPage, shopIds = [], sortByPrice, sortByDate) => {

    const options = {
        offset: perPage * (page - 1),
        limit: perPage,
        order: [],
    };

    if (shopIds.length > 0) {
        options.where = { shopId: shopIds };
    }

    if (sortByPrice && (sortByPrice.toUpperCase() === 'ASC' || sortByPrice.toUpperCase() === 'DESC')) {
        options.order.push(['price', sortByPrice.toUpperCase()]);
    }

    if (sortByDate && (sortByDate.toUpperCase() === 'ASC' || sortByDate.toUpperCase() === 'DESC')) {
        options.order.push(['createdAt', sortByDate.toUpperCase()]);
    }

    const { count, rows } = await Medicine.findAndCountAll(options);

    const totalMedicines = count;
    const totalPages = Math.ceil(totalMedicines / perPage);

    return {
        data: rows,
        pagination: {
            total: totalMedicines,
            totalPages: totalPages,
            currentPage: page,
            perPage: perPage
        }
    };
};

export const getMedicineById = async (id) => {
    const medicine = await Medicine.findByPk(id);

    return medicine;
};

export const AddMedicine = async (data) => {
    const { name, description, imageUrl, price, stock, shopId } = data;

    // Validate input data ?
    if (!name || !price || !stock || !shopId || !imageUrl) {
        throw new Error('Name, price, stock, and shopId are required fields');
    }

    const medicine = await Medicine.create({
        name,
        description,
        imageUrl,
        price,
        stock,
        shopId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    });
    console.log(medicine);
    return medicine;
};

export const deleteMedicineById = async (id) => {
    const medicine = await Medicine.findByPk(id);
    await medicine.destroy();
};

export const updateMedicineById = async (id, updatedData) => {
    const medicine = await Medicine.findByPk(id);

    updatedData.updatedAt = Date.now();

    await medicine.update(updatedData);
    return medicine;
}

