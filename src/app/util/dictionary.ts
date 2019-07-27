/**
 * Implementation of a dictionary with elements of type T
 */
export class Dictionary<T>
{
  private _keys: string[] = [];
  /**
   * @returns {string[]} A list of the existing keys in the dictionary
   */
  get keys(): string[] { return this._keys; }

  private _values: T[] = [];
  /**
   * @returns {T[]} A list of the existing elements in the dictionary
   */
  get values(): T[] { return this._values; }

  /**
   * Constructor
   * 
   * @param {{ key: string; value: T; }[]} initialValue List of key value pairs the dictionary 
   * should be initialized with
   */
  constructor(initialValue?: { key: string; value: T; }[]) 
  {
    if(initialValue != null)
      for (let i = 0;i < initialValue.length;i++) 
      {
        this[initialValue[i].key] = initialValue[i].value;
        this._keys.push(initialValue[i].key);
        this._values.push(initialValue[i].value);
      }
  }

  /**
   * Adds a new element to the dictionary
   * 
   * @param {string} key The key of the new element
   * @param {T} value The new element
   */
  add(key: string, value: T) 
  {
    this[key] = value;
    this._keys.push(key);
    this._values.push(value);
  }

  /**
   * Removes the element with given key from the dictionary
   * 
   * @param {string} key The key of the element to remove
   */
  remove(key: string) 
  {
    var index = this._keys.indexOf(key);
    if (index > 0)
    {
      this._keys.splice(index, 1);
      this._values.splice(index, 1);
      delete this[key];
    }
  }

  /**
   * Returns whether the dictionary contains the given key
   * 
   * @param {string} key The key to test
   */
  containsKey(key: string) 
  {
    if (typeof this[key] === "undefined")
      return false;
    return true;
  }
}