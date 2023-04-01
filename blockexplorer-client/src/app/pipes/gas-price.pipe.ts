import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gasPrice'
})
export class GasPricePipe implements PipeTransform {

  transform(value: any): string {
    return (value / (10 ** 18)).toFixed(12);
  }

}
