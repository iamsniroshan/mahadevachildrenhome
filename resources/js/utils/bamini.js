import { convertFromBamini } from 'tamil-to-unicode-convertor';

export function convertBaminiToUnicode(value) {
    if (!value || /[\u0b80-\u0bff]/.test(value)) return value;

    return convertFromBamini(value);
}

