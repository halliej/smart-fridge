/* eslint no-console: 0 */
/* eslint no-else-return: 0 */
/* eslint no-param-reassign: 0 */
module.exports = {
  fridgeItems: [],
  // Returns a list of items based on their fill factor. This method is used by
  // the fridge to display items that are running low and need to be replenished.
  getItems(fillFactor) {
    //console.log(this.fridgeItems);
    const items = this.fridgeItems.filter((el) => {
      return el.item.quantity / el.item.idealQty <= fillFactor && !el.item.forget;
    });
    return items;
  },
  // Returns the fill factor for a given item type to be displayed to the owner.
  // Unless all available containers are empty, this method should only consider
  // the non-empty containers when calculating the overall fillFactor for a given
  // item.
  getFillFactor(itemType) {
    const items = this.fridgeItems.filter((el) => {
      return el.item.itemType === itemType;
    });
    if (items.length === 1) {
      return items[0].item.quantity / items[0].item.idealQty;
    } else {
      return 0;
    }
  },
  //This method is called every time an item is stored in the fridge
  handleItemAdded(itemObj) {
    if (this.itemExist(itemObj.itemUUID)) {
      this.updateItem(itemObj);
      return 'updated';
    } else {
      this.fridgeItems.push(itemObj);
      return 'added';
    }
  },
  handleItemRemoved(itemObj) {
    this.removeItem(itemObj);
    return 'removed';
  },
  forgetItem(itemType) {
    this.forget(itemType);
    return 'forgot';
  },
  itemExist(itemUUID) {
    const items = this.fridgeItems.filter((el) => {
      return el.itemUUID === itemUUID;
    });
    return items.length > 0;
  },
  updateItem(itemObj) {
    this.fridgeItems.forEach((updateitem) => {
      if (updateitem.itemUUID === itemObj.itemUUID) {
        updateitem.item.quantity = itemObj.quantity;
      }
    });
  },
  removeItem(itemObj) {
    this.fridgeItems.forEach((updateitem) => {
      if (updateitem.itemUUID === itemObj.itemUUID) {
        updateitem.item.quantity -= itemObj.quantity;
      }
    });
  },
  forget(itemObj) {
    this.fridgeItems.forEach((updateitem) => {
      if (updateitem.item) {
        if (updateitem.item.itemType === itemObj.itemType) {
          updateitem.item.forget = true;
        }
      }
    });
  }
};
