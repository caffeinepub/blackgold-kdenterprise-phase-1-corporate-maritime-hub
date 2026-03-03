import OrderedMap "mo:base/OrderedMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";

module {
  type OldActor = {
    userFavorites : OrderedMap.Map<Principal, [Text]>;
  };

  type NewActor = {
    userFavorites : OrderedMap.Map<Principal, [Text]>;
  };

  public func run(old : OldActor) : NewActor {
    let principalMap = OrderedMap.Make<Principal>(Principal.compare);
    let userFavorites = principalMap.map<[Text], [Text]>(
      old.userFavorites,
      func(_p, oldFavorites) {
        oldFavorites;
      },
    );
    { userFavorites };
  };
};

