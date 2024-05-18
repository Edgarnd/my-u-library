export class FormUtil {
    private static isEmpty(value: any): boolean {
        return value === null || value === undefined || value === '' || (typeof value === 'string' && value.trim() === '');
    }

    public static validateNotEmpty(obj: Record<string, any>): boolean {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (FormUtil.isEmpty(obj[key])) {
                    return false;
                }
            }
        }
        return true;
    }
}