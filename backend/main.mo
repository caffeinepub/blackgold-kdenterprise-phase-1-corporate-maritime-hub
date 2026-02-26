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
import Cycles "mo:base/ExperimentalCycles";

actor {

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

  // NOC Types
  public type AIStatus = {
    status : Text;
    lastUpdated : Time.Time;
    currentTask : Text;
    error : ?Text;
  };

  public type TreasuryStatus = {
    totalValue : Nat;
    currencyBreakdown : [(Text, Nat)];
    liquidity : Float;
    reserves : Nat;
    lastAudit : Time.Time;
  };

  public type DAOProposal = {
    id : Text;
    title : Text;
    description : Text;
    votesFor : Nat;
    votesAgainst : Nat;
    status : Text;
    createdAt : Time.Time;
    votingDeadline : Time.Time;
  };

  public type ZKSolvencyProof = {
    root : Text;
    lastProofTime : Time.Time;
    status : Text;
  };

  public type OmniMeshStatus = {
    status : Text;
    lastSync : Time.Time;
    nodes : Nat;
    active : Bool;
  };

  // Shipping Types
  public type ShipmentStatus = {
    #pending;
    #inTransit;
    #delivered;
    #cancelled;
  };

  public type CargoItem = {
    id : Text;
    description : Text;
    quantity : Nat;
    weight : Float;
    containerNumber : Text;
  };

  public type LocationUpdate = {
    timestamp : Time.Time;
    location : Text;
    status : Text;
    notes : Text;
  };

  public type Shipment = {
    id : Text;
    originPort : Text;
    destinationPort : Text;
    vesselId : Text;
    cargoDetails : [CargoItem];
    departureDate : Time.Time;
    estimatedArrivalDate : Time.Time;
    currentStatus : ShipmentStatus;
    trackingTimeline : [LocationUpdate];
    createdAt : Time.Time;
    updatedAt : Time.Time;
    customsDocumentation : Text;
    assignedBy : Text;
    requester : Text;
  };

  // Quiz Types
  public type Question = {
    id : Text;
    courseId : Text;
    subjectId : Text;
    topicId : Text;
    questionText : Text;
    options : [Text];
    correctIndex : Nat;
    explanation : Text;
    difficulty : Text;
  };

  public type Quiz = {
    id : Text;
    title : Text;
    courseId : Text;
    questionIds : [Text];
    timeLimitMinutes : Nat;
    passingScore : Nat;
  };

  public type QuizAttempt = {
    id : Text;
    userId : Text;
    quizId : Text;
    selectedAnswers : [Nat];
    score : Float;
    passed : Bool;
    attemptDate : Int;
  };

  // Quiz State
  var questions : OrderedMap.Map<Text, Question> = textMap.empty<Question>();
  var quizzes : OrderedMap.Map<Text, Quiz> = textMap.empty<Quiz>();
  var quizAttempts : OrderedMap.Map<Text, QuizAttempt> = textMap.empty<QuizAttempt>();

  // Shipping Management State
  var shipments : OrderedMap.Map<Text, Shipment> = textMap.empty<Shipment>();

  // NOC State (Stable)
  var aiStatus : AIStatus = {
    status = "idle";
    lastUpdated = Time.now();
    currentTask = "none";
    error = null;
  };

  var treasuryStatus : TreasuryStatus = {
    totalValue = 0;
    currencyBreakdown = [];
    liquidity = 0.0;
    reserves = 0;
    lastAudit = Time.now();
  };

  var daoProposals : [DAOProposal] = [];
  var zkSolvencyProof : ZKSolvencyProof = {
    root = "0x0";
    lastProofTime = Time.now();
    status = "valid";
  };

  var omniMeshStatus : OmniMeshStatus = {
    status = "operational";
    lastSync = Time.now();
    nodes = 0;
    active = true;
  };

  var universalLaunchState : Bool = false;

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

  // User Ship Data using PrincipalMap (OrderedMap)
  public type ShipVessel = {
    id : Nat;
    name : Text;
    telemetry : Text;
  };

  type UserShipData = {
    vessels : [ShipVessel];
    stcwScore : Nat;
    stcwPassed : Bool;
  };

  var userVessels : OrderedMap.Map<Principal, UserShipData> = principalMap.empty();
  var nextVesselId : Nat = 1;

  // Quiz Management Functions

  // Create Question (Admin only)
  public shared ({ caller }) func createQuestion(
    id : Text,
    courseId : Text,
    subjectId : Text,
    topicId : Text,
    questionText : Text,
    options : [Text],
    correctIndex : Nat,
    explanation : Text,
    difficulty : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can create questions");
    };

    let question : Question = {
      id;
      courseId;
      subjectId;
      topicId;
      questionText;
      options;
      correctIndex;
      explanation;
      difficulty;
    };

    questions := textMap.put(questions, id, question);
  };

  // Get All Questions (User-level access)
  public query ({ caller }) func getAllQuestions() : async [Question] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view questions");
    };
    Iter.toArray(textMap.vals(questions));
  };

  // Get Question by ID (User-level access)
  public query ({ caller }) func getQuestionById(id : Text) : async ?Question {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view questions");
    };
    textMap.get(questions, id);
  };

  // Get Questions by Course (User-level access)
  public query ({ caller }) func getQuestionsByCourse(courseId : Text) : async [Question] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view questions");
    };
    Iter.toArray(
      Iter.filter(
        textMap.vals(questions),
        func(q : Question) : Bool {
          q.courseId == courseId;
        },
      )
    );
  };

  // Update Question (Admin only)
  public shared ({ caller }) func updateQuestion(
    id : Text,
    courseId : Text,
    subjectId : Text,
    topicId : Text,
    questionText : Text,
    options : [Text],
    correctIndex : Nat,
    explanation : Text,
    difficulty : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update questions");
    };

    let question : Question = {
      id;
      courseId;
      subjectId;
      topicId;
      questionText;
      options;
      correctIndex;
      explanation;
      difficulty;
    };

    questions := textMap.put(questions, id, question);
  };

  // Delete Question (Admin only)
  public shared ({ caller }) func deleteQuestion(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can delete questions");
    };
    questions := textMap.delete(questions, id);
  };

  // Create Quiz (Admin only)
  public shared ({ caller }) func createQuiz(
    id : Text,
    title : Text,
    courseId : Text,
    questionIds : [Text],
    timeLimitMinutes : Nat,
    passingScore : Nat,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can create quizzes");
    };

    let quiz : Quiz = {
      id;
      title;
      courseId;
      questionIds;
      timeLimitMinutes;
      passingScore;
    };

    quizzes := textMap.put(quizzes, id, quiz);
  };

  // Get All Quizzes (User-level access)
  public query ({ caller }) func getAllQuizzes() : async [Quiz] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view quizzes");
    };
    Iter.toArray(textMap.vals(quizzes));
  };

  // Get Quiz by ID (User-level access)
  public query ({ caller }) func getQuizById(id : Text) : async ?Quiz {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view quizzes");
    };
    textMap.get(quizzes, id);
  };

  // Get Quizzes by Course (User-level access)
  public query ({ caller }) func getQuizzesByCourse(courseId : Text) : async [Quiz] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view quizzes");
    };
    Iter.toArray(
      Iter.filter(
        textMap.vals(quizzes),
        func(q : Quiz) : Bool {
          q.courseId == courseId;
        },
      )
    );
  };

  // Update Quiz (Admin only)
  public shared ({ caller }) func updateQuiz(
    id : Text,
    title : Text,
    courseId : Text,
    questionIds : [Text],
    timeLimitMinutes : Nat,
    passingScore : Nat,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update quizzes");
    };

    let quiz : Quiz = {
      id;
      title;
      courseId;
      questionIds;
      timeLimitMinutes;
      passingScore;
    };

    quizzes := textMap.put(quizzes, id, quiz);
  };

  // Delete Quiz (Admin only)
  public shared ({ caller }) func deleteQuiz(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can delete quizzes");
    };
    quizzes := textMap.delete(quizzes, id);
  };

  // Submit Quiz Attempt (User-level access with ownership verification)
  public shared ({ caller }) func submitQuizAttempt(
    userId : Text,
    quizId : Text,
    selectedAnswers : [Nat],
  ) : async QuizAttempt {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can submit quiz attempts");
    };

    // Verify that the caller can only submit attempts for themselves
    let callerText = Principal.toText(caller);
    if (userId != callerText and not AccessControl.isAdmin(accessControlState, caller)) {
      Debug.trap("Unauthorized: Can only submit quiz attempts for yourself");
    };

    // Find the quiz
    let quiz = switch (textMap.get(quizzes, quizId)) {
      case (null) { Debug.trap("Quiz not found") };
      case (?q) { q };
    };

    // Fetch all questions for the quiz
    let quizQuestions = Array.mapFilter<Text, Question>(
      quiz.questionIds,
      func(id) { textMap.get(questions, id) },
    );

    // Validate answer count matches question count
    if (selectedAnswers.size() != quizQuestions.size()) {
      Debug.trap("Selected answers count does not match number of quiz questions");
    };

    // Count correct answers
    var correctCount = 0;
    for (i in Iter.range(0, quizQuestions.size() - 1)) {
      if (selectedAnswers[i] == quizQuestions[i].correctIndex) {
        correctCount += 1;
      };
    };

    // Calculate score as a percentage
    let score = if (quizQuestions.size() == 0) 0.0 else (Float.fromInt(correctCount) * 100.0) / Float.fromInt(quizQuestions.size());

    // Determine if user passed
    let passed = score >= Float.fromInt(quiz.passingScore);

    // Create QuizAttempt record
    let attempt : QuizAttempt = {
      id = quizId # userId # Int.toText(Time.now());
      userId;
      quizId;
      selectedAnswers;
      score;
      passed;
      attemptDate = Time.now();
    };

    // Store attempt in stable storage
    quizAttempts := textMap.put(quizAttempts, attempt.id, attempt);

    attempt;
  };

  // Get User Attempts (User can view own attempts, admin can view any)
  public query ({ caller }) func getUserAttempts(userId : Text) : async [QuizAttempt] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view quiz attempts");
    };

    let callerText = Principal.toText(caller);
    if (userId != callerText and not AccessControl.isAdmin(accessControlState, caller)) {
      Debug.trap("Unauthorized: Can only view your own quiz attempts");
    };

    Iter.toArray(
      Iter.filter(
        textMap.vals(quizAttempts),
        func(attempt : QuizAttempt) : Bool {
          attempt.userId == userId;
        },
      )
    );
  };

  // Shipping Management Functions

  // Create new shipment (Authenticated users)
  public shared ({ caller }) func createShipment(
    originPort : Text,
    destinationPort : Text,
    vesselId : Text,
    cargoDetails : [CargoItem],
    departureDate : Time.Time,
    estimatedArrivalDate : Time.Time,
    customsDocumentation : Text,
    requester : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only authenticated users can create shipments");
    };

    let id = originPort # destinationPort # Int.toText(Time.now());
    let now = Time.now();

    let shipment : Shipment = {
      id;
      originPort;
      destinationPort;
      vesselId;
      cargoDetails;
      departureDate;
      estimatedArrivalDate;
      currentStatus = #pending;
      trackingTimeline = [];
      createdAt = now;
      updatedAt = now;
      customsDocumentation;
      assignedBy = Principal.toText(caller);
      requester;
    };

    shipments := textMap.put(shipments, id, shipment);
  };

  // Update shipment status and location (Admin only)
  public shared ({ caller }) func updateShipmentStatus(
    shipmentId : Text,
    newStatus : ShipmentStatus,
    location : Text,
    notes : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update shipment status");
    };

    switch (textMap.get(shipments, shipmentId)) {
      case (null) {
        Debug.trap("Shipment not found");
      };
      case (?shipment) {
        let locationUpdate : LocationUpdate = {
          timestamp = Time.now();
          location;
          status = debug_show (newStatus);
          notes;
        };

        let updatedShipment = {
          shipment with
          currentStatus = newStatus;
          trackingTimeline = Array.append(shipment.trackingTimeline, [locationUpdate]);
          updatedAt = Time.now();
        };
        shipments := textMap.put(shipments, shipmentId, updatedShipment);
      };
    };
  };

  // Get all shipments (Authenticated users)
  public query ({ caller }) func getAllShipments() : async [Shipment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only authenticated users can view shipments");
    };
    Iter.toArray(textMap.vals(shipments));
  };

  // Get shipment details by ID (Authenticated users - owner or admin)
  public query ({ caller }) func getShipmentById(id : Text) : async ?Shipment {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only authenticated users can view shipment details");
    };

    switch (textMap.get(shipments, id)) {
      case (null) { null };
      case (?shipment) {
        let callerText = Principal.toText(caller);
        // Allow access if caller is admin, the requester, or the one who created it
        if (AccessControl.isAdmin(accessControlState, caller) or shipment.requester == callerText or shipment.assignedBy == callerText) {
          ?shipment;
        } else {
          Debug.trap("Unauthorized: Can only view your own shipments");
        };
      };
    };
  };

  // Get shipments by vessel (Authenticated users)
  public query ({ caller }) func getShipmentsByVessel(vesselId : Text) : async [Shipment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only authenticated users can view shipments by vessel");
    };
    Iter.toArray(
      Iter.filter(
        textMap.vals(shipments),
        func(s : Shipment) : Bool {
          s.vesselId == vesselId;
        },
      )
    );
  };

  // Add cargo item to shipment (Admin only)
  public shared ({ caller }) func addCargoItem(shipmentId : Text, cargoItem : CargoItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add cargo items");
    };

    switch (textMap.get(shipments, shipmentId)) {
      case (null) {
        Debug.trap("Shipment not found");
      };
      case (?shipment) {
        let updatedShipment = {
          shipment with
          cargoDetails = Array.append(shipment.cargoDetails, [cargoItem]);
          updatedAt = Time.now();
        };
        shipments := textMap.put(shipments, shipmentId, updatedShipment);
      };
    };
  };

  // NOC Methods - All require user-level access
  public query ({ caller }) func getAIStatus() : async AIStatus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can access AI status");
    };
    aiStatus;
  };

  public query ({ caller }) func getTreasuryStatus() : async TreasuryStatus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can access treasury status");
    };
    treasuryStatus;
  };

  public query ({ caller }) func getDaoProposals() : async [DAOProposal] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can access DAO proposals");
    };
    daoProposals;
  };

  public shared ({ caller }) func voteOnProposal(proposalId : Text, support : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can vote");
    };

    daoProposals := Array.map<DAOProposal, DAOProposal>(
      daoProposals,
      func(p) {
        if (p.id == proposalId) {
          if (support) {
            { p with votesFor = p.votesFor + 1 };
          } else { { p with votesAgainst = p.votesAgainst + 1 } };
        } else { p };
      },
    );
  };

  public query ({ caller }) func getZkCurrentRoot() : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can access ZK root");
    };
    zkSolvencyProof.root;
  };

  public shared ({ caller }) func generateZkSolvencyProof() : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can generate ZK proofs");
    };

    let newRoot = "0x" # Int.toText(Time.now());
    zkSolvencyProof := {
      zkSolvencyProof with
      root = newRoot;
      lastProofTime = Time.now();
      status = "valid";
    };
    newRoot;
  };

  public query ({ caller }) func getOmniMeshStatus() : async OmniMeshStatus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can access omni-mesh status");
    };
    omniMeshStatus;
  };

  public shared ({ caller }) func toggleUniversalLaunch() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can toggle universal launch");
    };

    universalLaunchState := not universalLaunchState;
  };

  public query ({ caller }) func getUniversalLaunchState() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can access universal launch state");
    };
    universalLaunchState;
  };

  // Get Cycles Balance (user-level access required)
  public query ({ caller }) func getCyclesBalance() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can access cycles balance");
    };
    Cycles.balance();
  };

  // Initialize Access Control
  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
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
    AccessControl.assignRole(accessControlState, caller, auditorPrincipalParsed, #user);
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

  // Get Total Users - User-level access required
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add services");
    };

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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add vessels");
    };

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

  // Career Inquiry - Public submission (no auth required)
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view career inquiries");
    };
    Iter.toArray(textMap.vals(careerInquiries));
  };

  // Company Info (Admin-only write)
  public shared ({ caller }) func setCompanyInfo(name : Text, tagline : Text, address : Text, phone : Text, email : Text, vessels : Nat, crew : Nat, countries : Nat, years : Nat, leadershipQuote : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set company info");
    };

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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set tokenomics");
    };

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

  // Investor Inquiry - Public submission (no auth required)
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view investor inquiries");
    };
    Iter.toArray(textMap.vals(investorInquiries));
  };

  // Contact Form - Public submission (no auth required)
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view contact forms");
    };
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can create gift cards");
    };

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

  // Gift Card by ID - Admin, Auditor, or Owner
  public query ({ caller }) func getGiftCardById(id : Text) : async ?GiftCard {
    switch (textMap.get(giftCards, id)) {
      case (null) { null };
      case (?card) {
        let callerText = Principal.toText(caller);
        let customRole = getCustomUserRole(caller);

        // Allow access if caller is admin, auditor, or the owner
        switch (customRole) {
          case (#admin) { ?card };
          case (#auditor) { ?card };
          case (_) {
            if (card.owner == callerText) {
              ?card;
            } else {
              Debug.trap("Unauthorized: Can only view your own gift cards");
            };
          };
        };
      };
    };
  };

  // Update Gift Card Status - Admin only
  public shared ({ caller }) func updateGiftCardStatus(id : Text, newStatus : Status) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update gift card status");
    };

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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can record redemptions");
    };

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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add export records");
    };

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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can record email sends");
    };

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
    } else { principal == caller };
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

  // Vessel Registry Functions

  public query func getRegistryCount() : async Nat {
    nextVesselId;
  };

  // registerMyVessel: rejects anonymous callers, appends a new vessel to the caller's list.
  public shared ({ caller }) func registerMyVessel(vesselName : Text) : async Bool {
    // Reject anonymous callers
    if (Principal.isAnonymous(caller)) {
      return false;
    };

    let vessel : ShipVessel = {
      id = nextVesselId;
      name = vesselName;
      telemetry = "";
    };

    let userData = switch (principalMap.get(userVessels, caller)) {
      case (null) { { vessels = [vessel]; stcwScore = 0; stcwPassed = false } };
      case (?data) {
        {
          data with
          vessels = Array.append(data.vessels, [vessel]);
        };
      };
    };

    userVessels := principalMap.put(userVessels, caller, userData);
    nextVesselId += 1;
    true;
  };

  // getMyVessels: returns the caller's vessel list, or empty array for anonymous/unknown callers.
  public shared query ({ caller }) func getMyVessels() : async [ShipVessel] {
    switch (principalMap.get(userVessels, caller)) {
      case (null) { [] };
      case (?data) { data.vessels };
    };
  };

  // getPublicDemoShips: always returns hardcoded demo vessels, no auth required.
  public shared query func getPublicDemoShips() : async [ShipVessel] {
    [
      {
        id = 1;
        name = "Demo Alpha";
        telemetry = "";
      },
      {
        id = 2;
        name = "Demo Beta";
        telemetry = "";
      },
    ];
  };

  // submitStcwQuiz: rejects anonymous callers, persists score and passed flag.
  public shared ({ caller }) func submitStcwQuiz(answers : [Nat]) : async { score : Nat; passed : Bool; vesselsUnlocked : Nat } {
    // Reject anonymous callers since this persists data to the caller's record
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous callers cannot submit the STCW quiz");
    };

    let score = Array.foldLeft<Nat, Nat>(answers, 0, func(acc, val) { acc + val });
    let passed = score >= 70;

    let existingData = principalMap.get(userVessels, caller);
    let updatedData : UserShipData = switch (existingData) {
      case (null) {
        {
          vessels = [];
          stcwScore = score;
          stcwPassed = passed;
        };
      };
      case (?data) {
        { data with stcwScore = score; stcwPassed = passed };
      };
    };

    userVessels := principalMap.put(
      userVessels,
      caller,
      updatedData,
    );

    {
      score;
      passed;
      vesselsUnlocked = answers.size();
    };
  };
};
