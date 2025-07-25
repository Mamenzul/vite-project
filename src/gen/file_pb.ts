// @generated by protoc-gen-es v2.6.0 with parameter "target=ts,import_extension=js"
// @generated from file file.proto (package lobby, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv2";
import { file_buf_validate_validate } from "./buf/validate/validate_pb.js";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file file.proto.
 */
export const file_file: GenFile = /*@__PURE__*/
  fileDesc("CgpmaWxlLnByb3RvEgVsb2JieSJXCgpQbGF5ZXJJbmZvEhoKCXBsYXllcl9pZBgBIAEoCUIHukgEcgIQARIcCgtwbGF5ZXJfbmFtZRgCIAEoCUIHukgEcgIQARIPCgdpc19ob3N0GAMgASgIImQKC1BpbmdSZXF1ZXN0EhgKB3Jvb21faWQYASABKAlCB7pIBHICEAESGgoJcGxheWVyX2lkGAIgASgJQge6SARyAhABEh8KF2NsaWVudF90aW1lX3VuaXhfbWlsbGlzGAMgASgDIj8KDFBpbmdSZXNwb25zZRIRCglwbGF5ZXJfaWQYASABKAkSHAoUU2VydmVyVGltZVVuaXhNaWxsaXMYAiABKAMiTQoRQ3JlYXRlUm9vbVJlcXVlc3QSGgoJcGxheWVyX2lkGAEgASgJQge6SARyAhABEhwKC3BsYXllcl9uYW1lGAIgASgJQge6SARyAhABIkcKEkNyZWF0ZVJvb21SZXNwb25zZRIPCgdyb29tX2lkGAEgASgJEg8KB3N1Y2Nlc3MYAiABKAgSDwoHbWVzc2FnZRgDIAEoCSJlCg9Kb2luUm9vbVJlcXVlc3QSGAoHcm9vbV9pZBgBIAEoCUIHukgEcgIQARIaCglwbGF5ZXJfaWQYAiABKAlCB7pIBHICEAESHAoLcGxheWVyX25hbWUYAyABKAlCB7pIBHICEAEiNAoQSm9pblJvb21SZXNwb25zZRIPCgdzdWNjZXNzGAEgASgIEg8KB21lc3NhZ2UYAiABKAkiSAoQTGVhdmVSb29tUmVxdWVzdBIYCgdyb29tX2lkGAEgASgJQge6SARyAhABEhoKCXBsYXllcl9pZBgCIAEoCUIHukgEcgIQASI1ChFMZWF2ZVJvb21SZXNwb25zZRIPCgdzdWNjZXNzGAEgASgIEg8KB21lc3NhZ2UYAiABKAkiLgoSTGlzdE1lbWJlcnNSZXF1ZXN0EhgKB3Jvb21faWQYASABKAlCB7pIBHICEAEiOQoTTGlzdE1lbWJlcnNSZXNwb25zZRIiCgdwbGF5ZXJzGAEgAygLMhEubG9iYnkuUGxheWVySW5mbyJqChhQbGF5ZXJTZW50TWVzc2FnZVJlcXVlc3QSGAoHcm9vbV9pZBgBIAEoCUIHukgEcgIQARIaCglwbGF5ZXJfaWQYAiABKAlCB7pIBHICEAESGAoHbWVzc2FnZRgDIAEoCUIHukgEcgIQASI9ChlQbGF5ZXJTZW50TWVzc2FnZVJlc3BvbnNlEg8KB3N1Y2Nlc3MYASABKAgSDwoHbWVzc2FnZRgCIAEoCSJnChVQbGF5ZXJKb2luZWRCcm9hZGNhc3QSGAoHcm9vbV9pZBgBIAEoCUIHukgEcgIQARIhCgZwbGF5ZXIYAiABKAsyES5sb2JieS5QbGF5ZXJJbmZvEhEKCXRpbWVzdGFtcBgDIAEoAyJlChNQbGF5ZXJMZWZ0QnJvYWRjYXN0EhgKB3Jvb21faWQYASABKAlCB7pIBHICEAESIQoGcGxheWVyGAIgASgLMhEubG9iYnkuUGxheWVySW5mbxIRCgl0aW1lc3RhbXAYAyABKAMigAEKFENoYXRNZXNzYWdlQnJvYWRjYXN0EhgKB3Jvb21faWQYASABKAlCB7pIBHICEAESIQoGcGxheWVyGAIgASgLMhEubG9iYnkuUGxheWVySW5mbxIYCgdtZXNzYWdlGAMgASgJQge6SARyAhABEhEKCXRpbWVzdGFtcBgEIAEoAyIsChBSb29tRXZlbnRSZXF1ZXN0EhgKB3Jvb21faWQYASABKAlCB7pIBHICEAEiaAoNUGluZ0Jyb2FkY2FzdBIPCgdyb29tX2lkGAEgASgJEhEKCXBsYXllcl9pZBgCIAEoCRISCgpsYXRlbmN5X21zGAMgASgDEh8KF3NlcnZlcl90aW1lX3VuaXhfbWlsbGlzGAQgASgDIu0BCglSb29tRXZlbnQSNQoNcGxheWVyX2pvaW5lZBgBIAEoCzIcLmxvYmJ5LlBsYXllckpvaW5lZEJyb2FkY2FzdEgAEjEKC3BsYXllcl9sZWZ0GAIgASgLMhoubG9iYnkuUGxheWVyTGVmdEJyb2FkY2FzdEgAEj0KFmNoYXRfbWVzc2FnZV9icm9hZGNhc3QYAyABKAsyGy5sb2JieS5DaGF0TWVzc2FnZUJyb2FkY2FzdEgAEi4KDnBpbmdfYnJvYWRjYXN0GGMgASgLMhQubG9iYnkuUGluZ0Jyb2FkY2FzdEgAQgcKBWV2ZW50MpYDCgtSb29tU2VydmljZRIvCgRQaW5nEhIubG9iYnkuUGluZ1JlcXVlc3QaEy5sb2JieS5QaW5nUmVzcG9uc2USQQoKQ3JlYXRlUm9vbRIYLmxvYmJ5LkNyZWF0ZVJvb21SZXF1ZXN0GhkubG9iYnkuQ3JlYXRlUm9vbVJlc3BvbnNlEjsKCEpvaW5Sb29tEhYubG9iYnkuSm9pblJvb21SZXF1ZXN0GhcubG9iYnkuSm9pblJvb21SZXNwb25zZRI+CglMZWF2ZVJvb20SFy5sb2JieS5MZWF2ZVJvb21SZXF1ZXN0GhgubG9iYnkuTGVhdmVSb29tUmVzcG9uc2USRAoLTGlzdE1lbWJlcnMSGS5sb2JieS5MaXN0TWVtYmVyc1JlcXVlc3QaGi5sb2JieS5MaXN0TWVtYmVyc1Jlc3BvbnNlElAKC1NlbmRNZXNzYWdlEh8ubG9iYnkuUGxheWVyU2VudE1lc3NhZ2VSZXF1ZXN0GiAubG9iYnkuUGxheWVyU2VudE1lc3NhZ2VSZXNwb25zZTJQCg1Sb29tQnJvYWRjYXN0Ej8KEFN0cmVhbVJvb21FdmVudHMSFy5sb2JieS5Sb29tRXZlbnRSZXF1ZXN0GhAubG9iYnkuUm9vbUV2ZW50MAFCGFoWZ28tY29ubmVjdC9nZW47bG9iYnlwYmIGcHJvdG8z", [file_buf_validate_validate]);

/**
 * Player info
 *
 * @generated from message lobby.PlayerInfo
 */
export type PlayerInfo = Message<"lobby.PlayerInfo"> & {
  /**
   * @generated from field: string player_id = 1;
   */
  playerId: string;

  /**
   * @generated from field: string player_name = 2;
   */
  playerName: string;

  /**
   * @generated from field: bool is_host = 3;
   */
  isHost: boolean;
};

/**
 * Describes the message lobby.PlayerInfo.
 * Use `create(PlayerInfoSchema)` to create a new message.
 */
export const PlayerInfoSchema: GenMessage<PlayerInfo> = /*@__PURE__*/
  messageDesc(file_file, 0);

/**
 * @generated from message lobby.PingRequest
 */
export type PingRequest = Message<"lobby.PingRequest"> & {
  /**
   * @generated from field: string room_id = 1;
   */
  roomId: string;

  /**
   * @generated from field: string player_id = 2;
   */
  playerId: string;

  /**
   * @generated from field: int64 client_time_unix_millis = 3;
   */
  clientTimeUnixMillis: bigint;
};

/**
 * Describes the message lobby.PingRequest.
 * Use `create(PingRequestSchema)` to create a new message.
 */
export const PingRequestSchema: GenMessage<PingRequest> = /*@__PURE__*/
  messageDesc(file_file, 1);

/**
 * @generated from message lobby.PingResponse
 */
export type PingResponse = Message<"lobby.PingResponse"> & {
  /**
   * @generated from field: string player_id = 1;
   */
  playerId: string;

  /**
   * @generated from field: int64 ServerTimeUnixMillis = 2;
   */
  ServerTimeUnixMillis: bigint;
};

/**
 * Describes the message lobby.PingResponse.
 * Use `create(PingResponseSchema)` to create a new message.
 */
export const PingResponseSchema: GenMessage<PingResponse> = /*@__PURE__*/
  messageDesc(file_file, 2);

/**
 * Create room
 *
 * @generated from message lobby.CreateRoomRequest
 */
export type CreateRoomRequest = Message<"lobby.CreateRoomRequest"> & {
  /**
   * @generated from field: string player_id = 1;
   */
  playerId: string;

  /**
   * @generated from field: string player_name = 2;
   */
  playerName: string;
};

/**
 * Describes the message lobby.CreateRoomRequest.
 * Use `create(CreateRoomRequestSchema)` to create a new message.
 */
export const CreateRoomRequestSchema: GenMessage<CreateRoomRequest> = /*@__PURE__*/
  messageDesc(file_file, 3);

/**
 * @generated from message lobby.CreateRoomResponse
 */
export type CreateRoomResponse = Message<"lobby.CreateRoomResponse"> & {
  /**
   * @generated from field: string room_id = 1;
   */
  roomId: string;

  /**
   * @generated from field: bool success = 2;
   */
  success: boolean;

  /**
   * @generated from field: string message = 3;
   */
  message: string;
};

/**
 * Describes the message lobby.CreateRoomResponse.
 * Use `create(CreateRoomResponseSchema)` to create a new message.
 */
export const CreateRoomResponseSchema: GenMessage<CreateRoomResponse> = /*@__PURE__*/
  messageDesc(file_file, 4);

/**
 * Join room
 *
 * @generated from message lobby.JoinRoomRequest
 */
export type JoinRoomRequest = Message<"lobby.JoinRoomRequest"> & {
  /**
   * @generated from field: string room_id = 1;
   */
  roomId: string;

  /**
   * @generated from field: string player_id = 2;
   */
  playerId: string;

  /**
   * @generated from field: string player_name = 3;
   */
  playerName: string;
};

/**
 * Describes the message lobby.JoinRoomRequest.
 * Use `create(JoinRoomRequestSchema)` to create a new message.
 */
export const JoinRoomRequestSchema: GenMessage<JoinRoomRequest> = /*@__PURE__*/
  messageDesc(file_file, 5);

/**
 * @generated from message lobby.JoinRoomResponse
 */
export type JoinRoomResponse = Message<"lobby.JoinRoomResponse"> & {
  /**
   * @generated from field: bool success = 1;
   */
  success: boolean;

  /**
   * @generated from field: string message = 2;
   */
  message: string;
};

/**
 * Describes the message lobby.JoinRoomResponse.
 * Use `create(JoinRoomResponseSchema)` to create a new message.
 */
export const JoinRoomResponseSchema: GenMessage<JoinRoomResponse> = /*@__PURE__*/
  messageDesc(file_file, 6);

/**
 * Leave room
 *
 * @generated from message lobby.LeaveRoomRequest
 */
export type LeaveRoomRequest = Message<"lobby.LeaveRoomRequest"> & {
  /**
   * @generated from field: string room_id = 1;
   */
  roomId: string;

  /**
   * @generated from field: string player_id = 2;
   */
  playerId: string;
};

/**
 * Describes the message lobby.LeaveRoomRequest.
 * Use `create(LeaveRoomRequestSchema)` to create a new message.
 */
export const LeaveRoomRequestSchema: GenMessage<LeaveRoomRequest> = /*@__PURE__*/
  messageDesc(file_file, 7);

/**
 * @generated from message lobby.LeaveRoomResponse
 */
export type LeaveRoomResponse = Message<"lobby.LeaveRoomResponse"> & {
  /**
   * @generated from field: bool success = 1;
   */
  success: boolean;

  /**
   * @generated from field: string message = 2;
   */
  message: string;
};

/**
 * Describes the message lobby.LeaveRoomResponse.
 * Use `create(LeaveRoomResponseSchema)` to create a new message.
 */
export const LeaveRoomResponseSchema: GenMessage<LeaveRoomResponse> = /*@__PURE__*/
  messageDesc(file_file, 8);

/**
 * List members
 *
 * @generated from message lobby.ListMembersRequest
 */
export type ListMembersRequest = Message<"lobby.ListMembersRequest"> & {
  /**
   * @generated from field: string room_id = 1;
   */
  roomId: string;
};

/**
 * Describes the message lobby.ListMembersRequest.
 * Use `create(ListMembersRequestSchema)` to create a new message.
 */
export const ListMembersRequestSchema: GenMessage<ListMembersRequest> = /*@__PURE__*/
  messageDesc(file_file, 9);

/**
 * @generated from message lobby.ListMembersResponse
 */
export type ListMembersResponse = Message<"lobby.ListMembersResponse"> & {
  /**
   * @generated from field: repeated lobby.PlayerInfo players = 1;
   */
  players: PlayerInfo[];
};

/**
 * Describes the message lobby.ListMembersResponse.
 * Use `create(ListMembersResponseSchema)` to create a new message.
 */
export const ListMembersResponseSchema: GenMessage<ListMembersResponse> = /*@__PURE__*/
  messageDesc(file_file, 10);

/**
 * Player sent message
 *
 * @generated from message lobby.PlayerSentMessageRequest
 */
export type PlayerSentMessageRequest = Message<"lobby.PlayerSentMessageRequest"> & {
  /**
   * @generated from field: string room_id = 1;
   */
  roomId: string;

  /**
   * @generated from field: string player_id = 2;
   */
  playerId: string;

  /**
   * @generated from field: string message = 3;
   */
  message: string;
};

/**
 * Describes the message lobby.PlayerSentMessageRequest.
 * Use `create(PlayerSentMessageRequestSchema)` to create a new message.
 */
export const PlayerSentMessageRequestSchema: GenMessage<PlayerSentMessageRequest> = /*@__PURE__*/
  messageDesc(file_file, 11);

/**
 * @generated from message lobby.PlayerSentMessageResponse
 */
export type PlayerSentMessageResponse = Message<"lobby.PlayerSentMessageResponse"> & {
  /**
   * @generated from field: bool success = 1;
   */
  success: boolean;

  /**
   * @generated from field: string message = 2;
   */
  message: string;
};

/**
 * Describes the message lobby.PlayerSentMessageResponse.
 * Use `create(PlayerSentMessageResponseSchema)` to create a new message.
 */
export const PlayerSentMessageResponseSchema: GenMessage<PlayerSentMessageResponse> = /*@__PURE__*/
  messageDesc(file_file, 12);

/**
 * Broadcast events
 *
 * @generated from message lobby.PlayerJoinedBroadcast
 */
export type PlayerJoinedBroadcast = Message<"lobby.PlayerJoinedBroadcast"> & {
  /**
   * @generated from field: string room_id = 1;
   */
  roomId: string;

  /**
   * @generated from field: lobby.PlayerInfo player = 2;
   */
  player?: PlayerInfo;

  /**
   * @generated from field: int64 timestamp = 3;
   */
  timestamp: bigint;
};

/**
 * Describes the message lobby.PlayerJoinedBroadcast.
 * Use `create(PlayerJoinedBroadcastSchema)` to create a new message.
 */
export const PlayerJoinedBroadcastSchema: GenMessage<PlayerJoinedBroadcast> = /*@__PURE__*/
  messageDesc(file_file, 13);

/**
 * @generated from message lobby.PlayerLeftBroadcast
 */
export type PlayerLeftBroadcast = Message<"lobby.PlayerLeftBroadcast"> & {
  /**
   * @generated from field: string room_id = 1;
   */
  roomId: string;

  /**
   * @generated from field: lobby.PlayerInfo player = 2;
   */
  player?: PlayerInfo;

  /**
   * @generated from field: int64 timestamp = 3;
   */
  timestamp: bigint;
};

/**
 * Describes the message lobby.PlayerLeftBroadcast.
 * Use `create(PlayerLeftBroadcastSchema)` to create a new message.
 */
export const PlayerLeftBroadcastSchema: GenMessage<PlayerLeftBroadcast> = /*@__PURE__*/
  messageDesc(file_file, 14);

/**
 * @generated from message lobby.ChatMessageBroadcast
 */
export type ChatMessageBroadcast = Message<"lobby.ChatMessageBroadcast"> & {
  /**
   * @generated from field: string room_id = 1;
   */
  roomId: string;

  /**
   * @generated from field: lobby.PlayerInfo player = 2;
   */
  player?: PlayerInfo;

  /**
   * @generated from field: string message = 3;
   */
  message: string;

  /**
   * @generated from field: int64 timestamp = 4;
   */
  timestamp: bigint;
};

/**
 * Describes the message lobby.ChatMessageBroadcast.
 * Use `create(ChatMessageBroadcastSchema)` to create a new message.
 */
export const ChatMessageBroadcastSchema: GenMessage<ChatMessageBroadcast> = /*@__PURE__*/
  messageDesc(file_file, 15);

/**
 * @generated from message lobby.RoomEventRequest
 */
export type RoomEventRequest = Message<"lobby.RoomEventRequest"> & {
  /**
   * @generated from field: string room_id = 1;
   */
  roomId: string;
};

/**
 * Describes the message lobby.RoomEventRequest.
 * Use `create(RoomEventRequestSchema)` to create a new message.
 */
export const RoomEventRequestSchema: GenMessage<RoomEventRequest> = /*@__PURE__*/
  messageDesc(file_file, 16);

/**
 * @generated from message lobby.PingBroadcast
 */
export type PingBroadcast = Message<"lobby.PingBroadcast"> & {
  /**
   * @generated from field: string room_id = 1;
   */
  roomId: string;

  /**
   * @generated from field: string player_id = 2;
   */
  playerId: string;

  /**
   * @generated from field: int64 latency_ms = 3;
   */
  latencyMs: bigint;

  /**
   * @generated from field: int64 server_time_unix_millis = 4;
   */
  serverTimeUnixMillis: bigint;
};

/**
 * Describes the message lobby.PingBroadcast.
 * Use `create(PingBroadcastSchema)` to create a new message.
 */
export const PingBroadcastSchema: GenMessage<PingBroadcast> = /*@__PURE__*/
  messageDesc(file_file, 17);

/**
 * @generated from message lobby.RoomEvent
 */
export type RoomEvent = Message<"lobby.RoomEvent"> & {
  /**
   * @generated from oneof lobby.RoomEvent.event
   */
  event: {
    /**
     * @generated from field: lobby.PlayerJoinedBroadcast player_joined = 1;
     */
    value: PlayerJoinedBroadcast;
    case: "playerJoined";
  } | {
    /**
     * @generated from field: lobby.PlayerLeftBroadcast player_left = 2;
     */
    value: PlayerLeftBroadcast;
    case: "playerLeft";
  } | {
    /**
     * @generated from field: lobby.ChatMessageBroadcast chat_message_broadcast = 3;
     */
    value: ChatMessageBroadcast;
    case: "chatMessageBroadcast";
  } | {
    /**
     * @generated from field: lobby.PingBroadcast ping_broadcast = 99;
     */
    value: PingBroadcast;
    case: "pingBroadcast";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message lobby.RoomEvent.
 * Use `create(RoomEventSchema)` to create a new message.
 */
export const RoomEventSchema: GenMessage<RoomEvent> = /*@__PURE__*/
  messageDesc(file_file, 18);

/**
 * Service for room management
 *
 * @generated from service lobby.RoomService
 */
export const RoomService: GenService<{
  /**
   * @generated from rpc lobby.RoomService.Ping
   */
  ping: {
    methodKind: "unary";
    input: typeof PingRequestSchema;
    output: typeof PingResponseSchema;
  },
  /**
   * @generated from rpc lobby.RoomService.CreateRoom
   */
  createRoom: {
    methodKind: "unary";
    input: typeof CreateRoomRequestSchema;
    output: typeof CreateRoomResponseSchema;
  },
  /**
   * @generated from rpc lobby.RoomService.JoinRoom
   */
  joinRoom: {
    methodKind: "unary";
    input: typeof JoinRoomRequestSchema;
    output: typeof JoinRoomResponseSchema;
  },
  /**
   * @generated from rpc lobby.RoomService.LeaveRoom
   */
  leaveRoom: {
    methodKind: "unary";
    input: typeof LeaveRoomRequestSchema;
    output: typeof LeaveRoomResponseSchema;
  },
  /**
   * @generated from rpc lobby.RoomService.ListMembers
   */
  listMembers: {
    methodKind: "unary";
    input: typeof ListMembersRequestSchema;
    output: typeof ListMembersResponseSchema;
  },
  /**
   * @generated from rpc lobby.RoomService.SendMessage
   */
  sendMessage: {
    methodKind: "unary";
    input: typeof PlayerSentMessageRequestSchema;
    output: typeof PlayerSentMessageResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_file, 0);

/**
 * Service for streaming room events
 *
 * @generated from service lobby.RoomBroadcast
 */
export const RoomBroadcast: GenService<{
  /**
   * @generated from rpc lobby.RoomBroadcast.StreamRoomEvents
   */
  streamRoomEvents: {
    methodKind: "server_streaming";
    input: typeof RoomEventRequestSchema;
    output: typeof RoomEventSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_file, 1);

