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

ActiveRecord::Schema.define(version: 20170811031944) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

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
    t.integer  "viewing_position", default: 0, null: false
  end

  create_table "memberships", force: :cascade do |t|
    t.integer  "player_id",                   null: false
    t.integer  "game_id",                     null: false
    t.integer  "score",           default: 0, null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "acknowledged_id"
    t.index ["acknowledged_id"], name: "index_memberships_on_acknowledged_id", using: :btree
    t.index ["game_id"], name: "index_memberships_on_game_id", using: :btree
    t.index ["player_id", "game_id"], name: "index_memberships_on_player_id_and_game_id", unique: true, using: :btree
    t.index ["player_id"], name: "index_memberships_on_player_id", using: :btree
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

  create_table "rounds", force: :cascade do |t|
    t.integer  "game_id",     null: false
    t.integer  "czar_id",     null: false
    t.integer  "question_id", null: false
    t.integer  "winner_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["czar_id"], name: "index_rounds_on_czar_id", using: :btree
    t.index ["game_id"], name: "index_rounds_on_game_id", using: :btree
    t.index ["question_id"], name: "index_rounds_on_question_id", using: :btree
    t.index ["winner_id"], name: "index_rounds_on_winner_id", using: :btree
  end

  create_table "submissions", force: :cascade do |t|
    t.integer  "round_id",           null: false
    t.integer  "answer_ordering_id", null: false
    t.integer  "submitter_id",       null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.index ["answer_ordering_id"], name: "index_submissions_on_answer_ordering_id", using: :btree
    t.index ["round_id", "answer_ordering_id"], name: "index_submissions_on_round_id_and_answer_ordering_id", unique: true, using: :btree
    t.index ["round_id"], name: "index_submissions_on_round_id", using: :btree
    t.index ["submitter_id"], name: "index_submissions_on_submitter_id", using: :btree
  end

  add_foreign_key "answer_orderings", "answers"
  add_foreign_key "answer_orderings", "games"
  add_foreign_key "answer_orderings", "memberships"
  add_foreign_key "memberships", "games"
  add_foreign_key "memberships", "players"
  add_foreign_key "memberships", "rounds", column: "acknowledged_id"
  add_foreign_key "question_orderings", "games"
  add_foreign_key "question_orderings", "questions"
  add_foreign_key "rounds", "games"
  add_foreign_key "rounds", "memberships", column: "czar_id"
  add_foreign_key "rounds", "memberships", column: "winner_id"
  add_foreign_key "rounds", "questions"
  add_foreign_key "submissions", "answer_orderings"
  add_foreign_key "submissions", "memberships", column: "submitter_id"
  add_foreign_key "submissions", "rounds"
end
