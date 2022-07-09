import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardLast4'
})
export class CardLast4Pipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return '**** **** ****' + value.substring(14, value.length);
  }

}
