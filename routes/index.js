/* eslint no-console: 0 */
// Event Handlers - These are methods invoked by the SmartFridge hardware
// to send notification of items that have been added and/or removed from
// the fridge. Every time an item is removed by the fridge user, it will
// emit a handleItemRemoved() event to this class, every time a new item is
// added or a previously removed item is re-inserted, the fridge will emit
// a handleItemAdded() event with its updated fillFactor.

const express = require('express');

const database = require('../database/db');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to SmartFridge!');
});

// Returns a list of items based on their fill factor. This method is used by
// the fridge to display items that are running low and need to be replenished.
router.get('/getItems/:fillFactor', (req, res) => {
  const data = database.getItems(req.params.fillFactor);
  res.send(data);
});

// Returns the fill factor for a given item type to be displayed to the owner.
// Unless all available containers are empty, this method should only consider
// the non-empty containers when calculating the overall fillFactor for a given
// item.
router.get('/getFillFactor/:itemType', (req, res) => {
  const data = database.getFillFactor(req.params.itemType);
  res.send(`${data}`);
});

//This method is called every time an item is stored in the fridge
router.post('/handleItemAdded', (req, res) => {
  const itemObj = {
    itemUUID: req.body.itemUUID,
    name: req.body.name,
    idealQty: req.body.idealQty,
    quantity: req.body.quantity,
    forget: req.body.forget
  };
  const status = database.handleItemAdded(itemObj);
  res.send(status);
});

// This method is called every time an item is removed from the fridge
router.put('/handleItemRemoved', (req, res) => {
  const status = database.handleItemRemoved(req.body);
  res.send(status);
});

// Stop tracking a given item. This method is used by the fridge to signal
// that its owner will no longer stock this item and thus should not be
// returned from #getItems()
router.put('/forgetItem', (req, res) => {
  const status = database.forgetItem(req.body);
  res.send(status);
});

module.exports = router;
