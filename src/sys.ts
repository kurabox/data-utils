/**
 * Chức năng ghi log thống nhất cho tất cả các chương trình trong kurabox
*/
import { generateV4UUID } from "./funcs.ts";

// Các kiểu log có thể được sử dụng trong kurabox
export enum LogType {
    CrawlerLog = "crawler_log", // log của crawler
    OperatorCrudLog = "operator_crud_log", // log thao tác data của back-end
    OperatorSearchLog = "operator_search_log",   // log tìm kiếm của backend
    SysLog = "sys_log"  // kiểu log chung trong hệ thống
}

export type Log = {
    id: string; // v4 uuid
    timestamp: bigint;  // bigint timestamp
    content: string;
    type: LogType; 
};

// Hàm sys log 
export function msgLog(msg: string, logType: LogType): Log {
    const timestamp: number = Date.now();    // Lấy ra thời gian khởi tạo log
    const logStr: string = `[${new Date(timestamp).toString().split(" (")[0]}] ${msg}`;
    console.log(logStr);   // Hiển thị log ra console
    return {
        id: generateV4UUID(),
        timestamp: BigInt(timestamp),
        content: logStr,
        type: logType,
    };
}

/**
 * Hàm lưu log chỉ định vào file
 * @throws {Error}
*/
export async function writeLogFile(logs: Log[], logType: LogType): Promise<void> {
    // Kiểm tra cài đặt thư mục log trong .env, nếu không thể tìm thấy thì throws error
    const logDir: string | undefined = Deno.env.get("LOG-DIR");
    if (logDir === undefined) {
        throw new Error("Cannot find LOG-DIR path in .env");    // thông báo lỗi khi không thể tìm thấy log-dir trong .env
    }
    // Tiến hành ghi file
    const currentLogFileName: string = `${logType}_${new Date().toDateString().replace(/\s+/g, '_')}.txt`;
    const logsContent: string = logs.map(log => log.content).join('\n');
    await Deno.writeTextFile(`${logDir}/${currentLogFileName}`, `${logsContent}\n`, { append: true });
}