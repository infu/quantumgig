import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface ManualReply {
  'data' : Array<Array<string>>,
  'columns' : Array<string>,
}
export interface _SERVICE {
  'get_categories' : ActorMethod<[], ManualReply>,
  'get_category_services' : ActorMethod<[bigint], ManualReply>,
  'get_message' : ActorMethod<[], string>,
  'get_order' : ActorMethod<[bigint], ManualReply>,
  'get_service' : ActorMethod<[bigint], ManualReply>,
  'get_stats_orders' : ActorMethod<[], ManualReply>,
  'get_stats_services' : ActorMethod<[], ManualReply>,
  'get_stats_users' : ActorMethod<[], ManualReply>,
  'get_top_providers' : ActorMethod<[], ManualReply>,
  'get_top_services' : ActorMethod<[], ManualReply>,
  'get_user_info' : ActorMethod<[bigint], ManualReply>,
  'get_user_services' : ActorMethod<[bigint], ManualReply>,
  'search_services' : ActorMethod<[string], ManualReply>,
  'set_message' : ActorMethod<[string], undefined>,
}
