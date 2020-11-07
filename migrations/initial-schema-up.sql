create type "entity" as enum ('USER', 'GROUP');
create type "event_type" as enum (
    'ADD_LIST',
    'EDIT_LIST',
    'SHARE_LIST',
    'REMOVE_LIST',
    'LIST_DONE',
    'LIST_UNDONE',
    'ADD_TASK',
    'TASK_DONE',
    'TASK_UNDONE',
    'REMOVE_TASK',
    'INVITE_USER',
    'JOIN_USER',
    'REMOVE_USER',
    'USER_LEAVE',
    'EDIT_PICTURE',
    'EDIT_GROUP_NAME'
    );
create type "notification_type" as enum (
    'ADD_TASK',
    'REMOVE_TASK',
    'TASK_DONE',
    'LIST_COMPLETED',
    'CONGRATULATION'
    );
create type "gender" as enum ('MALE', 'FEMALE', 'OTHER');

create table "user"
(
    "id"                 int generated always as identity,
    "firstName"          text        not null,
    "lastName"           text        not null,
    "gender"             gender      not null,
    "username"           text        not null,
    "email"              text        not null,
    "password"           text        not null,
    "invitationToken"    text,
    "notificationSeenAt" timestamptz not null default now(),
    "createdAt"          timestamptz not null default now(),

    primary key ("id"),
    unique ("username"),
    unique ("email")
);

create table "accessToken"
(
    "id"        int generated always as identity,
    "userId"    int         not null,
    "value"     text        not null,
    "userAgent" text,
    "expiredAt" text,
    "createdAt" timestamptz not null default now(),

    primary key ("id"),
    foreign key ("userId") references "user" ("id") on delete cascade
);

create table "accessTokenBlacklist"
(
    "id" int primary key references "accessToken" ("id")
);

create table "friendRequest"
(
    "id"        int generated always as identity,
    "by"        int         not null,
    "to"        int         not null,
    "createdAt" timestamptz not null default now(),

    primary key ("id"),
    foreign key ("by") references "user" ("id") on delete cascade,
    foreign key ("to") references "user" ("id") on delete cascade,
    unique ("by", "to"),

    check ( "by" != "to" )
);

create table "friend"
(
    "id"        int generated always as identity,
    "userX"     int         not null,
    "userY"     int         not null,
    "createdAt" timestamptz not null default now(),

    primary key ("id"),
    unique ("userX", "userY"),

    check ( "userX" != "userY" )
);

create table "notification"
(
    "id"     int generated always as identity,
    "userId" int               not null,
    "type"   notification_type not null,
    payload  json,

    primary key ("id"),
    foreign key ("userId") references "user" ("id") on delete cascade
);

create index on "notification" ("userId");

create table "list"
(
    "id"          int generated always as identity,
    "creator"     int,
    "entity"      entity      not null,
    "entityId"    int         not null,
    "name"        text        not null,
    "description" text,
    "createdAt"   timestamptz not null default now(),

    primary key ("id"),
    foreign key ("creator") references "user" ("id") on delete set null,

    unique ("entity", "entityId")
);

create table "listAssignee"
(
    "id"     int generated always as identity,
    "userId" int not null,
    "listId" int not null,

    primary key ("id"),
    foreign key ("userId") references "user" ("id") on delete cascade,
    foreign key ("listId") references "list" ("id") on delete cascade,
    unique ("userId", "listId")
);

create table "listFile"
(
    "id"        int generated always as identity,
    "listId"    int         not null,
    "path"      text        not null,
    "createdAt" timestamptz not null default now(),

    primary key ("id")
);

create index on "listFile" ("listId");

create table "sharedList"
(
    "id"       int generated always as identity,
    "listId"   int    not null,
    "entity"   entity not null,
    "entityId" int    not null,

    primary key ("id"),
    foreign key ("listId") references "list" ("id") on delete cascade,
    unique ("entity", "entityId")
);

create index on "sharedList" ("listId");

create table "listSubscription"
(
    "id"     int generated always as identity,
    "listId" int not null,
    "userId" int not null,

    primary key ("id"),
    foreign key ("listId") references "list" ("id") on delete cascade,
    foreign key ("userId") references "user" ("id") on delete cascade,
    unique ("listId", "userId")
);

create table "task"
(
    "id"           int generated always as identity,
    "listId"       int         not null,
    "name"         text        not null,
    "scheduledFor" timestamptz,
    "deadline"     timestamptz,
    "done"         timestamptz,
    "createdAt"    timestamptz not null default now(),

    primary key ("id"),
    foreign key ("listId") references "list" ("id") on delete cascade
);

create index on "task" ("listId");

create table "group"
(
    "id"        int generated always as identity,
    "creator"   int,
    "name"      text        not null,
    "createdAt" timestamptz not null default now(),

    primary key ("id"),
    foreign key ("creator") references "user" ("id") on delete set null
);

create table "picture"
(
    "id"       int generated always as identity,
    "path"     text   not null,
    "entity"   entity not null,
    "entityId" int    not null,

    primary key ("id"),
    unique ("entity", "entityId")
);

create table "groupUser"
(
    "id"      int generated always as identity,
    "groupId" int not null,
    "userId"  int not null,
    "isAdmin" boolean default false,

    primary key ("id"),
    foreign key ("groupId") references "group" ("id") on delete cascade,
    foreign key ("userId") references "user" ("id") on delete cascade,
    unique ("groupId", "userId")
);

create table "invitation"
(
    "id"      int generated always as identity,
    "by"      int,
    "groupId" int not null,
    "userId"  int not null,

    primary key ("id"),
    foreign key ("groupId") references "group" ("id") on delete cascade,
    foreign key ("userId") references "user" ("id") on delete cascade,
    foreign key ("by") references "user" ("id") on delete set null,
    unique ("groupId", "userId")
);

create table "eventLog"
(
    "id"        int generated always as identity,
    "actor"     int         not null,
    "groupId"   int         not null,
    "event"     event_type  not null,
    "payload"   json,
    "createdAt" timestamptz not null default now(),

    primary key ("id"),
    foreign key ("actor") references "user" ("id") on delete cascade,
    foreign key ("groupId") references "group" ("id") on delete cascade
);