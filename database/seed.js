/* eslint no-: 0 */
const database = require('./db');

module.exports = function seed() {
  let item = { itemUUID: '12345',
    item: { itemType: 'drink',
    name: 'beer',
    idealQty: 12,
    quantity: 9,
    forget: false } };

  database.fridgeItems.push(item);

  item = { itemUUID: '121212',
    item: { itemType: 'cheese',
    name: 'american',
    idealQty: 24,
    quantity: 5,
    forget: false } };

  database.fridgeItems.push(item);

  item = { itemUUID: '232323',
    item: { itemType: 'condiment',
    name: 'ketchup',
    idealQty: 1,
    quantity: 0.5,
    forget: false } };

  database.fridgeItems.push(item);

  item = { itemUUID: '454545',
    item: { itemType: 'meat',
    name: 'hotdogs',
    idealQty: 24,
    quantity: 5,
    forget: true } };

  database.fridgeItems.push(item);
};
