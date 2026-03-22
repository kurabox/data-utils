import { v4 } from "@std/uuid";
import { Language, isLanguageValue } from "./support-languages.ts";
import { isValidUrl, isValidStringWithMinLen } from "./helper-funcs.ts";

// Class mẫu cho Data dùng trong tìm kiếm
export interface PageData {
    id: string; // id của data
    url: string;    // url gốc dẫn đến Data này

    isValid(): boolean; // Hàm validate kiểu dữ liệu
    logData(): void;    // Hàm log thông tin bên trong của instance
}

// Class chứa thông tin NewsSearchData
export class NewsData implements PageData {
    public id: string;
    public title: string;
    public thumnailImageUrl: string | null;
    public content: string | null;
    public datetime: Date;
    public language: Language;
    public url: string;

    constructor(id: string, title: string, thumnailImageUrl: string | null, content: string | null, datetime: Date, language: Language, url: string) {
        this.id = id;
        this.title = title;
        this.thumnailImageUrl = thumnailImageUrl;
        this.content = content;
        this.datetime = datetime;
        this.language = language;
        this.url = url;
    }

    // Hàm Validate giá trị của NewsSearchData
    public isValid(): boolean {
        if (!v4.validate(this.id)) return false;    // Kiểm tra id
        if (!isValidStringWithMinLen(this.title, 2)) return false;   // Kiểm tra title
        if (this.thumnailImageUrl !== null && !isValidUrl(this.thumnailImageUrl)) return false; // Kiểm tra thumnail image url
        if (this.content !== null && !isValidStringWithMinLen(this.content, 2)) return false;   // Kiểm tra content
        if (!(this.datetime instanceof Date)) return false;
        if (!isLanguageValue(this.language)) return false; // Kiểm tra ngôn ngữ hỗ trợ
        if (!isValidUrl(this.url)) return false;    // Kiểm tra original url
        return true;    // Trả ra true trong các trường hợp còn lại
    }

    // method log ra giá trị của NewsSearchData (dùng trong phát triển)
    public logData(): void {
        console.log(`
        id: ${this.id}
            title: ${this.title}
            thumnail img url: ${this?.thumnailImageUrl}
            content: ${this?.content}
            datetime: ${this.datetime.toString()}
            language: ${this.language.toString()}
            original url: ${this.url}\n
        `);
    }
}