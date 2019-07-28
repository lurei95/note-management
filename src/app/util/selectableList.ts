/**
 * Implementation of a list with a selected element
 */
export class SelectableList<T> 
{
  private _items: T[]
  /**
   * @returns {T[]} The items in the list
   */ 
  get items(): T[] { return  this._items; }

  private _selectedItem: T;
  /**
   * @returns {T} The selected items or null if the list is empty
   */ 
  get selectedItem(): T { return this._selectedItem; }
  /**
   * @param {T} value The selected items 
   * (there must be an item == value in the list or the selected item is not set)
   */ 
  set selectedItem(value: T) 
  { 
    if (value != null)
    {
      const index = this._items.findIndex(item => item == value);
      if (index > -1)
        this._selectedItem = value;
    }
    else
      this._selectedItem = null;
  }

  /**
   * Constructor
   * 
   * @param {T[]} items List of items the list should be initialized with
   * @param {T} selectedItem The initially selected item
   */ 
  constructor(items: T[] = [], selectedItem?: T) 
  {
    this._items = items;
    this.selectedItem = selectedItem;
    if (selectedItem == null && items.length > 0)
      this.selectedItem = this._items.find(() => true);
  }

  /**
   * Adds a new item to the list
   * 
   * @param {T} item The new item to add
   */
  addItem(item: T)
  {
    this._items.push(item);
    if (this.count() == 1)
      this.selectedItem = item;
  }

  /**
   * Removes a item from the list
   * 
   * @param {T} item The item to remove
   */
  removeItem(item: T) { this.remove(item1 => item1 == item); }

  /**
   * Removes the first item that matches the predicate from the list
   * 
   * @param {(value: T) => boolean} predicate The predicate to check which item should be removed
   */
  remove(predicate: (value: T) => boolean)
  {
    const index = this._items.findIndex(predicate);
    this.removeAt(index);
  }

  /**
   * Returns the index of the item or -1 if the item is not in the list
   * 
   * @param {T} item The item to get the index of
   * @returns {number} The index of the item or -1
   */
  indexOf(item: T): number { return this.items.indexOf(item); }

  /**
   * Returns the index of the first item that matches the predicate or -1
   * 
   * @param {(value: T) => boolean} predicate The predicate to check for the index of the item
   * @returns {number} The index of the item or -1
   */
  findIndex(predicate: (value: T) => boolean): number { return this.items.findIndex(predicate); }

  /**
   * Removes the item at the given index
   */
  removeAt(index: number)
  {
    if (index < 0 || index >= this._items.length)
      return;

    let item = this._items[index];
    this._items.splice(index, 1);
    if (this.selectedItem == item)
    {
      if (this.count() > 0)
        this.selectedItem = this._items.find(() => true);
      else
        this.selectedItem = null;
    }
  }

  /**
   * Returns the count of the items in the list
   * 
   * @returns {number} The count of the items in the list
   */
  count(): number { return Object.keys(this._items).length; }
}