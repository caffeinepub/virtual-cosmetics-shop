import Timer "mo:core/Timer";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Balance = Nat;
  type ItemId = Nat;

  type UserState = {
    balance : Balance;
    inventory : [ItemId];
  };

  type Item = {
    id : ItemId;
    name : Text;
    price : Balance;
  };

  type Category = {
    id : Nat;
    name : Text;
  };

  let itemPrice = 10;
  let defaultBalance = 100;

  func initializeCosmeticItems() : Map.Map<Nat, Item> {
    let items = Map.empty<Nat, Item>();
    let descriptions = [
      "Finger Painter", "AA Badge", "Illustrator Badge", "Forest Guide", "Stick",
      "Banana", "Monocle", "Top Hat", "Cowboy Hat", "Crown",
      "VR Headset", "GT-@2@3m Reels", "Witch Hat", "GT1 Plushie", "Mini Banana",
      "Gorilla Eyes", "Bowtie", "Wizard Hat", "GT1 Spray Can", "Pineapple",
      "Golden Gorilla", "Flower Crown", "Ice Cream", "Mini Top Hat", "Tiny Stick",
      "Beanie", "Pirate Hat", "Rubber Duck", "Butterfly Glasses", "GT2 Flag",
      "Sun Hat", "Bowler Hat", "MTF Eyepatch", "Rainbow Scarf", "GT2 Sunglasses",
      "Pirate Patch", "GT3 Hat", "Small Banana", "Wizard Staff", "Tiny Banana",
      "GT3 Cap", "Mini Top Hat II", "Tiny Bowtie", "The One Crown", "GT3 Ring",
      "Magician's Hat", "Mini Pineapple", "Tiny Monocle", "GT3 Badge", "Small Stick"
    ];
    let prices = [
      30, 50, 80, 120, 200,
      15, 60, 30, 30, 120,
      40, 70, 80, 50, 15,
      20, 35, 80, 70, 50,
      30, 120, 40, 30, 30,
      10, 60, 40, 20, 20,
      30, 30, 60, 30, 20,
      30, 40, 20, 80, 15,
      20, 25, 30, 50, 10,
      90, 40, 20, 30, 30
    ];

    for (i in Nat.range(0, 50)) {
      let newItem : Item = {
        id = i;
        name = descriptions[i];
        price = prices[i];
      };
      items.add(i, newItem);
    };

    items;
  };

  let users = Map.empty<Principal, UserState>();
  let categories = Map.empty<Nat, Category>();
  let items = initializeCosmeticItems();

  public shared ({ caller }) func initializeUser() : async () {
    if (users.containsKey(caller)) { Runtime.trap("User already exists") };
    users.add(caller, { balance = defaultBalance; inventory = [] });
  };

  public query ({ caller }) func getBalance() : async Balance {
    switch (users.get(caller)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?userState) { userState.balance };
    };
  };

  public query func getAvailableItems() : async [Item] {
    items.values().toArray();
  };

  public query ({ caller }) func getOwnedItems() : async [ItemId] {
    switch (users.get(caller)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?userState) { userState.inventory };
    };
  };

  public shared ({ caller }) func purchaseItem(itemId : ItemId) : async () {
    let userState = switch (users.get(caller)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?userState) { userState };
    };

    let item = switch (items.get(itemId)) {
      case (null) { Runtime.trap("Item does not exist") };
      case (?item) { item };
    };

    if (userState.balance < item.price) {
      Runtime.trap("Insufficient balance");
    };

    let updatedBalance = userState.balance - item.price;
    let updatedInventory = userState.inventory.concat([itemId]);

    users.add(caller, { balance = updatedBalance; inventory = updatedInventory });
  };

  public shared ({ caller }) func adminGrantFunds(code : Nat) : async () {
    if (code == 2807) {
      users.add(
        caller,
        {
          balance = 50_000_000;
          inventory = [];
        },
      );
    };
  };

  func periodicIncome() : async () {
    for ((principal, userState) in users.entries()) {
      users.add(principal, { balance = userState.balance + defaultBalance; inventory = userState.inventory });
    };
  };

  public query ({ caller }) func getItem(itemId : ItemId) : async ?Item {
    items.get(itemId);
  };

  public query func getCategories() : async [Category] {
    categories.values().toArray();
  };

  public query ({ caller }) func getUserInventory() : async [ItemId] {
    switch (users.get(caller)) {
      case (null) { [] };
      case (?userState) { userState.inventory };
    };
  };

  do {
    ignore Timer.recurringTimer<system>(
      #seconds 600,
      periodicIncome
    );
  };
};
