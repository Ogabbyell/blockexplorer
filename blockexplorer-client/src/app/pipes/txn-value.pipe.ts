import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'txnValue'
})
export class TxnValuePipe implements PipeTransform {

  transform(value: any, extension: string = '  ETH'): string {
    return (value / (10 ** 18)).toFixed(5) + extension;
  }

}
