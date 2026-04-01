import { assert, assertFalse, assertEquals } from "@std/assert";
import { generateV4UUID } from "../src/helper-funcs.ts";
import { Page, MetaData } from "../src/data-models.ts";
import { DataType, MariaDateTime } from "../src/types.ts";

Deno.test("Page class test", () => {
    const validPageData: Page = new Page(generateV4UUID(), "https://www.example.com");
    assert(validPageData.isValid() === true);

    // page có id không hợp lệ
    const invalidIdPage: Page = validPageData;
    invalidIdPage.id = "1234";
    assertFalse(invalidIdPage.isValid());

    // page có url không hợp lệ
    const invalidURLPage: Page = validPageData;
    invalidURLPage.URL = "ccc.com";
    assertFalse(invalidURLPage.isValid());
});

Deno.test("MetaData class test", () => {
    // Case hợp lệ
    const metaValid = new MetaData(
        generateV4UUID(),
        generateV4UUID(),
        "Tin tức Anime",
        new MariaDateTime(new Date()),
        DataType.news,
        "https://example.com"
    );
    assertEquals(metaValid.isValid(), true, "Dữ liệu hợp lệ đầy đủ");

    // Case id không hợp lệ
    const metaInvalidId = new MetaData(
        "12345",
        generateV4UUID(),
        "Title",
        new MariaDateTime(new Date()),
        DataType.general,
        "https://example.com"
    );
    assertEquals(metaInvalidId.isValid(), false, "Id không hợp lệ");

    // Case pageId không hợp lệ
    const metaInvalidPageId = new MetaData(
        generateV4UUID(),
        "abc",
        "Title",
        new MariaDateTime(new Date()),
        DataType.general,
        "https://example.com"
    );
    assertEquals(metaInvalidPageId.isValid(), false, "PageId không hợp lệ");

    // Case title quá ngắn
    const metaShortTitle = new MetaData(
        generateV4UUID(),
        generateV4UUID(),
        "A",
        new MariaDateTime(new Date()),
        DataType.general,
        "https://example.com"
    );
    assertEquals(metaShortTitle.isValid(), false, "Title quá ngắn");

    // Case publicationDate không phải Date
    const metaInvalidDate = new MetaData(
        generateV4UUID(),
        generateV4UUID(),
        "Title",
        "2026-04-01" as unknown as MariaDateTime, // Ép kiểu sai để test
        DataType.general,
        "https://example.com"
    );
    assertEquals(metaInvalidDate.isValid(), false, "PublicationDate không phải Date");

    // Case source không hợp lệ
    const metaInvalidSource = new MetaData(
        generateV4UUID(),
        generateV4UUID(),
        "Title",
        new MariaDateTime(new Date()),
        DataType.general,
        "not-a-url"
    );
    assertEquals(metaInvalidSource.isValid(), false, "Source không hợp lệ");

    // Case logData (chỉ cần gọi để đảm bảo không lỗi runtime)
    const metaLog = new MetaData(
        generateV4UUID(),
        generateV4UUID(),
        "Title",
        new MariaDateTime(new Date()),
        DataType.video,
        "https://example.com"
    );
    metaLog.logData();
});