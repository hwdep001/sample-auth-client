import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'milliseconds'
})
export class Milliseconds implements PipeTransform {
  transform(value: number): number {
    let date: Date = new Date(0);
    date.setUTCSeconds(value);
    return date.getTime();
  }
}