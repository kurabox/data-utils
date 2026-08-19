import { msgLog, Log, LogType } from "../src/sys.ts";
import { assertEquals } from "@std/assert";
import { writeLogFile } from "../src/sys.ts";

Deno.test("msgLog test", (): void => {
    const log: Log = msgLog("Test message!");
    console.log(log);

    // Kiểm tra hàm trả về object Log
    assertEquals(typeof log, "object");

    // Kiểm tra có property content chứa message
    assertEquals(log.content.includes("Test message"), true);
});

Deno.test("writeLogFile test", async (): Promise<void> => {
    const logs: Log[] = [];
    for (let i: number = 101; i <= 500; i++) {
        logs.push(msgLog(`Hello ${i}`));
    }
    console.log(logs);
    await writeLogFile(logs, LogType.CrawlerLog);
});