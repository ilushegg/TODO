import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment';

@Pipe({
  name: 'momentStr',
  pure: false
})
export class MomentPipeString implements PipeTransform {
  
  transform(m: moment.Moment, format: string = 'MMMM YYYY'): string {
    return m.format(format);
  }



}