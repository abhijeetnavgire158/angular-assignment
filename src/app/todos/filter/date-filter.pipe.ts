import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(value: any, fromDate: string, toDate: string): any {
    console.log(value);
    if (value.length <= 0 || fromDate == '' || toDate == '') {
      return value;
    }
    const resultArray = [];
    const fromDateFilter = new Date(fromDate);
    const toDateFilter = new Date(toDate);
    for (const item of value) {
      if (item['todoDate'] >= fromDateFilter && item['todoDate'] <= toDateFilter) {
        resultArray.push(item);
      }
    }
    console.log('Result Array');
    console.log(resultArray);
    console.log('fromDate' + fromDate + '-ss');
    console.log('fromDate' + toDate + '-ss');
    return resultArray;
  }

}
