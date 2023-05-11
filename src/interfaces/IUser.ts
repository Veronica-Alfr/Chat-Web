import type { IChat } from "@/interfaces/IChat.js";

export interface IUser {
    text: string;
    allMessages: IChat;
}