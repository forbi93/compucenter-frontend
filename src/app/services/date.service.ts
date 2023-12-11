import {Injectable} from "@angular/core";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor(private datePipe: DatePipe) {}

  formatToSpanishLongDate(date: Date): string {
    return this.datePipe.transform(date, 'EEEE dd \'de\' MMMM \'del\' yyyy', 'es-ES') ?? '';
  }
}
