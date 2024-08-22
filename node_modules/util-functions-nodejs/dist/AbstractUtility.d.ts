import { IUtility } from './IUtility';
export declare abstract class AbstractUtility implements IUtility {
    abstract numTokandM(numString: string | number): string | number;
    abstract getDate(date: number | string, fullDay?: string): string;
    abstract getTimeDifference(targetDate: string): string;
    abstract getLastMonths(monthCount: number): string[];
    abstract getDatesOfCurrentYear(arrayOfDays: string[]): string[];
    abstract generateOtp(digit: number): number | string;
    abstract xKeyGenerator(length: string | number): string;
    abstract isLeapYear(year: string | number): boolean;
    abstract isEndCentury(year: string | number): boolean;
    abstract dayDifference(dateStr1: string, dateStr2: string): number | null;
    abstract getDay(dateStr: string): string;
    abstract daysOfYear(dateStr: string | Date): number;
}
