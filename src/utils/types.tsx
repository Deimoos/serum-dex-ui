import {AccountInfo, Connection, PublicKey} from '@solana/web3.js';
import Wallet from "@project-serum/sol-wallet-adapter";
import {Market, OpenOrders} from "@project-serum/serum";
import {Event} from "@project-serum/serum/lib/queue";
import {Order} from "@project-serum/serum/lib/market";

export interface ConnectionContextValues {
    endpoint: string;
    setEndpoint: (newEndpoint: string) => void;
    connection: Connection;
    sendConnection: Connection;
}

export interface WalletContextValues {
    wallet: Wallet;
    connected: boolean;
    providerUrl: string;
    setProviderUrl: (newProviderUrl: string) => void;
    providerName: string;
}

export interface MarketInfo {
    address: PublicKey;
    name: string;
    programId: PublicKey;
    deprecated: boolean;
    quoteLabel?: string;
    baseLabel?: string;
}

export interface CustomMarketInfo {
    address: string;
    name: string;
    programId: string;
    quoteLabel?: string;
    baseLabel?: string;
}

export interface FullMarketInfo {
    address?: PublicKey;
    name?: string;
    programId?: PublicKey;
    deprecated?: boolean;
    quoteLabel?: string;
    baseLabel?: string;
    marketName?: string;
    baseCurrency?: string;
    quoteCurrency?: string;
    marketInfo?: MarketInfo;
}

export interface MarketContextValues extends FullMarketInfo{
    market: Market | undefined | null;
    setMarketAddress: (newMarketAddress: string) => void;
    customMarkets: CustomMarketInfo[];
    setCustomMarkets: (newCustomMarkets: CustomMarketInfo[]) => void;
}

export interface TokenAccount {
    pubkey: PublicKey;
    account: AccountInfo<Buffer> | null;
    effectiveMint: PublicKey
}

export interface Trade extends Event {
    side: string;
    price: number;
    feeCost: number;
    size: number;
}

export interface OrderWithMarket extends Order {
    marketName: string;
}

export interface OrderWithMarketAndMarketName extends Order {
    market: Market;
    marketName: string | undefined;
}

interface BalancesBase {
    key: string;
    coin: string;
    wallet?: number | null | undefined;
    orders?: number | null | undefined;
    openOrders?: OpenOrders | null | undefined;
    unsettled?: number| null | undefined;
}

export interface Balances extends BalancesBase {
    market?: Market | null | undefined;
}

export interface OpenOrdersBalances extends BalancesBase {
    market?: string | null | undefined;
    baseCurrencyAccount: { pubkey: PublicKey; account: AccountInfo<Buffer> } | null | undefined;
    quoteCurrencyAccount: { pubkey: PublicKey; account: AccountInfo<Buffer> } | null | undefined;
}
