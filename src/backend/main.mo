import OrderedMap "mo:base/OrderedMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import AccessControl "authorization/access-control";
import Users "users/Users";

actor BlackgoldKdent {
  let storage = Storage.new();
  include MixinStorage(storage);

  transient let textMap = OrderedMap.Make<Text>(Text.compare);
  transient let principalMap = OrderedMap.Make<Principal>(Principal.compare);

  type Service = {
    id : Text;
    name : Text;
    description : Text;
    details : Text;
  };

  type Vessel = {
    id : Text;
    name : Text;
    vesselType : Text;
    capacity : Nat;
    image : ?Storage.ExternalBlob;
    description : Text;
  };

  type CareerInquiry = {
    id : Text;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type CompanyInfo = {
    name : Text;
    tagline : Text;
    address : Text;
    phone : Text;
    email : Text;
    metrics : {
      vessels : Nat;
      crew : Nat;
      countries : Nat;
      years : Nat;
    };
    leadershipQuote : Text;
  };

  type Tokenomics = {
    totalSupply : Nat;
    symbol : Text;
    governance : Text;
    utility : Text;
    roadmap : Text;
    complianceNotice : Text;
    whitepaperLink : Text;
    contractLink : Text;
  };

  type InvestorInquiry = {
    id : Text;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type ContactForm = {
    id : Text;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  // Gift Card Types
  public type GiftCardType = {
    #fiat;
    #crypto;
    #hybrid;
  };

  public type Currency = {
    #usd;
    #eur;
    #gbp;
    #btc;
    #eth;
    #bgkd;
  };

  public type Status = {
    #active;
    #redeemed;
    #expired;
    #pending;
  };

  public type TransactionType = {
    #creation;
    #redemption;
    #refund;
    #adjustment;
    #issuance;
  };

  public type AnalyticsData = {
    totalValue : Nat;
    activeCards : Nat;
    redemptionRate : Float;
    countriesActive : Nat;
  };

  public type ExportMethod = {
    #pdf;
    #excel;
    #csv;
  };

  public type ExportRecord = {
    id : Text;
    cardId : Text;
    method : ExportMethod;
    timestamp : Time.Time;
    user : Text;
  };

  public type EmailStatus = {
    #sent;
    #failed;
    #pending;
    #delivered;
    #bounced;
  };

  public type EmailRecord = {
    id : Text;
    cardId : Text;
    to : Text;
    status : EmailStatus;
    timestamp : Time.Time;
  };

  public type Export = {
    id : Text;
    cardId : Text;
    method : ExportMethod;
    timestamp : Time.Time;
    user : Text;
  };

  public type Email = {
    id : Text;
    cardId : Text;
    to : Text;
    status : EmailStatus;
    timestamp : Time.Time;
  };

  public type GiftCard = {
    id : Text;
    code : Text;
    value : Nat;
    currency : Currency;
    cardType : GiftCardType;
    status : Status;
    createdAt : Time.Time;
    updatedAt : Time.Time;
    owner : Text;
    redemptionHistory : [Redemption];
    qrCode : Text;
    barcode : Text;
    notes : Text;
    expirationDate : Time.Time;
    analyticsData : ?AnalyticsData;
    creationMetadata : Text;
    lastUpdatedBy : Text;
    exports : [Export];
    emails : [Email];
    copiesGenerated : Nat;
    termsAccepted : Bool;
    originCountry : Text;
    mobileNumber : Text;
    exportHistory : [ExportRecord];
    emailHistory : [EmailRecord];
    redemptionCount : Nat;
  };

  public type Redemption = {
    timestamp : Time.Time;
    location : Text;
    amount : Nat;
    currency : Currency;
    redeemedBy : Text;
    notes : Text;
    verificationData : Text;
    deviceDetails : Text;
  };

  // Custom Role Type for Auditor
  public type CustomUserRole = {
    #admin;
    #auditor;
    #user;
    #guest;
  };

  // User Profile Type
  public type UserProfile = {
    name : Text;
    email : Text;
  };

  var services : OrderedMap.Map<Text, Service> = textMap.empty<Service>();
  var vessels : OrderedMap.Map<Text, Vessel> = textMap.empty<Vessel>();
  var careerInquiries : OrderedMap.Map<Text, CareerInquiry> = textMap.empty<CareerInquiry>();
  var companyInfo : ?CompanyInfo = null;
  var tokenomics : ?Tokenomics = null;
  var investorInquiries : OrderedMap.Map<Text, InvestorInquiry> = textMap.empty<InvestorInquiry>();
  var contactForms : OrderedMap.Map<Text, ContactForm> = textMap.empty<ContactForm>();
  var giftCards : OrderedMap.Map<Text, GiftCard> = textMap.empty<GiftCard>();
  var userProfiles : OrderedMap.Map<Principal, UserProfile> = principalMap.empty<UserProfile>();

  // Access Control State
  let accessControlState : AccessControl.AccessControlState = AccessControl.initState();

  // Admin Allowlist (stored as var for initialization check)
  var adminAllowlist : OrderedMap.Map<Text, ()> = textMap.empty<()>();

  // Auditor Allowlist
  var auditorAllowlist : OrderedMap.Map<Text, ()> = textMap.empty<()>();

  // Users Mixin State
  var users : Users.State = Users.init(Time.now());

  // Flag to track if users have been seeded
  var usersSeeded : Bool = false;

  // Connection Status Type
  public type ConnectionStatus = {
    status : Text;
    message : Text;
    timestamp : Time.Time;
    ping : ?Int;
    retries : Nat;
    environment : Text;
    canisterId : Text;
    network : Text;
  };

  // Legacy Initialize Auth function
  public shared ({ caller }) func initializeAuth() : async () {
    AccessControl.initialize(accessControlState, caller);
  };

  // Initialize Access Control (new function)
  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
    // Seed default users on first initialization
    if (not usersSeeded) {
      let (state1, _) = Users.createUser(users, "Initial User 1", "user1@kddomain.com", Time.now());
      users := state1;
      usersSeeded := true;
    };
  };

  // Initialize Access Control with Admin Principals
  public shared ({ caller }) func initializeAdminAccessControl(adminPrincipals : [Text]) : async () {
    AccessControl.initialize(accessControlState, caller);
    initializeAdminAllowlist(adminPrincipals);
    // Seed default users on first initialization
    if (not usersSeeded) {
      let (state1, _) = Users.createUser(users, "Initial User 1", "user1@kddomain.com", Time.now());
      users := state1;
      usersSeeded := true;
    };
  };

  // Initialize Admin Allowlist
  func initializeAdminAllowlist(adminPrincipals : [Text]) {
    if (textMap.size(adminAllowlist) > 0) {
      Debug.trap("Admin allowlist has already been initialized");
    };

    if (adminPrincipals.size() == 0) {
      Debug.trap("The provided adminPrincipal list size is zero");
    };

    for (principalText in Iter.fromArray(adminPrincipals)) {
      adminAllowlist := textMap.put(adminAllowlist, principalText, ());
    };
  };

  // Add Auditor to Allowlist (Admin-only)
  public shared ({ caller }) func addAuditor(auditorPrincipal : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Debug.trap("Unauthorized: Only admins can add auditors");
    };

    let auditorPrincipalParsed = Principal.fromText(auditorPrincipal);

    // Assign user role in AccessControl system
    AccessControl.assignRole(accessControlState, caller, auditorPrincipalParsed, #user);

    // Add to auditor allowlist
    auditorAllowlist := textMap.put(auditorAllowlist, auditorPrincipal, ());
  };

  // Remove Auditor from Allowlist (Admin-only)
  public shared ({ caller }) func removeAuditor(auditorPrincipal : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Debug.trap("Unauthorized: Only admins can remove auditors");
    };

    auditorAllowlist := textMap.delete(auditorAllowlist, auditorPrincipal);
  };

  // Check if Principal is Admin
  func isAdminPrincipal(callerPrincipal : Principal) : Bool {
    let callerPrincipalText = Principal.toText(callerPrincipal);
    switch (textMap.get(adminAllowlist, callerPrincipalText)) {
      case (null) { false };
      case (?_) { true };
    };
  };

  // Check if Principal is Auditor
  func isAuditorPrincipal(callerPrincipal : Principal) : Bool {
    let callerPrincipalText = Principal.toText(callerPrincipal);
    switch (textMap.get(auditorAllowlist, callerPrincipalText)) {
      case (null) { false };
      case (?_) { true };
    };
  };

  // Get Custom User Role
  func getCustomUserRole(caller : Principal) : CustomUserRole {
    if (AccessControl.isAdmin(accessControlState, caller) and isAdminPrincipal(caller)) {
      return #admin;
    };

    if (isAuditorPrincipal(caller)) {
      return #auditor;
    };

    let baseRole = AccessControl.getUserRole(accessControlState, caller);
    switch (baseRole) {
      case (#admin) { #admin };
      case (#user) { #user };
      case (#guest) { #guest };
    };
  };

  // Validate Admin Access
  func validateAdminAccess(caller : Principal) {
    if (not (AccessControl.isAdmin(accessControlState, caller) and isAdminPrincipal(caller))) {
      Debug.trap("Unauthorized: Only admins with valid principal may access");
    };
  };

  // Validate Read Access (Admin or Auditor)
  func validateReadAccess(caller : Principal) {
    let customRole = getCustomUserRole(caller);
    switch (customRole) {
      case (#admin) { /* allowed */ };
      case (#auditor) { /* allowed */ };
      case (_) {
        Debug.trap("Unauthorized: Only admins or auditors can access this data");
      };
    };
  };

  // User Profile Management - Required by instructions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view profiles");
    };
    principalMap.get(userProfiles, caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Debug.trap("Unauthorized: Can only view your own profile");
    };
    principalMap.get(userProfiles, user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles := principalMap.put(userProfiles, caller, profile);
  };

  // User Management - Admin-only for adding users
  public shared ({ caller }) func addUser(name : Text, email : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add users");
    };
    let (newState, _) = Users.createUser(users, name, email, Time.now());
    users := newState;
  };

  // Get Total Users - User-level access required (for dashboard)
  public query ({ caller }) func getTotalUsers() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view user count");
    };

    Users.getTotalUserCount(users);
  };

  // Get All Users - Admin-only
  public query ({ caller }) func getAllUsers() : async [Users.User] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view all users");
    };
    Users.getAllUsers(users);
  };

  // Get User By ID - Admin-only
  public query ({ caller }) func getUserById(id : Nat) : async Users.User {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view user details");
    };
    Users.findUserById(users, id);
  };

  // Seed Default Users - Admin-only
  public shared ({ caller }) func seedUsersDefault() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can seed users");
    };
    let (state1, _) = Users.createUser(users, "Initial User 1", "user1@kddomain.com", Time.now());
    let (state2, _) = Users.createUser(state1, "Initial User 2", "user2@kddomain.com", Time.now());
    let (state3, _) = Users.createUser(state2, "Initial User 3", "user3@kddomain.com", Time.now());
    users := state3;
    usersSeeded := true;
  };

  // Service Management (Admin-only)
  public shared ({ caller }) func addService(id : Text, name : Text, description : Text, details : Text) : async () {
    validateAdminAccess(caller);

    let service : Service = {
      id;
      name;
      description;
      details;
    };
    services := textMap.put(services, id, service);
  };

  // Public read access
  public query func getServices() : async [Service] {
    Iter.toArray(textMap.vals(services));
  };

  // Vessel Management (Admin-only)
  public shared ({ caller }) func addVessel(id : Text, name : Text, vesselType : Text, capacity : Nat, image : ?Storage.ExternalBlob, description : Text) : async () {
    validateAdminAccess(caller);

    let vessel : Vessel = {
      id;
      name;
      vesselType;
      capacity;
      image;
      description;
    };
    vessels := textMap.put(vessels, id, vessel);
  };

  // Public read access
  public query func getVessels() : async [Vessel] {
    Iter.toArray(textMap.vals(vessels));
  };

  // Public read access
  public query func getVesselsByType(vesselType : Text) : async [Vessel] {
    Iter.toArray(
      Iter.filter(
        textMap.vals(vessels),
        func(v : Vessel) : Bool {
          v.vesselType == vesselType;
        },
      )
    );
  };

  // Career Inquiry - Public submission
  public func submitCareerInquiry(name : Text, email : Text, message : Text) : async () {
    let id = name # email # Int.toText(Time.now());
    let inquiry : CareerInquiry = {
      id;
      name;
      email;
      message;
      timestamp = Time.now();
    };
    careerInquiries := textMap.put(careerInquiries, id, inquiry);
  };

  // Career Inquiry Retrieval - Admin only
  public query ({ caller }) func getCareerInquiries() : async [CareerInquiry] {
    validateAdminAccess(caller);
    Iter.toArray(textMap.vals(careerInquiries));
  };

  // Company Info (Admin-only write)
  public shared ({ caller }) func setCompanyInfo(name : Text, tagline : Text, address : Text, phone : Text, email : Text, vessels : Nat, crew : Nat, countries : Nat, years : Nat, leadershipQuote : Text) : async () {
    validateAdminAccess(caller);

    companyInfo := ?{
      name;
      tagline;
      address;
      phone;
      email;
      metrics = {
        vessels;
        crew;
        countries;
        years;
      };
      leadershipQuote;
    };
  };

  // Public read access
  public query func getCompanyInfo() : async ?CompanyInfo {
    companyInfo;
  };

  // Tokenomics (Admin-only write)
  public shared ({ caller }) func setTokenomics(totalSupply : Nat, symbol : Text, governance : Text, utility : Text, roadmap : Text, complianceNotice : Text, whitepaperLink : Text, contractLink : Text) : async () {
    validateAdminAccess(caller);

    tokenomics := ?{
      totalSupply;
      symbol;
      governance;
      utility;
      roadmap;
      complianceNotice;
      whitepaperLink;
      contractLink;
    };
  };

  // Public read access
  public query func getTokenomics() : async ?Tokenomics {
    tokenomics;
  };

  // Investor Inquiry - Public submission
  public func submitInvestorInquiry(name : Text, email : Text, message : Text) : async () {
    let id = name # email # Int.toText(Time.now());
    let inquiry : InvestorInquiry = {
      id;
      name;
      email;
      message;
      timestamp = Time.now();
    };
    investorInquiries := textMap.put(investorInquiries, id, inquiry);
  };

  // Investor Inquiry Retrieval - Admin only
  public query ({ caller }) func getInvestorInquiries() : async [InvestorInquiry] {
    validateAdminAccess(caller);
    Iter.toArray(textMap.vals(investorInquiries));
  };

  // Contact Form - Public submission
  public func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let id = name # email # Int.toText(Time.now());
    let form : ContactForm = {
      id;
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactForms := textMap.put(contactForms, id, form);
  };

  // Contact Form Retrieval - Admin only
  public query ({ caller }) func getContactForms() : async [ContactForm] {
    validateAdminAccess(caller);
    Iter.toArray(textMap.vals(contactForms));
  };

  // Gift Card Management - Admin only for creation
  public shared ({ caller }) func createGiftCard(
    id : Text,
    code : Text,
    value : Nat,
    currency : Currency,
    cardType : GiftCardType,
    owner : Text,
    notes : Text,
    expirationDate : Time.Time,
    originCountry : Text,
    mobileNumber : Text,
    createdBy : Text,
    creationMetadata : Text,
    lastUpdatedBy : Text,
  ) : async () {
    validateAdminAccess(caller);

    let now = Time.now();

    let giftCard : GiftCard = {
      id;
      code;
      value;
      currency;
      cardType;
      status = #active;
      createdAt = now;
      updatedAt = now;
      owner;
      redemptionHistory = [];
      qrCode = code;
      barcode = code;
      notes;
      expirationDate;
      analyticsData = null;
      creationMetadata;
      lastUpdatedBy = createdBy;
      exports = [];
      emails = [];
      copiesGenerated = 0;
      termsAccepted = false;
      originCountry;
      mobileNumber;
      exportHistory = [];
      emailHistory = [];
      redemptionCount = 0;
    };

    giftCards := textMap.put(giftCards, id, giftCard);
  };

  // Gift Card Retrieval - Admin or Auditor (read-only)
  public query ({ caller }) func getGiftCards() : async [GiftCard] {
    validateReadAccess(caller);
    Iter.toArray(textMap.vals(giftCards));
  };

  // Gift Card by ID - Admin or Auditor (read-only)
  public query ({ caller }) func getGiftCardById(id : Text) : async ?GiftCard {
    validateReadAccess(caller);
    textMap.get(giftCards, id);
  };

  // Update Gift Card Status - Admin only
  public shared ({ caller }) func updateGiftCardStatus(id : Text, newStatus : Status) : async () {
    validateAdminAccess(caller);

    switch (textMap.get(giftCards, id)) {
      case (null) {
        Debug.trap("Gift card not found");
      };
      case (?card) {
        let updatedCard = { card with status = newStatus; updatedAt = Time.now() };
        giftCards := textMap.put(giftCards, id, updatedCard);
      };
    };
  };

  // Record Redemption - Admin only
  public shared ({ caller }) func recordRedemption(
    cardId : Text,
    location : Text,
    amount : Nat,
    currency : Currency,
    redeemedBy : Text,
    notes : Text,
    verificationData : Text,
    deviceDetails : Text,
  ) : async () {
    validateAdminAccess(caller);

    switch (textMap.get(giftCards, cardId)) {
      case (null) {
        Debug.trap("Gift card not found");
      };
      case (?card) {
        let redemption : Redemption = {
          timestamp = Time.now();
          location;
          amount;
          currency;
          redeemedBy;
          notes;
          verificationData;
          deviceDetails;
        };

        let updatedCard = {
          card with
          redemptionHistory = Array.append(card.redemptionHistory, [redemption]);
          updatedAt = Time.now();
          status = #redeemed;
          redemptionCount = card.redemptionCount + 1;
        };
        giftCards := textMap.put(giftCards, cardId, updatedCard);
      };
    };
  };

  // Add Export Record - Admin only
  public shared ({ caller }) func addExportRecord(cardId : Text, method : ExportMethod, user : Text) : async () {
    validateAdminAccess(caller);

    let exportRecord : ExportRecord = {
      id = cardId # user # Int.toText(Time.now());
      cardId;
      method;
      timestamp = Time.now();
      user;
    };

    switch (textMap.get(giftCards, cardId)) {
      case (null) {
        Debug.trap("Gift card not found");
      };
      case (?card) {
        let updatedCard = {
          card with
          exportHistory = Array.append(card.exportHistory, [exportRecord]);
          updatedAt = Time.now();
        };
        giftCards := textMap.put(giftCards, cardId, updatedCard);
      };
    };
  };

  // Record Email Send - Admin only
  public shared ({ caller }) func recordEmailSend(cardId : Text, to : Text, status : EmailStatus) : async () {
    validateAdminAccess(caller);

    let emailRecord : EmailRecord = {
      id = cardId # to # Int.toText(Time.now());
      cardId;
      to;
      status;
      timestamp = Time.now();
    };

    switch (textMap.get(giftCards, cardId)) {
      case (null) {
        Debug.trap("Gift card not found");
      };
      case (?card) {
        let updatedCard = {
          card with
          emailHistory = Array.append(card.emailHistory, [emailRecord]);
          updatedAt = Time.now();
        };
        giftCards := textMap.put(giftCards, cardId, updatedCard);
      };
    };
  };

  // Gift Card Analytics - Admin or Auditor (read-only)
  public query ({ caller }) func getGiftCardAnalytics() : async AnalyticsData {
    validateReadAccess(caller);

    let cards = Iter.toArray(textMap.vals(giftCards));
    let total = Array.foldLeft<GiftCard, Nat>(
      cards,
      0,
      func(acc, card) {
        acc + card.value;
      },
    );

    let active = Array.foldLeft<GiftCard, Nat>(
      cards,
      0,
      func(acc, card) {
        if (card.status == #active) acc + 1 else acc;
      },
    );

    let redeemed = Array.foldLeft<GiftCard, Nat>(
      cards,
      0,
      func(acc, card) {
        if (card.status == #redeemed) acc + 1 else acc;
      },
    );

    let countries = Array.foldLeft<GiftCard, Nat>(
      cards,
      0,
      func(acc, card) {
        if (card.originCountry != "") acc + 1 else acc;
      },
    );

    {
      totalValue = total;
      activeCards = active;
      redemptionRate = if (active + redeemed == 0) 0 else (Float.fromInt(redeemed) / Float.fromInt(active + redeemed)) * 100;
      countriesActive = countries;
    };
  };

  // Health Check Endpoint - Public
  public query func healthCheck() : async Text {
    let timestamp = Int.toText(Time.now());
    "Canister is healthy at timestamp: " # timestamp;
  };

  // Get Connection Status - Authenticated users only
  public query ({ caller }) func getConnectionStatus() : async ConnectionStatus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only authenticated users can check connection status");
    };
    let status : ConnectionStatus = {
      status = "connected";
      message = "Connection is healthy";
      timestamp = Time.now();
      ping = ?123;
      retries = 0;
      environment = "local";
      canisterId = "abcde-12345";
      network = "ic";
    };

    status;
  };

  // Validate Principal - Authenticated users only
  public query ({ caller }) func validatePrincipal(principal : Principal) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only authenticated users can validate principals");
    };
    if (AccessControl.isAdmin(accessControlState, caller)) {
      true;
    } else {
      principal == caller;
    };
  };

  // Get Canister Info for Testing - Public
  public query func getCanisterInfo() : async Text {
    "abcde-12345";
  };

  // Get Network Info for Testing - Public
  public query func getNetworkInfo() : async Text {
    "local";
  };

  // Get Caller User Role - Required by instructions
  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  // Assign Caller User Role - Required by instructions (admin-only check inside)
  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  // Is Caller Admin - Required by instructions
  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };
};

