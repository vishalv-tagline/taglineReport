import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'squarePipe'
})
export class SquarePipePipe implements PipeTransform {
  transform(value: any, searchTerms: any): any {
    if (!value.length) {
      return value
    }
    else {
      return value.filter((data: any) => {
        let abc = data.title.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1
        return abc;
      })
    }
  }

}
