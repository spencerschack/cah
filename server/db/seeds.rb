def open_file name
  File.read(File.expand_path("../seeds/#{name}.txt", __FILE__)).split("\n")
end

answers = open_file('answers')
questions = open_file('questions')

answers.each do |answer|
  Answer.create(text: answer)
end

questions.each do |question|
  pick = [question.count('_'), 1].max
  Question.create(text: question, pick: pick)
end
