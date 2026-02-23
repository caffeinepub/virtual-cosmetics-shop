import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

module {
  type UserState = {
    balance : Nat;
    inventory : [Nat];
  };

  public func run(old : { users : Map.Map<Principal, UserState> }) : { users : Map.Map<Principal, UserState> } {
    { users = old.users };
  };
};
