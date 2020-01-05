import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any, key?: string, flag?: boolean): any {
    return value.sort((a, b) => {
      return flag ? ((a[key] > b[key]) ? -1 : 1) : ((a[key] < b[key]) ? -1 : 1);
    });
  }

}