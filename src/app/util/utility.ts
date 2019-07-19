import { TestObject } from 'protractor/built/driverProviders';

export function nullOrEmpty(value: string) : boolean
{ return value == null || value == ""; }

export function clone<TObject>(object: TObject, type: (new () => TObject))
{     
    let copy: TObject = Object.assign(new type(), object);
    return copy;
}