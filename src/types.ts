import { eld } from "eld/large";
import { isValidStringWithMinLen } from "./helper-funcs.ts";

// ngôn ngữ hỗ trợ
export enum Language {
    Japanese = "ja",
    Vietnamese = "vi",
    English = "en",
    Unsupported = "unsupported",
}

// Kiểu data của page
export enum DataType {
    general,
    news,
    image,
    video,
    product,
}

// Hàm nhận diện ngôn ngữ từ string có sẵn
export function detectLanguage(str: string): Language {
    const lang: string = eld.detect(str).language;  // lang string đã được eld nhận diện
    return (Object.values(Language).includes(lang as Language)) ? lang as Language : Language.Unsupported;
}

// Hàm kiểm tra xem biến bất kỳ có thuộc kiểu Language hay không
export function isLanguageValue(value: unknown): boolean {
    return Object.values(Language).includes(value as Language);
}

// Hàm kiểm tra xem biến bất kỳ có thuộc kiểu DataType hay không
export function isDataTypeValue(value: unknown): boolean {
    return Object.values(DataType).includes(value as DataType);
}

// Kiểu hỗ trợ lưu trữ Datetime cho MariaDB
export class MariaDateTime {
    value: string;
    formatRegex: RegExp = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

    constructor(datetime: Date) {
        this.value = datetime.toISOString().slice(0, 19).replace("T", " ");
    }

    validate(): boolean {
        return this.formatRegex.test(this.value);
    }

    logValue(): void {
        console.log(this.value);
    }
}