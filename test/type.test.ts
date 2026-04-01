import { assert, assertFalse, assertEquals } from "@std/assert";
import { DataType, isDataTypeValue, MariaDateTime } from "../src/types.ts";

Deno.test("DataType test", () => {
    const dataType = DataType.general;
    assert(isDataTypeValue(dataType) === true);

    const randomValue: unknown = "somevalue";
    assertFalse(isDataTypeValue(randomValue));
});

Deno.test("MariaDatetime type test", () => {
    const mariaDatetime: MariaDateTime = new MariaDateTime(new Date());
    mariaDatetime.logValue();

    // Case 1: Ngày hợp lệ
    const date1 = new Date("2026-04-01T03:30:34Z");
    const mariaDate1 = new MariaDateTime(date1);
    assertEquals(mariaDate1.value, "2026-04-01 03:30:34", "Chuyển đổi đúng định dạng");
    assert(mariaDate1.validate() === true);
    mariaDate1.logValue(); // đảm bảo không lỗi khi in ra

    // Case 2: Ngày khác
    const date2 = new Date("2026-12-25T15:45:00Z");
    const mariaDate2 = new MariaDateTime(date2);
    assert(mariaDate2.validate() === true);
    assertEquals(mariaDate2.value, "2026-12-25 15:45:00", "Chuyển đổi đúng định dạng");
    mariaDate2.logValue();

    // Case 3: Ngày hiện tại
    const now = new Date();
    const mariaDateNow = new MariaDateTime(now);
    // Kiểm tra chuỗi có dạng YYYY-MM-DD HH:MM:SS
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    assert(mariaDateNow.validate() === true);
    assertEquals(regex.test(mariaDateNow.value), true, "Định dạng hợp lệ cho ngày hiện tại");
    mariaDateNow.logValue();
});