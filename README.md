## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index unique true|
|email|string|null: false, add_index unique true|
|password|string|null: false, add_index unique true|
|group_id|integer|null: false, foreign_key :true|
|message_id|integer|null: false, foreign_key :true|

### Association
- has_many :groups_users
- has_many :users_messages
- has_many :groups, through: :groups_users
- has_many :messages, through: :users_messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, add_index unique true|
|user_id|integer|null: false, foreign_key :true|
|message_id|integer|null: false, foreign_key :true|

### Association
- has_many :groups_users
- has_many :messages_groups
- has_many :users, through: :groups_users
- has_many :messages, through: :messages_groups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|add_index|
|image|string|
|group_id|integer|null: false, foreign_key :true|
|user_id|integer|null: false, foreign_key :true|

### Association
- has_many :users_messages
- has_many :messages_groups
- has_many :users, through: :users_messages
- has_many :groups, through: :messages_groups

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## users_messagesテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :message
- belongs_to :user

## messages_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :message
- belongs_to :group