import Time "mo:base/Time";
import OrderedMap "mo:base/OrderedMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Debug "mo:base/Debug";

module {

  // User record definition
  public type User = {
    id : Nat;
    name : Text;
    email : Text;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  // State definition for users subsystem
  public type State = {
    nextId : Nat;
    users : OrderedMap.Map<Nat, User>;
  };

  // Initialize the state for users subsystem
  public func init(_now : Time.Time) : State {
    let natMap = OrderedMap.Make<Nat>(func(a : Nat, b : Nat) { if (a < b) { #less } else if (a == b) { #equal } else { #greater } });
    {
      nextId = 1;
      users = natMap.empty<User>();
    };
  };

  // Helper to get the next available ID
  public func getNextId(state : State) : (Nat, State) {
    let id = state.nextId;
    (id, { state with nextId = id + 1 });
  };

  // Create a new user
  public func createUser(state : State, name : Text, email : Text, now : Time.Time) : (State, User) {
    let (id, newState) = getNextId(state);
    let user = {
      id;
      name;
      email;
      createdAt = now;
      updatedAt = now;
    };

    let natMap = OrderedMap.Make<Nat>(func(a : Nat, b : Nat) { if (a < b) { #less } else if (a == b) { #equal } else { #greater } });
    let updatedUsers = natMap.put(newState.users, id, user);

    ({ newState with users = updatedUsers }, user);
  };

  // Get total user count
  public func getTotalUserCount(state : State) : Nat {
    let natMap = OrderedMap.Make<Nat>(func(a : Nat, b : Nat) { if (a < b) { #less } else if (a == b) { #equal } else { #greater } });
    natMap.size(state.users);
  };

  // Get all users
  public func getAllUsers(state : State) : [User] {
    let natMap = OrderedMap.Make<Nat>(func(a : Nat, b : Nat) { if (a < b) { #less } else if (a == b) { #equal } else { #greater } });
    Iter.toArray(natMap.vals(state.users));
  };

  // Find user by ID
  public func findUserById(state : State, id : Nat) : User {
    let natMap = OrderedMap.Make<Nat>(func(a : Nat, b : Nat) { if (a < b) { #less } else if (a == b) { #equal } else { #greater } });

    switch (natMap.get(state.users, id)) {
      case (null) { Debug.trap("User not found") };
      case (?user) { user };
    };
  };
};

