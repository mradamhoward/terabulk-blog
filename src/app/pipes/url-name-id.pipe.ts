import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlNameId'
})
export class UrlNameIdPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.replace(/\s+/g, '-').toLowerCase();
  }

}
