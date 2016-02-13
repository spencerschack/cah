# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160128174015) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answer_memberships", force: :cascade do |t|
    t.integer  "answer_id",     null: false
    t.integer  "membership_id", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["answer_id"], name: "index_answer_memberships_on_answer_id", using: :btree
    t.index ["membership_id"], name: "index_answer_memberships_on_membership_id", using: :btree
  end

# Could not dump table "answer_orderings" because of following StandardError
#   Unknown type 'pile' for column 'pile'

  create_table "answers", force: :cascade do |t|
    t.text     "text",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["text"], name: "index_answers_on_text", unique: true, using: :btree
  end

  create_table "games", force: :cascade do |t|
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.integer  "membership_id"
    t.integer  "viewing_position", default: 0, null: false
    t.index ["membership_id"], name: "index_games_on_membership_id", using: :btree
  end

  create_table "memberships", force: :cascade do |t|
    t.integer  "player_id",                    null: false
    t.integer  "game_id",                      null: false
    t.integer  "score",            default: 0, null: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.integer  "first_answer_id"
    t.integer  "second_answer_id"
    t.integer  "third_answer_id"
    t.index ["first_answer_id"], name: "index_memberships_on_first_answer_id", using: :btree
    t.index ["game_id"], name: "index_memberships_on_game_id", using: :btree
    t.index ["player_id", "game_id"], name: "index_memberships_on_player_id_and_game_id", unique: true, using: :btree
    t.index ["player_id"], name: "index_memberships_on_player_id", using: :btree
    t.index ["second_answer_id"], name: "index_memberships_on_second_answer_id", using: :btree
    t.index ["third_answer_id"], name: "index_memberships_on_third_answer_id", using: :btree
  end

  create_table "players", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

# Could not dump table "question_orderings" because of following StandardError
#   Unknown type 'pile' for column 'pile'

  create_table "questions", force: :cascade do |t|
    t.text     "text",                   null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "pick",       default: 1, null: false
    t.index ["text"], name: "index_questions_on_text", unique: true, using: :btree
  end

  add_foreign_key "answer_memberships", "answers"
  add_foreign_key "answer_memberships", "memberships"
  add_foreign_key "answer_orderings", "answers"
  add_foreign_key "answer_orderings", "games"
  add_foreign_key "games", "memberships"
  add_foreign_key "memberships", "answers", column: "first_answer_id"
  add_foreign_key "memberships", "answers", column: "second_answer_id"
  add_foreign_key "memberships", "answers", column: "third_answer_id"
  add_foreign_key "memberships", "games"
  add_foreign_key "memberships", "players"
  add_foreign_key "question_orderings", "games"
  add_foreign_key "question_orderings", "questions"
end
