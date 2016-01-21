Game
====
czar: Player

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

Membership
==========
player: Player
game: Game
score: integer

AnswerMembership
=============
answer: Answer
membership: Membership
