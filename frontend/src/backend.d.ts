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
export interface Shipment {
    id: string;
    trackingTimeline: Array<LocationUpdate>;
    cargoDetails: Array<CargoItem>;
    originPort: string;
    requester: string;
    assignedBy: string;
    departureDate: Time;
    vesselId: string;
    createdAt: Time;
    customsDocumentation: string;
    destinationPort: string;
    estimatedArrivalDate: Time;
    updatedAt: Time;
    currentStatus: ShipmentStatus;
}
export interface OmniMeshStatus {
    status: string;
    active: boolean;
    nodes: bigint;
    lastSync: Time;
}
export interface Quiz {
    id: string;
    title: string;
    passingScore: bigint;
    timeLimitMinutes: bigint;
    questionIds: Array<string>;
    courseId: string;
}
export interface ContactForm {
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
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
export interface QuizAttempt {
    id: string;
    userId: string;
    score: number;
    attemptDate: bigint;
    selectedAnswers: Array<bigint>;
    quizId: string;
    passed: boolean;
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
export interface Vessel {
    id: string;
    vesselType: string;
    name: string;
    description: string;
    image?: ExternalBlob;
    capacity: bigint;
}
export interface Email {
    id: string;
    to: string;
    status: EmailStatus;
    timestamp: Time;
    cardId: string;
}
export interface CargoItem {
    id: string;
    weight: number;
    containerNumber: string;
    description: string;
    quantity: bigint;
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
export interface LocationUpdate {
    status: string;
    notes: string;
    timestamp: Time;
    location: string;
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
export interface ShipVessel {
    id: bigint;
    telemetry: string;
    name: string;
}
export interface Question {
    id: string;
    correctIndex: bigint;
    difficulty: string;
    explanation: string;
    questionText: string;
    subjectId: string;
    courseId: string;
    options: Array<string>;
    topicId: string;
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
export enum ShipmentStatus {
    cancelled = "cancelled",
    pending = "pending",
    inTransit = "inTransit",
    delivered = "delivered"
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
    addCargoItem(shipmentId: string, cargoItem: CargoItem): Promise<void>;
    addExportRecord(cardId: string, method: ExportMethod, user: string): Promise<void>;
    addService(id: string, name: string, description: string, details: string): Promise<void>;
    addUser(name: string, email: string): Promise<void>;
    addVessel(id: string, name: string, vesselType: string, capacity: bigint, image: ExternalBlob | null, description: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createGiftCard(id: string, code: string, value: bigint, currency: Currency, cardType: GiftCardType, owner: string, notes: string, expirationDate: Time, originCountry: string, mobileNumber: string, createdBy: string, creationMetadata: string, lastUpdatedBy: string): Promise<void>;
    createQuestion(id: string, courseId: string, subjectId: string, topicId: string, questionText: string, options: Array<string>, correctIndex: bigint, explanation: string, difficulty: string): Promise<void>;
    createQuiz(id: string, title: string, courseId: string, questionIds: Array<string>, timeLimitMinutes: bigint, passingScore: bigint): Promise<void>;
    createShipment(originPort: string, destinationPort: string, vesselId: string, cargoDetails: Array<CargoItem>, departureDate: Time, estimatedArrivalDate: Time, customsDocumentation: string, requester: string): Promise<void>;
    deleteQuestion(id: string): Promise<void>;
    deleteQuiz(id: string): Promise<void>;
    generateZkSolvencyProof(): Promise<string>;
    getAIStatus(): Promise<AIStatus>;
    getAllQuestions(): Promise<Array<Question>>;
    getAllQuizzes(): Promise<Array<Quiz>>;
    getAllShipments(): Promise<Array<Shipment>>;
    getAllUsers(): Promise<Array<User>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCanisterInfo(): Promise<string>;
    getCareerInquiries(): Promise<Array<CareerInquiry>>;
    getCompanyInfo(): Promise<CompanyInfo | null>;
    getConnectionStatus(): Promise<ConnectionStatus>;
    getContactForms(): Promise<Array<ContactForm>>;
    getCyclesBalance(): Promise<bigint>;
    getDaoProposals(): Promise<Array<DAOProposal>>;
    getGiftCardAnalytics(): Promise<AnalyticsData>;
    getGiftCardById(id: string): Promise<GiftCard | null>;
    getGiftCards(): Promise<Array<GiftCard>>;
    getInvestorInquiries(): Promise<Array<InvestorInquiry>>;
    getMyVessels(): Promise<Array<ShipVessel>>;
    getNetworkInfo(): Promise<string>;
    getOmniMeshStatus(): Promise<OmniMeshStatus>;
    getPublicDemoShips(): Promise<Array<ShipVessel>>;
    getQuestionById(id: string): Promise<Question | null>;
    getQuestionsByCourse(courseId: string): Promise<Array<Question>>;
    getQuizById(id: string): Promise<Quiz | null>;
    getQuizzesByCourse(courseId: string): Promise<Array<Quiz>>;
    getRegistryCount(): Promise<bigint>;
    getServices(): Promise<Array<Service>>;
    getShipmentById(id: string): Promise<Shipment | null>;
    getShipmentsByVessel(vesselId: string): Promise<Array<Shipment>>;
    getTokenomics(): Promise<Tokenomics | null>;
    getTotalUsers(): Promise<bigint>;
    getTreasuryStatus(): Promise<TreasuryStatus>;
    getUniversalLaunchState(): Promise<boolean>;
    getUserAttempts(userId: string): Promise<Array<QuizAttempt>>;
    getUserById(id: bigint): Promise<User>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVessels(): Promise<Array<Vessel>>;
    getVesselsByType(vesselType: string): Promise<Array<Vessel>>;
    getZkCurrentRoot(): Promise<string>;
    healthCheck(): Promise<string>;
    initializeAccessControl(): Promise<void>;
    initializeAdminAccessControl(adminPrincipals: Array<string>): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    recordEmailSend(cardId: string, to: string, status: EmailStatus): Promise<void>;
    recordRedemption(cardId: string, location: string, amount: bigint, currency: Currency, redeemedBy: string, notes: string, verificationData: string, deviceDetails: string): Promise<void>;
    registerMyVessel(vesselName: string): Promise<boolean>;
    removeAuditor(auditorPrincipal: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedUsersDefault(): Promise<void>;
    setCompanyInfo(name: string, tagline: string, address: string, phone: string, email: string, vessels: bigint, crew: bigint, countries: bigint, years: bigint, leadershipQuote: string): Promise<void>;
    setTokenomics(totalSupply: bigint, symbol: string, governance: string, utility: string, roadmap: string, complianceNotice: string, whitepaperLink: string, contractLink: string): Promise<void>;
    submitCareerInquiry(name: string, email: string, message: string): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
    submitInvestorInquiry(name: string, email: string, message: string): Promise<void>;
    submitQuizAttempt(userId: string, quizId: string, selectedAnswers: Array<bigint>): Promise<QuizAttempt>;
    submitStcwQuiz(answers: Array<bigint>): Promise<{
        vesselsUnlocked: bigint;
        score: bigint;
        passed: boolean;
    }>;
    toggleUniversalLaunch(): Promise<void>;
    updateGiftCardStatus(id: string, newStatus: Status): Promise<void>;
    updateQuestion(id: string, courseId: string, subjectId: string, topicId: string, questionText: string, options: Array<string>, correctIndex: bigint, explanation: string, difficulty: string): Promise<void>;
    updateQuiz(id: string, title: string, courseId: string, questionIds: Array<string>, timeLimitMinutes: bigint, passingScore: bigint): Promise<void>;
    updateShipmentStatus(shipmentId: string, newStatus: ShipmentStatus, location: string, notes: string): Promise<void>;
    validatePrincipal(principal: Principal): Promise<boolean>;
    voteOnProposal(proposalId: string, support: boolean): Promise<void>;
}
