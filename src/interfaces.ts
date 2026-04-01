// Interface dữ liệu thao tác database
export interface DBData {
    id: string;
    isValid(): boolean;
    logData(): void;
}