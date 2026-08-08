import { msgLog, Log, LogType } from "../src/sys.ts";
import { assert, assertEquals } from "@std/assert";

Deno.test("msgLog test", (): void => {
    const log: Log = msgLog("Test message!", LogType.OperatorCrudLog);
    console.log(log);

    // Kiểm tra hàm trả về object Log
    assertEquals(typeof log, "object");

    // Kiểm tra có property content chứa message
    assertEquals(log.content.includes("Test message"), true);

    // Kiểm tra có property type đúng với tham số truyền vào
    assertEquals(log.type, LogType.OperatorCrudLog);
});