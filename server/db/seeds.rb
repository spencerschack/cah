ActiveRecord::Base.transaction do
  json = JSON.parse(Pathname("../seeds/cards.json").expand_path(__FILE__).read)
  json['whiteCards'].each do |text|
    Answer.create!(text: text)
  end
  json['blackCards'].each do |card|
    Question.create!(card)
  end
end
