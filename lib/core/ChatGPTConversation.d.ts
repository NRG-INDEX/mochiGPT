import { Message, TextBasedChannel, User } from "discord.js";
import { CreateCompletionResponseUsage, OpenAIApi } from 'openai';
import { ModelName } from "./ModelInfo";
import { BaseConversation } from "./BaseConversation";
import { MessageHistoryItem } from "./MessageHistoryItem";
export declare const messageToPromptPart: (item: MessageHistoryItem) => string;
export declare function ignoreInput(inputValue: string): RegExpMatchArray | null;
export declare class ChatGPTConversation extends BaseConversation {
    username: string;
    private model;
    static latestVersion: number;
    messageHistory: string[];
    messageHistoryMap: Record<string, MessageHistoryItem>;
    nextEmbedCheck: number;
    customPrompt: string | null;
    temperature: number;
    showUsername: boolean;
    makePrivate: boolean;
    summary: string;
    nextSummaryMessageCount: number;
    allowExternals: boolean;
    shownAllowExternalsInfo: boolean;
    version: number;
    constructor(threadId: string, creatorId: string, guildId: string, username: string, model: ModelName);
    static handleRetrievalFromDB(fromDb: ChatGPTConversation): Promise<ChatGPTConversation>;
    createHumanMessage(openai: OpenAIApi, user: User, message: string): Promise<MessageHistoryItem>;
    createResponseMessage(openai: OpenAIApi, botUsername: string, user: User, message: string, usageInfo: CreateCompletionResponseUsage[]): Promise<{
        type: "response";
        usageInfo?: CreateCompletionResponseUsage[] | undefined;
    } & {
        id: string;
        timestamp: number | undefined;
        username: string;
        content: string;
        numTokens: number;
        embedding: string | null;
        fixedTokens: boolean | undefined;
    }>;
    private tryCreateEmbeddingForMessage;
    private SendPromptToGPTChat;
    handlePrompt(user: User, channel: TextBasedChannel, inputValue: string, messageToReplyTo?: Message<boolean>): Promise<void>;
    private handleSpecialKeywords;
    private trySummariseThread;
    private getImageDescriptions;
    private userHasExceptionRole;
    private trimDescriptions;
    deleteMessages(toDelete: number): Promise<string[]>;
    private tryEmbedMany;
    private testQuery;
    private getFullPrompt;
    private getRelevantMessages;
    sendReply(channel: TextBasedChannel, message: string, messageToReplyTo?: Message<boolean>): Promise<void>;
    private getDebugName;
    static initialiseAll(): Promise<void>;
}
