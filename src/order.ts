enum Role {
  Seller = 1,
  Buyer,
  System,
  Council
}

enum Status {
  OrderCreated = 1,
  WorkInProgress,
  CanceledByBuyer,
  CanceledBySeller,
  WaitOrRefund,
  WorkDelivered,
  RequestedRevision,
  DisputeResolution,
  Refunded,
  RefundedWithRating,
  Completed,
  CompletedWithRating,
  RequestedRefund
}


const stateTransitions = {
  [Status.OrderCreated]: {
    to: [
      [Status.WorkInProgress, Role.Seller],
      [Status.CanceledByBuyer, Role.System],
      [Status.CanceledBySeller, Role.Seller]
    ]
  },
  [Status.WorkInProgress]: {
    to: [
      [Status.WaitOrRefund, Role.System],
      [Status.WorkDelivered, Role.Seller]
    ]
  },
  [Status.CanceledByBuyer]: {
    to: []
  },
  [Status.CanceledBySeller]: {
    to: []
  },
  [Status.WaitOrRefund]: {
    to: [
      [Status.WorkDelivered, Role.Seller],
      [Status.RefundedWithRating, Role.Buyer]
    ]
  },
  [Status.WorkDelivered]: {
    to: [
      [Status.RequestedRevision, Role.Buyer],
      [Status.RequestedRefund, Role.Buyer],
      [Status.CompletedWithRating, Role.Buyer]
    ]
  },
  [Status.RequestedRevision]: {
    to: [
      [Status.WorkInProgress, Role.Seller],
      [Status.DisputeResolution, Role.Seller],
      [Status.Refunded, Role.System]
    ]
  },
  [Status.DisputeResolution]: {
    to: [
      [Status.RefundedWithRating, Role.Council],
      [Status.Refunded, Role.Council],
      [Status.Completed, Role.Council],
      [Status.CompletedWithRating, Role.Council]
    ]
  },
  [Status.Refunded]: {
    to: []
  },
  [Status.RefundedWithRating]: {
    to: []
  },
  [Status.Completed]: {
    to: []
  },
  [Status.CompletedWithRating]: {
    to: []
  },
  [Status.RequestedRefund]: {
    to: [
      [Status.Refunded, Role.Seller],
      [Status.DisputeResolution, Role.Seller]
    ]
  }
};

function isTransitionAllowed(from: Status, to: Status, by: Role): boolean {
  const transitions = stateTransitions[from].to;
  
  for (const transition of transitions) {
    const [nextStatus, allowedRole] = transition;
    if (nextStatus === to && allowedRole === by) {
      return true;
    }
  }
  
  return false;
}
