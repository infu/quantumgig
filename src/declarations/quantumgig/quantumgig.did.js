export const idlFactory = ({ IDL }) => {
  const ManualReply = IDL.Record({
    'data' : IDL.Vec(IDL.Vec(IDL.Text)),
    'columns' : IDL.Vec(IDL.Text),
  });
  return IDL.Service({
    'get_categories' : IDL.Func([], [ManualReply], []),
    'get_category_services' : IDL.Func([IDL.Nat], [ManualReply], []),
    'get_message' : IDL.Func([], [IDL.Text], ['query']),
    'get_order' : IDL.Func([IDL.Nat], [ManualReply], []),
    'get_service' : IDL.Func([IDL.Nat], [ManualReply], []),
    'get_stats_orders' : IDL.Func([], [ManualReply], []),
    'get_stats_services' : IDL.Func([], [ManualReply], []),
    'get_stats_users' : IDL.Func([], [ManualReply], []),
    'get_top_providers' : IDL.Func([], [ManualReply], []),
    'get_top_services' : IDL.Func([], [ManualReply], []),
    'get_user_info' : IDL.Func([IDL.Nat], [ManualReply], []),
    'get_user_services' : IDL.Func([IDL.Nat], [ManualReply], []),
    'search_services' : IDL.Func([IDL.Text], [ManualReply], []),
    'set_message' : IDL.Func([IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
