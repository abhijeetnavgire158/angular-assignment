import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleFilter'
})
export class TitleFilterPipe implements PipeTransform {

  transform(value: any, filterString: string): any {
    console.log(value);
    if (value.length <= 0 || filterString == '') {
      return value;
    }

    const resultArray = [];
    for(const item of value) {
      if (item['title'].toLowerCase().includes(filterString.toLowerCase())) {
        resultArray.push(item);
      }
    }

    return resultArray;
  }
}
