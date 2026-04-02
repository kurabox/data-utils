// ngôn ngữ hỗ trợ
export enum Language {
    Japanese = "ja",
    Vietnamese = "vi",
    English = "en",
    Unsupported = "unsupported",
}

// Kiểu data của page
export enum DataType {
    General,
    News,
    Image,
    Video,
    Product,
}

// Trạng thái Crawl của một page
export enum CrawlStatus {
    Crawled,    // Đã crawl
    Processed,  // Đã xử lý (indexed)
    NeedToUpdate,   // Cần được cập nhật
}

// Kiểu hỗ trợ lưu trữ Datetime cho MariaDB
export class MariaDateTime {
    private value: string;
    private formatRegex: RegExp = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

    constructor(datetime: Date) {
        this.value = datetime.toISOString().slice(0, 19).replace("T", " ");
    }

    validate(): boolean {
        return this.formatRegex.test(this.value);
    }

    getValue(): string {
        return this.value;
    }

    setValue(datetime: Date): void {
        this.value = datetime.toISOString().slice(0, 19).replace("T", " ");
    }
}