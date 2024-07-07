export class CommonUtils {
  static formatDateWithDaysAdded(date: Date, days: number): string {
    // Create a new Date object to avoid mutating the original date
    const newDate = new Date(date);

    // Add the specified number of days
    newDate.setDate(newDate.getDate() + days);

    // Extract year, month, and day
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Months are zero based, so add 1
    const day = String(newDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
