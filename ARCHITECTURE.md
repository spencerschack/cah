game
  memberships
    player
  rounds
    czar
    winner
    submissions
      answer_ordering


Game
====
----
create: authenticated
show: anyone

Answer
======
text: text

Question
========
text: text

AnswerOrdering
==============
answer: Answer
game: Game
player: Player
position: integer
pile: enum('draw', 'discard')

QuestionOrdering
================
question: Question
game: Game
position: integer
pile: enum('draw', 'discard')

Player
======
name: string
token: string(32)
-----------------
create: guest
current: authenticated

Membership
==========
player: Player
game: Game
acknowledged: boolean
-------------------
update: self.player

Round
=====
game: Game
question: Question
czar: Membership
winner: Membership
------------------
update: czar

Submission
==========
round: Round
answer_ordering: AnswerOrdering
submitter: Membership
---------------------
create: self.submitter.player
