const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middlewares/authMiddleware');
const { InventoryItem } = require('../../database/models/InventoryItem');

// Get all inventory items
router.get('/', requireLogin, async (req, res) => {
  try {
    // Retrieve all inventory items from the database
    const inventoryItems = await InventoryItem.find();

    res.json(inventoryItems);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new inventory item
router.post('/', requireLogin, async (req, res) => {
  const { name, quantity } = req.body;

  try {
    // Create a new inventory item
    const inventoryItem = new InventoryItem({ name, quantity });
    await inventoryItem.save();

    res.status(201).json({ message: 'Inventory item created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update an inventory item
router.put('/:id', requireLogin, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    // Find the inventory item in the database by ID
    const inventoryItem = await InventoryItem.findById(id);

    if (!inventoryItem) {
      res.status(404).json({ message: 'Inventory item not found' });
      return;
    }

    // Update the inventory item
    inventoryItem.name = name;
    inventoryItem.quantity = quantity;
    await inventoryItem.save();

    res.json({ message: 'Inventory item updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete an inventory item
router.delete('/:id', requireLogin, async (req, res) => {
  const { id } = req.params;

  try {
    // Find the inventory item in the database by ID and delete it
    const result = await InventoryItem.findByIdAndDelete(id);

    if (!result) {
      res.status(404).json({ message: 'Inventory item not found' });
      return;
    }

    res.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
