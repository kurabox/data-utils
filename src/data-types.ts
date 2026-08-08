/**
 * Các kiểu utils hỗ trợ cho search engine và crawler
*/

// ngôn ngữ hỗ trợ
export enum Language {
    Japanese = "ja",
    Vietnamese = "vi",
    English = "en",
    Unsupported = "unsupported",
}

// Kiểu data của page
export enum PageType {
    Web = "web",
    News = "news",
    Image = "image",
    Video = "video",
    Product = "product",
}

// Trạng thái Crawl của một page
export enum CrawlStatus {
    Crawled,    // Đã crawl
    Processed,  // Đã xử lý (indexed)
    NeedToUpdate,   // Cần được cập nhật
}