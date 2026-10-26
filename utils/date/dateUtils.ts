
export class DateUtils {
  static readonly ISO = "yyyy-MM-dd";
  static readonly SLASH = "dd/MM/yyyy";
  static readonly DOT = "dd.MM.yyyy";

  static getFormattedDate(pattern = this.DOT): string {
    return this.formatDate(new Date(), pattern);
  }

  static getDateWithOffset(days: number, pattern = this.DOT): string {
    const date = new Date();
    date.setDate(date.getDate() + days);

    return this.formatDate(date, pattern);
  }

  static getDateWithMonthOffset(months: number, pattern = this.DOT): string {
    const date = new Date();
    date.setMonth(date.getMonth() + months);

    return this.formatDate(date, pattern);
  }

  static getDateWithYearOffset(years: number, pattern = this.DOT): string {
    const date = new Date();
    date.setFullYear(date.getFullYear() + years);

    return this.formatDate(date, pattern);
  }

  private static formatDate(date: Date, pattern: string): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return pattern
      .replace("yyyy", year)
      .replace("MM", month)
      .replace("dd", day);
  }
}
