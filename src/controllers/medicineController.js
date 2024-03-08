import { getAllMedicines, getMedicineById, AddMedicine, deleteMedicineById, updateMedicineById } from "../services/medicineService.js";

export const getMedicines = async (req, res) => {
    try {

        const { page, perPage, shopIds, sortByPrice, sortByDate } = req.query;

        const shopIdArray = shopIds ? shopIds.split(',').map(id => parseInt(id)) : [];

        const medicines = await getAllMedicines(page, perPage, shopIdArray, sortByPrice, sortByDate);

        if (!medicines || medicines.length === 0) {
            return res.status(404).json({ error: 'No medicines found' });
        }

        return res.status(200).json(medicines);

    } catch (error) {
        console.error('Error retrieving medicines:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getMedicine = async (req, res) => {
    try {
        const { id } = req.params;

        const medicine = await getMedicineById(id);

        res.status(200).json(medicine);

    } catch (error) {
        console.error('Error retrieving medicine:', error.message);
        if (error.message === 'Medicine not found') {
            return res.status(404).json({ error: 'Medicine not found' });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
};

export const createMedicine = async (req, res) => {
    try {
        const medicine = await AddMedicine(req.body);

        res.status(201).json({
            message: "Record created successfully!",
            medicine,
        });

    } catch (error) {
        console.error('Error creating medicine:', error.message);
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteMedicine = async (req, res) => {
    try {
        const { id } = req.params;

        await deleteMedicineById(id);

        res.status(204).json({ message: 'Medicine deleted successfully' });

    } catch (error) {
        console.error('Error deleting medicine:', error.message);
        if (error.message === 'Medicine not found') {
            return res.status(404).json({ error: 'Medicine not found' });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
};

export const updateMedicne = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedMedicine = await updateMedicineById(id, updatedData);

        return res.status(200).json(updatedMedicine);

    } catch (error) {
        console.error('Error deleting medicine:', error.message);
        if (error.message === 'Medicine not found') {
            return res.status(404).json({ error: 'Medicine not found' });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
};