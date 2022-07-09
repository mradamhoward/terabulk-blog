import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lowercasehyphen'
})
export class LowercasehyphenPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.replace(/\s+/g, '-').toLowerCase();
  }

}
