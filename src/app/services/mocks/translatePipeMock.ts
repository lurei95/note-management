import { PipeTransform, Pipe } from '@angular/core';

/**
 * Mock for the translate pipe
 */
@Pipe({name: "translate"})
export class TranslatePipeMock implements PipeTransform 
{
  /**
   * Name of the pipe
   */
	public name: string = "translate";

  /**
   * Mock implementation for transform
   */
	public transform(query: string, ...args: any[]): any {	return query; }
}