import Medicine from "../models/medicine.js";

export const getAllMedicines = async (page = 1, perPage = 10, shopIds = [], sortByPrice, sortByDate) => {

    const pageNum = parseInt(page, 10) >= 0 ? parseInt(page, 10) : 1;
    const itemsPerPage = parseInt(perPage, 10) > 0 ? parseInt(perPage, 10) : 10;

    const offset = (pageNum - 1) * itemsPerPage;
    const limit = itemsPerPage;

    const options = {
        offset,
        limit,
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
    const totalPages = Math.ceil(totalMedicines / itemsPerPage);

    return {
        data: rows,
        pagination: {
            total: totalMedicines,
            totalPages: totalPages,
            currentPage: pageNum,
            perPage: itemsPerPage
        }
    };
};

export const getMedicineById = async (id) => {
    const medicine = await Medicine.findByPk(id);

    if (!medicine) {
        throw new Error('Medicine not found');
    }

    return medicine;
};

export const AddMedicine = async (data) => {
    const { name, description, imageUrl, price, stock, shopId } = data;

    // Validate input data
    if (!name || !price || !stock || !shopId || !imageUrl) {
        throw new Error('Name, price, stock, and shopId are required fields');
    }

    console.log(data);

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

    if (!medicine) {
        throw new Error('Medicine not found');
    }

    await medicine.destroy();
};

export const updateMedicineById = async (id, updatedData) => {
    const medicine = await Medicine.findByPk(id);

    if (!medicine) {
        throw new Error('Medicine not found');
    }

    updatedData.updatedAt = Date.now();

    await medicine.update(updatedData);
    return medicine;
}

