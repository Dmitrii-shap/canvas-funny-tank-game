export const removeDuplicates = <T extends unknown>(arr: T[], valueFn: (value: T) => string) => {
    const seen = new Set();
    return arr.filter(item => {
        const keyValue = valueFn(item);
        if (seen.has(keyValue)) {
            return false;
        } else {
            seen.add(keyValue);
            return true;
        }
    });
}