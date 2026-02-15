import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface AnalyticsData {
    totalValue: bigint;
    countriesActive: bigint;
    activeCards: bigint;
    redemptionRate: number;
}
export interface TreasuryStatus {
    currencyBreakdown: Array<[string, bigint]>;
    totalValue: bigint;
    liquidity: number;
    reserves: bigint;
    lastAudit: Time;
}
export type Time = bigint;
export interface GiftCard {
    id: string;
    status: Status;
    exportHistory: Array<ExportRecord>;
    exports: Array<Export>;
    value: bigint;
    termsAccepted: boolean;
    owner: string;
    cardType: GiftCardType;
    redemptionCount: bigint;
    code: string;
    analyticsData?: AnalyticsData;
    createdAt: Time;
    creationMetadata: string;
    mobileNumber: string;
    emails: Array<Email>;
    lastUpdatedBy: string;
    updatedAt: Time;
    emailHistory: Array<EmailRecord>;
    expirationDate: Time;
    barcode: string;
    currency: Currency;
    notes: string;
    originCountry: string;
    redemptionHistory: Array<Redemption>;
    copiesGenerated: bigint;
    qrCode: string;
}
export interface ConnectionStatus {
    status: string;
    ping?: bigint;
    network: string;
    message: string;
    timestamp: Time;
    environment: string;
    canisterId: string;
    retries: bigint;
}
export interface OmniMeshStatus {
    status: string;
    active: boolean;
    nodes: bigint;
    lastSync: Time;
}
export interface ContactForm {
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface EmailRecord {
    id: string;
    to: string;
    status: EmailStatus;
    timestamp: Time;
    cardId: string;
}
export interface AIStatus {
    status: string;
    lastUpdated: Time;
    error?: string;
    currentTask: string;
}
export interface Tokenomics {
    roadmap: string;
    complianceNotice: string;
    utility: string;
    contractLink: string;
    totalSupply: bigint;
    whitepaperLink: string;
    governance: string;
    symbol: string;
}
export interface ExportRecord {
    id: string;
    method: ExportMethod;
    user: string;
    timestamp: Time;
    cardId: string;
}
export interface Email {
    id: string;
    to: string;
    status: EmailStatus;
    timestamp: Time;
    cardId: string;
}
export interface Vessel {
    id: string;
    vesselType: string;
    name: string;
    description: string;
    image?: ExternalBlob;
    capacity: bigint;
}
export interface InvestorInquiry {
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface User {
    id: bigint;
    name: string;
    createdAt: Time;
    email: string;
    updatedAt: Time;
}
export interface Redemption {
    redeemedBy: string;
    deviceDetails: string;
    verificationData: string;
    currency: Currency;
    notes: string;
    timestamp: Time;
    amount: bigint;
    location: string;
}
export interface Service {
    id: string;
    name: string;
    description: string;
    details: string;
}
export interface CompanyInfo {
    leadershipQuote: string;
    metrics: {
        vessels: bigint;
        crew: bigint;
        countries: bigint;
        years: bigint;
    };
    tagline: string;
    name: string;
    email: string;
    address: string;
    phone: string;
}
export interface CareerInquiry {
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface Export {
    id: string;
    method: ExportMethod;
    user: string;
    timestamp: Time;
    cardId: string;
}
export interface DAOProposal {
    id: string;
    status: string;
    title: string;
    votesAgainst: bigint;
    votesFor: bigint;
    createdAt: Time;
    votingDeadline: Time;
    description: string;
}
export interface UserProfile {
    name: string;
    email: string;
}
export enum Currency {
    btc = "btc",
    eth = "eth",
    eur = "eur",
    gbp = "gbp",
    usd = "usd",
    bgkd = "bgkd"
}
export enum EmailStatus {
    pending = "pending",
    sent = "sent",
    delivered = "delivered",
    failed = "failed",
    bounced = "bounced"
}
export enum ExportMethod {
    csv = "csv",
    pdf = "pdf",
    excel = "excel"
}
export enum GiftCardType {
    fiat = "fiat",
    hybrid = "hybrid",
    crypto = "crypto"
}
export enum Status {
    active = "active",
    expired = "expired",
    pending = "pending",
    redeemed = "redeemed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAuditor(auditorPrincipal: string): Promise<void>;
    addExportRecord(cardId: string, method: ExportMethod, user: string): Promise<void>;
    addService(id: string, name: string, description: string, details: string): Promise<void>;
    addUser(name: string, email: string): Promise<void>;
    addVessel(id: string, name: string, vesselType: string, capacity: bigint, image: ExternalBlob | null, description: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createGiftCard(id: string, code: string, value: bigint, currency: Currency, cardType: GiftCardType, owner: string, notes: string, expirationDate: Time, originCountry: string, mobileNumber: string, createdBy: string, creationMetadata: string, lastUpdatedBy: string): Promise<void>;
    generateZkSolvencyProof(): Promise<string>;
    getAIStatus(): Promise<AIStatus>;
    getAllUsers(): Promise<Array<User>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCanisterInfo(): Promise<string>;
    getCareerInquiries(): Promise<Array<CareerInquiry>>;
    getCompanyInfo(): Promise<CompanyInfo | null>;
    getConnectionStatus(): Promise<ConnectionStatus>;
    getContactForms(): Promise<Array<ContactForm>>;
    getDaoProposals(): Promise<Array<DAOProposal>>;
    getGiftCardAnalytics(): Promise<AnalyticsData>;
    getGiftCardById(id: string): Promise<GiftCard | null>;
    getGiftCards(): Promise<Array<GiftCard>>;
    getInvestorInquiries(): Promise<Array<InvestorInquiry>>;
    getNetworkInfo(): Promise<string>;
    getOmniMeshStatus(): Promise<OmniMeshStatus>;
    getServices(): Promise<Array<Service>>;
    getTokenomics(): Promise<Tokenomics | null>;
    getTotalUsers(): Promise<bigint>;
    getTreasuryStatus(): Promise<TreasuryStatus>;
    getUniversalLaunchState(): Promise<boolean>;
    getUserById(id: bigint): Promise<User>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVessels(): Promise<Array<Vessel>>;
    getVesselsByType(vesselType: string): Promise<Array<Vessel>>;
    getZkCurrentRoot(): Promise<string>;
    healthCheck(): Promise<string>;
    initializeAccessControl(): Promise<void>;
    initializeAdminAccessControl(adminPrincipals: Array<string>): Promise<void>;
    initializeAuth(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    recordEmailSend(cardId: string, to: string, status: EmailStatus): Promise<void>;
    recordRedemption(cardId: string, location: string, amount: bigint, currency: Currency, redeemedBy: string, notes: string, verificationData: string, deviceDetails: string): Promise<void>;
    removeAuditor(auditorPrincipal: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedUsersDefault(): Promise<void>;
    setCompanyInfo(name: string, tagline: string, address: string, phone: string, email: string, vessels: bigint, crew: bigint, countries: bigint, years: bigint, leadershipQuote: string): Promise<void>;
    setTokenomics(totalSupply: bigint, symbol: string, governance: string, utility: string, roadmap: string, complianceNotice: string, whitepaperLink: string, contractLink: string): Promise<void>;
    submitCareerInquiry(name: string, email: string, message: string): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
    submitInvestorInquiry(name: string, email: string, message: string): Promise<void>;
    toggleUniversalLaunch(): Promise<void>;
    updateGiftCardStatus(id: string, newStatus: Status): Promise<void>;
    validatePrincipal(principal: Principal): Promise<boolean>;
    voteOnProposal(proposalId: string, support: boolean): Promise<void>;
}
