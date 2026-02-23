import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Item {
    id: ItemId;
    name: string;
    price: Balance;
}
export type Balance = bigint;
export interface Category {
    id: bigint;
    name: string;
}
export type ItemId = bigint;
export interface backendInterface {
    adminGrantFunds(code: bigint): Promise<void>;
    getAllItems(): Promise<Array<Item>>;
    getAvailableItems(): Promise<Array<Item>>;
    getBalance(): Promise<Balance>;
    getCategories(): Promise<Array<Category>>;
    getItem(itemId: ItemId): Promise<Item | null>;
    getOwnedItems(): Promise<Array<ItemId>>;
    getUserInventory(): Promise<Array<ItemId>>;
    initializeUser(): Promise<void>;
    purchaseItem(itemId: ItemId): Promise<void>;
}
