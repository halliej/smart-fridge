
 # Interface for the Smart Fridge Manager


Event Handlers - These are methods invoked by the SmartFridge hardware to send notification of items that have been added and/or removed from the fridge. Every time an item is removed by the fridge user, it will emit a
handleItemRemoved() event to this server, every time a new item is added or a previously removed item is re-inserted, the fridge will emit a handleItemAdded() event with its updated fillFactor.


#### handleItemRemoved
This method is called every time an item is removed from the fridge
```javascript
function handleItemRemoved( itemObj );
```

#### handleItemAdded
This method is called every time an item is stored in the fridge
```javascript
function handleItemAdded( itemObj );
```

### These are the query methods for the fridge to be able to display alerts and create shopping lists for the fridge user.

#### getItems
Returns a list of items based on their fill factor. This method is used by the
fridge to display items that are running low and need to be replenished.

i.e.
getItems( 0.5 ) - will return any items that are 50% or less full, including items that are depleted. Unless all available containers are
empty, this method should only consider the non-empty containers
when calculating the overall fillFactor for a given item.
```javascript
function getItems( fillFactor );
```

#### getFillFactor
Returns the fill factor for a given item type to be displayed to the owner. Unless all available containers are empty, this method should only consider the non-empty containers when calculating the overall fillFactor for a given item.
```javascript
function getFillFactor( itemType );
```
#### forgetItem
Stop tracking a given item. This method is used by the fridge to signal that its owner will no longer stock this item and thus should not be returned from #getItems()
```javascript
function forgetItem( itemType );
```

### Unit test

npm test
