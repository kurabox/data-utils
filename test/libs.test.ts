import { crypto } from "@std/crypto/crypto";
import { assert } from "@std/assert";
import { msgLog, LogType } from "../src/sys.ts";

Deno.test("creating hash test", async (): Promise<void> => {
    const message: string = "Hello, Deno";
    const encoder: TextEncoder = new TextEncoder();
    const data: Uint8Array<ArrayBuffer> = encoder.encode(message);
    const result: ArrayBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(result));
    console.log(hashArray.map(b => b.toString(16).padStart(2, '0')).join(''));
});

Deno.test("writing file test", async (): Promise<void> => {
    const logDir: string | undefined = Deno.env.get("LOG-DIR");
    assert(logDir !== undefined);
    // Khởi tạo file
    const currentLogFileName: string = `${LogType.CrawlerLog} ${new Date().toDateString()}.txt`;
    await Deno.writeTextFile(`${logDir}/${currentLogFileName}`, msgLog("Hello222!").content + '\n', { append: true, });
    console.log(currentLogFileName);
});