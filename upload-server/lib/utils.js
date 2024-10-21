export function cleanString(input) {
    return input.replace(/[^a-zA-Z0-9_]/g, '');
}