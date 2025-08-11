
export enum EmailJobType {
    WELCOME = "welcome",
    RESET_PASSWORD = "reset-password",
    CONFIRM_ORDER = "confirm-order"
}

export interface EmailJobData {
    type: EmailJobType,
    to: string,
    payload: any
}