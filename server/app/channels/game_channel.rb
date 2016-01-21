# Be sure to restart your server when you modify this file. Action Cable runs in an EventMachine loop that does not support auto reloading.
class GameChannel < ApplicationCable::Channel

  def subscribed
    game = find_game
    stream_for game
    transmit_json game, include: Game::FULL_INCLUDES
  end

  def submit data
    game = find_game
    membership = game.memberships.find{|m| m.player == current_player}
    answers = Answer.find(data['ids'][0..2])
    if !membership.first_answer && game.question.pick == answers.length
      Game.transaction do
        membership.update!(
          first_answer: answers.first,
          second_answer: answers.second,
          third_answer: answers.third)
        membership.answer_memberships.where(answer: answers).destroy_all
        membership.draw_up!
      end
      transmit_json game, include: 'answers'
      self.class.answer_submitted(membership)
    end
  end

  def pick data
    game = find_game
    membership = game.memberships.find{|m| m.player == current_player}
    id = data['id'].to_i
    picked_membership = game.memberships.find{|m| m.id == id}
    if membership.current?
      if game.memberships.select{|m| m.first_answer.nil?} == [membership]
        Game.transaction do
          picked_membership.increment :score
          picked_membership.save!
          game.memberships.each do |m|
            m.update!(first_answer: nil, second_answer: nil, third_answer: nil)
          end
          game.question_orderings.pull
          game.membership = game.memberships.where('id > ?', game.membership_id).first || game.memberships.first
          game.save!
        end
        self.class.game_changed game
      end
    end
  end

  def self.game_changed game
    broadcast_json game, game, include: 'memberships,question'
  end

  def self.membership_created membership
    membership_changed membership
  end

  def self.answer_submitted membership
    membership_changed membership
  end

  private

  def find_game
    Game.find(params[:id])
  end

  def self.membership_changed membership
    broadcast_json membership.game, membership,
      include: 'player,first_answer,second_answer,third_answer'
  end
  
end
