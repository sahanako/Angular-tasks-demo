import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'formatData' })
export class FormatDataPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(data: any[]): any[] {
    if (!Array.isArray(data)) {
      return data; // Return unchanged if not an array
    }

    return data.map((item) => ({
      // Capitalize name
      name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      // Format date
      date: this.datePipe.transform(item.date, 'mediumDate'),
      // Other properties can be formatted as needed
    }));
  }
}
