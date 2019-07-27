/**
 * Checks if a string es null or empty
 * 
 * @param {string} value The string to check
 * @returns {boolean} If the string es null or empty
 */
export function nullOrEmpty(value: string) : boolean
{ return value == null || value == ""; }

/**
 * Truncates the string and replaces the cut off part by "..."
 * 
 * @param {string} text The string to truncate
 * @returns {string} The truncated string
 */
export function truncate(text: string, maxLength: number): string
{ 
  if (nullOrEmpty(text))
    return coalesce(text);
  if (text.length > maxLength)
    return text.substring(0, maxLength) + "...";
  return text;
}

/**
 * Coalesces a string
 * 
 * @param {string} value The string to coalesce
 * @param {string} defaultValue The default result when value is null or undefined
 * @returns {string} value or defaultValue if value is null or undefined
 */
export function coalesce(value: string, defaultValue: string = ""): string
{ return value == null ? defaultValue : value; }

/**
 * Clones an object
 * 
 * @param {TObject} object The object to clone
 * @param {(new () => TObject)} type Type of the object (must have a constructor that takes no arguments)
 * @returns {TObject} The cloned object
 */
export function clone<TObject>(object: TObject, type: (new () => TObject)): TObject
{     
  let copy: TObject = Object.assign(new type(), object);
  return copy;
}