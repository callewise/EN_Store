const InventoryItem = require('../../database/models/InventoryItem');

// Controller action to get all inventory items
async function getAllInventoryItems(req, res) {
  try {
    const inventoryItems = await InventoryItem.find();
    res.json(inventoryItems);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Controller action to create a new inventory item
async function createInventoryItem(req, res) {
  const { name, quantity } = req.body;

  try {
    const newInventoryItem = new InventoryItem({
      name: name,
      quantity: quantity
    });

    await newInventoryItem.save();

    res.status(201).json({ message: 'Inventory item created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Controller action to update an inventory item
async function updateInventoryItem(req, res) {
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    const inventoryItem = await InventoryItem.findByIdAndUpdate(
      id,
      {
        name: name,
        quantity: quantity
      },
      { new: true }
    );

    if (!inventoryItem) {
      res.status(404).json({ message: 'Inventory item not found' });
      return;
    }

    res.json(inventoryItem);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Controller action to delete an inventory item
async function deleteInventoryItem(req, res) {
  const { id } = req.params;

  try {
    const deletedInventoryItem = await InventoryItem.findByIdAndDelete(id);

    if (!deletedInventoryItem) {
      res.status(404).json({ message: 'Inventory item not found' });
      return;
    }

    res.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getAllInventoryItems,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem
};
