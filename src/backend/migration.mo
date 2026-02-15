import Time "mo:base/Time";

import OrderedMap "mo:base/OrderedMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Users "users/Users";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";

module {
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

  type GiftCardType = {
    #fiat;
    #crypto;
    #hybrid;
  };

  type Currency = {
    #usd;
    #eur;
    #gbp;
    #btc;
    #eth;
    #bgkd;
  };

  type Status = {
    #active;
    #redeemed;
    #expired;
    #pending;
  };

  type AnalyticsData = {
    totalValue : Nat;
    activeCards : Nat;
    redemptionRate : Float;
    countriesActive : Nat;
  };

  type ExportMethod = {
    #pdf;
    #excel;
    #csv;
  };

  type ExportRecord = {
    id : Text;
    cardId : Text;
    method : ExportMethod;
    timestamp : Time.Time;
    user : Text;
  };

  type EmailStatus = {
    #sent;
    #failed;
    #pending;
    #delivered;
    #bounced;
  };

  type EmailRecord = {
    id : Text;
    cardId : Text;
    to : Text;
    status : EmailStatus;
    timestamp : Time.Time;
  };

  type Export = {
    id : Text;
    cardId : Text;
    method : ExportMethod;
    timestamp : Time.Time;
    user : Text;
  };

  type Email = {
    id : Text;
    cardId : Text;
    to : Text;
    status : EmailStatus;
    timestamp : Time.Time;
  };

  type GiftCard = {
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

  type Redemption = {
    timestamp : Time.Time;
    location : Text;
    amount : Nat;
    currency : Currency;
    redeemedBy : Text;
    notes : Text;
    verificationData : Text;
    deviceDetails : Text;
  };

  type CustomUserRole = {
    #admin;
    #auditor;
    #user;
    #guest;
  };

  // User Profile Type
  type UserProfile = {
    name : Text;
    email : Text;
  };

  // NOC Types
  type AIStatus = {
    status : Text;
    lastUpdated : Time.Time;
    currentTask : Text;
    error : ?Text;
  };

  type TreasuryStatus = {
    totalValue : Nat;
    currencyBreakdown : [(Text, Nat)];
    liquidity : Float;
    reserves : Nat;
    lastAudit : Time.Time;
  };

  type DAOProposal = {
    id : Text;
    title : Text;
    description : Text;
    votesFor : Nat;
    votesAgainst : Nat;
    status : Text;
    createdAt : Time.Time;
    votingDeadline : Time.Time;
  };

  type ZKSolvencyProof = {
    root : Text;
    lastProofTime : Time.Time;
    status : Text;
  };

  type OmniMeshStatus = {
    status : Text;
    lastSync : Time.Time;
    nodes : Nat;
    active : Bool;
  };

  type OldActor = {
    services : OrderedMap.Map<Text, Service>;
    vessels : OrderedMap.Map<Text, Vessel>;
    careerInquiries : OrderedMap.Map<Text, CareerInquiry>;
    companyInfo : ?CompanyInfo;
    tokenomics : ?Tokenomics;
    investorInquiries : OrderedMap.Map<Text, InvestorInquiry>;
    contactForms : OrderedMap.Map<Text, ContactForm>;
    giftCards : OrderedMap.Map<Text, GiftCard>;
    userProfiles : OrderedMap.Map<Principal, UserProfile>;
    accessControlState : AccessControl.AccessControlState;
    adminAllowlist : OrderedMap.Map<Text, ()>;
    auditorAllowlist : OrderedMap.Map<Text, ()>;
    users : Users.State;
    usersSeeded : Bool;
  };

  type NewActor = {
    aiStatus : AIStatus;
    treasuryStatus : TreasuryStatus;
    daoProposals : [DAOProposal];
    zkSolvencyProof : ZKSolvencyProof;
    omniMeshStatus : OmniMeshStatus;
    universalLaunchState : Bool;
    services : OrderedMap.Map<Text, Service>;
    vessels : OrderedMap.Map<Text, Vessel>;
    careerInquiries : OrderedMap.Map<Text, CareerInquiry>;
    companyInfo : ?CompanyInfo;
    tokenomics : ?Tokenomics;
    investorInquiries : OrderedMap.Map<Text, InvestorInquiry>;
    contactForms : OrderedMap.Map<Text, ContactForm>;
    giftCards : OrderedMap.Map<Text, GiftCard>;
    userProfiles : OrderedMap.Map<Principal, UserProfile>;
    accessControlState : AccessControl.AccessControlState;
    adminAllowlist : OrderedMap.Map<Text, ()>;
    auditorAllowlist : OrderedMap.Map<Text, ()>;
    users : Users.State;
    usersSeeded : Bool;
  };

  public func run(old : OldActor) : NewActor {
    let aiStatus : AIStatus = {
      status = "idle";
      lastUpdated = Time.now();
      currentTask = "none";
      error = null;
    };

    let treasuryStatus : TreasuryStatus = {
      totalValue = 0;
      currencyBreakdown = [];
      liquidity = 0.0;
      reserves = 0;
      lastAudit = Time.now();
    };

    let daoProposals : [DAOProposal] = [];
    let zkSolvencyProof : ZKSolvencyProof = {
      root = "0x0";
      lastProofTime = Time.now();
      status = "valid";
    };

    let omniMeshStatus : OmniMeshStatus = {
      status = "operational";
      lastSync = Time.now();
      nodes = 0;
      active = true;
    };

    {
      aiStatus;
      treasuryStatus;
      daoProposals;
      zkSolvencyProof;
      omniMeshStatus;
      universalLaunchState = false;
      services = old.services;
      vessels = old.vessels;
      careerInquiries = old.careerInquiries;
      companyInfo = old.companyInfo;
      tokenomics = old.tokenomics;
      investorInquiries = old.investorInquiries;
      contactForms = old.contactForms;
      giftCards = old.giftCards;
      userProfiles = old.userProfiles;
      accessControlState = old.accessControlState;
      adminAllowlist = old.adminAllowlist;
      auditorAllowlist = old.auditorAllowlist;
      users = old.users;
      usersSeeded = old.usersSeeded;
    };
  };
};
