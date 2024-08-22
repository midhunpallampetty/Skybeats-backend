export interface IUtility {
    numTokandM(numString: string | number): string | number;
    getDate(date: number | string, fullDay?: string): string;
    getTimeDifference(targetDate: string): string;
    getLastMonths(monthCount: number): string[];
    getDatesOfCurrentYear(arrayOfDays: string[]): string[];
    generateOtp(digit: number): number | string;
    xKeyGenerator(length: string | number): string;
    isLeapYear(year: string | number): boolean;
    isEndCentury(year: string | number): boolean;
    dayDifference(dateStr1: string, dateStr2: string): number | null;
    getDay(dateStr: string): string;
    daysOfYear(dateStr: string | Date): number;
}
