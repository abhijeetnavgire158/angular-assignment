import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any, column: string, order: boolean = true): any {
    if (value.length <= 0 || column == '' ) {
      return value;
    }
    value.sort(function(a, b) {
      console.log('asdasdasasdasdasdas');
      console.log(column);
      console.log(a.title);
      if (column == 'title') {
        
        console.log(a.title);
        console.log(b.title);
          var titleA=a.title.toLowerCase();
          var titleB=b.title.toLowerCase();
          if (order) {
              if (titleA < titleB) //sort string ascending
              return -1;
              if (titleA > titleB)
                  return 1;
              return 0;//default return value (no sorting)
          } else if (!order){
              if (titleA > titleB) //sort string descending
              return -1;
              if (titleA < titleB)
                  return 1;
              return 0; //default return value (no sorting)
          }
      }
    });

    return value;
  }

}
