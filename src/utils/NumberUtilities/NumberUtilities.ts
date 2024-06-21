/**
 * This class provides the utilities for number formatting operations.
 *
 * @remarks
 * The utilities available here:-
 * 1. getNumberInCurrencyFormat() - Convert the given number to currency format.
 *
 */
export class NumberUtilities {
    /**
     * Get the amount in the given currency format.
     *
     * @param currency - 3 letter currency code (Ex- USD, INR, GBP etc)
     * @param amount - Amount which is to be converted to currency format.
     *
     * @returns It returns the currency format in string. (Ex - $5.00)
     */
    static getNumberInCurrencyFormat(currency: string, amount: number): string {
        const formatter = new Intl.NumberFormat(`en-${currency.substring(0, 2)}`, {
            style: 'currency',
            currency: currency, // currency code
        });

        return formatter.format(amount ? amount : 0);
    }

    /**
     * Get the value in the compact Format.
     * Example - 2000 = 2K, 2000000 = 2M etc.
     *
     *
     * @param value - value which is to be compact.
     */
    static getNumberInCompactFormat(value: number): string {
        const formatter = new Intl.NumberFormat('en', {
            notation: 'compact',
        });

        return formatter.format(value ? value : 0);
    }
}
