Tag.create(name: "blaster master")
Tag.create(name: "punch-out")
Tag.create(name: "castlevania")
Tag.create(name: "simon's quest")
Tag.create(name: "castlevania 3")
Tag.create(name: "duck hunt")
Tag.create(name: "metroid")
Tag.create(name: "kid icarus")
Tag.create(name: "the legend of zelda")
Tag.create(name: "mega man")
Tag.create(name: "mega man 2")
Tag.create(name: "mega man 3")
Tag.create(name: "bubble bobble")
Tag.create(name: "super mario bros")
Tag.create(name: "super mario bros 2")
Tag.create(name: "super mario bros 3")
Tag.create(name: "baseball stars")
Tag.create(name: "crystalis")
Tag.create(name: "contra")
Tag.create(name: "double dragon")
Tag.create(name: "ninja gaiden")
Tag.create(name: "duck tales")
Tag.create(name: "dragon warrior")
Tag.create(name: "dr. mario")
Tag.create(name: "batman")
Tag.create(name: "paperboy")
Tag.create(name: "tecmo super bowl")
Tag.create(name: "blades of steel")
Tag.create(name: "final fantasy")
Tag.create(name: "star tropics")
Tag.create(name: "ghosts 'n goblins")
Tag.create(name: "marble madness")
Tag.create(name: "tetris")
Tag.create(name: "teenage mutant ninja turtles")
Tag.create(name: "little nemo")



jerry_hicks = User.create!(username: "Jerry Hicks", password: "password", email: "", backup_image: "JerryHicks.png", profile: "Became Game Counselor: May, 1990\nHobbies: Playing Video Games, Music, Horseback Riding, Computers\nFavorite Game: Crystalis")
matt_alderman = User.create!(username: "Matt Alderman", password: "password", email: "", backup_image: "MattAlderman.png", profile: "Became Game Counselor: Feb, 1990\nHobbies: Martial Arts, Sports, Drawing, Video Games\nBest Accomplishment: Finished Little Nemo\nFavorite Game: Mega Man")
roger_harrison = User.create!(username: "Roger Harrison", password: "password", email: "", backup_image: "RogerHarrison.png", profile: "Became Game Counselor: May, 1990\nHobbies: Baseball, Basketball, Fishing, Reading\nBest Accomplishment: Finished Blaster Master without losing a life\nFavorite Game: Baseball Stars")
brian_downey = User.create!(username: "Brian Downey", password: "password", email: "", backup_image: "BrianDowney.png", profile: "Became Game Counselor: May, 1990\nHobbies: Reading, Snacking, Movies\nBest Accomplishment: Finished Mega Man 3 with one man\nFavorite Game: Castlevania 3")
brian_anderson = User.create!(username: "Brian Anderson", password: "password", email: "", backup_image: "BrianAnderson.png", profile: "Became Game Counselor: Jan, 1989\nHobbies: Drawing, Water Skiing, Playing Soccer, Listening to Van Halen, Tossin' Frisbees\nBest Accomplishment: I've mastered over 250 games\nFavorite Game: Castlevania 3")
caesar_filori = User.create!(username: "Caesar Filori", password: "password", email: "", backup_image: "CaesarFilori.png", profile: "Became Game Counselor: Sept, 1989\nHobbies: Music, Beating other counselors in Baseball Stars, Playing Australian Rules Football\nBest Accomplishment: Completed Contra in 15 minutes, in one life, with the Power Glove\nFavorite Game: Mega Man 3")
rick = User.create!(username: "Rick", password: "password", email: "", backup_image: "HeadsetHarry.png", profile: "Became Game Counselor: April, 1989\nHobbies: Computers, Video Games, Watching Football\nBest Accomplishment: Helped a young video game 'wizard' win Videogame Armageddon\nFavorite Game: Simon's Quest")
radical_randy = User.create!(username: "Radical Randy", password: "password", email: "", backup_image: "RadicalRandy.png", profile: "Hey dudes, my name is Randy and I've been an avid gamer for years.\nIf you're after some righteous tips you've come to the numero uno tip meister!")


demo_user = User.create!(username: "Demo User", password: "password", email: "", backup_image: "MegaMan.png", profile: "Demo User's profile -- Feel free to edit me!")
chris = User.create!(username: "Chris", password: "password", email: "lawrence.c.evans@gmail.com", profile: "I wrote this app!")
dan = User.create!(username: "Dan", password: "password", email: "djquan@gmail.com")
steve = User.create!(username: "Steve", password: "password", email: "stevenjli@gmail.com")

jerry_hicks.tags = [Tag.find_by_name("crystalis"), Tag.find_by_name("baseball stars"), Tag.find_by_name("paperboy")]
jerry_hicks.save
matt_alderman.tags = [Tag.find_by_name("mega man"), Tag.find_by_name("little nemo"), Tag.find_by_name("baseball stars")]
matt_alderman.save
roger_harrison.tags = [Tag.find_by_name("blaster master"), Tag.find_by_name("baseball stars"), Tag.find_by_name("duck tales")]
roger_harrison.save
brian_downey.tags = [Tag.find_by_name("mega man 3"), Tag.find_by_name("castlevania 3"), Tag.find_by_name("teenage mutant ninja turtles")]
brian_downey.save
brian_anderson.tags = [Tag.find_by_name("castlevania 3"), Tag.find_by_name("batman"), Tag.find_by_name("marble madness")]
brian_anderson.save
caesar_filori.tags = [Tag.find_by_name("baseball stars"), Tag.find_by_name("contra"), Tag.find_by_name("ghosts 'n goblins")]
caesar_filori.save
rick.tags = [Tag.find_by_name("simon's quest"), Tag.find_by_name("double dragon"), Tag.find_by_name("mega man 2")]
rick.save
radical_randy.tags = Tag.all
radical_randy.save
chris.tags = [Tag.find_by_name("mega man 2"), Tag.find_by_name("duck tales"), Tag.find_by_name("castlevania 3"), Tag.find_by_name("punch-out"), Tag.find_by_name("tecmo super bowl")]
chris.save

q1 = Question.create(author_id: dan.id, title: "Can I jump over the flagpole?", body: "I heard a rumor on the playground that you could jump over the flagpole but I can't figure out how. Help, please!" )
q1.tags = [Tag.find_by_name("super mario bros")]
q1.save
q2 = Question.create(author_id: steve.id, title: "How do I beat Bald Bull?", body: "His Bull Charge always knocks me out..." )
q2.tags = [Tag.find_by_name("punch-out")]
q2.save
q3 = Question.create(author_id: chris.id, title: "How do you beat the dam level?", body: "I keep running out of time before I can disarm all the bombs." )
q3.tags = [Tag.find_by_name("teenage mutant ninja turtles")]
q3.save
q8 = Question.create(author_id: steve.id, title: "Which Mega Man game should I get?", body: "My parents said I could only get one for my birthday but I can't decide which one to get, help!" )
q8.tags = [Tag.find_by_name("mega man"), Tag.find_by_name("mega man 2"), Tag.find_by_name("mega man 3")]
q8.save
q5 = Question.create(author_id: steve.id, title: "Is it even possible to beat Ninja Gaiden?", body: "I mean seriously, WTF!" )
q5.tags = [Tag.find_by_name("ninja gaiden")]
q5.save
q6 = Question.create(author_id: dan.id, title: "How can I stop Bo Jackson?", body: "Bo Jackson is OP..." )
q6.tags = [Tag.find_by_name("tecmo super bowl")]
q6.save
q7 = Question.create(author_id: chris.id, title: "How do I get the Master Sword?", body: "I read about it in the game manual but I can't find it anywhere." )
q7.tags = [Tag.find_by_name("the legend of zelda")]
q7.save
q4 = Question.create(author_id: dan.id, title: "How do I get past the lava pit in Heat Man's stage?", body: "I get that you are supposed to jump on the blocks but it seems too hard... there must be an easier way!" )
q4.tags = [Tag.find_by_name("mega man 2")]
q4.save
q9 = Question.create(author_id: dan.id, title: "How am I supposed to beat Contra with only 5 lives?", body: "I rented it last weekend but couldn't even get past the second level!" )
q9.tags = [Tag.find_by_name("contra")]
q9.save
q10 = Question.create(author_id: chris.id, title: "Where do I find the Ice Beam?", body: "My friend says it is really useful but I can't find it." )
q10.tags = [Tag.find_by_name("metroid")]
q10.save

# Question 1
a1 = Answer.create(author_id: jerry_hicks.id, question_id: q1.id, body: "It seems there is no shortage to the rumors about jumping the flagpole but none of our counselors have managed to achieve this feat. I'd therefore say you're outta luck dude!")
a2 = Answer.create(author_id: radical_randy.id, question_id: q1.id, body: "Don't despair yet duderino! My friend once pulled it off while we were lounging at Casa de Randy. He caused a glitch in the game which caused a turtle to like float in the sky, man. And then he took this mondo jump and that's all she wrote!\n\nCan't give you any more details than that, bud... my memory is hazy")
c1 = Comment.create(author_id: jerry_hicks.id, commentable_id: a2.id, commentable_type: "Answer", body: "Randy, we've talked to you about this before: Pro Hotline is not the place for unsubstantiated rumors!")

# Question 2
a3 = Answer.create(author_id: matt_alderman.id, question_id: q2.id, body: "Bald Bull can be tough but he can be beat. If you time your punch just right during his Bull Charge, you can knock him out with one blow!\n\nKeep at it and you'll get the timing down!")
c2 = Comment.create(author_id: dan.id, commentable_id: q2.id, commentable_type: "Question", body: "Is Bald Bull the guy with the crown? EDIT: Nvm, that is King Hippo. They are both bald...")
q2.best_answer_id = a3.id
q2.save

# Question 3
a3 = Answer.create(author_id: caesar_filori.id, question_id: q3.id, body: "The dam level? Piece of cake. I beat it on one man using the power glove")
c3 = Comment.create(author_id: jerry_hicks.id, commentable_id: a3.id, commentable_type: "Answer", body: "Caesar, remember we are here to help")
a4 = Answer.create(author_id: jerry_hicks.id, question_id: q3.id, body: "This level can be tough--10 bombs and only 4 turtles! Keep at it and you can do it man!")

# Question 4
a5 = Answer.create(author_id: matt_alderman.id, question_id: q4.id, body: "Your best bet is to beat Air Man first to get Item 2. With Item 2 you can simply fly over the lava pit.")
q4.best_answer_id = a5.id
q4.save
c4 = Comment.create(author_id: dan.id, commentable_id: a5.id, commentable_type: "Answer", body: "Awesome, thanks!")

# Question 5
a6 = Answer.create(author_id: matt_alderman.id, question_id: q5.id, body: "I've got bad news for you son, I've mastered 250 games but Ninja Gaiden ain't one.")
c5 = Comment.create(author_id: chris.id, commentable_id: q5.id, commentable_type: "Question", body: "I am also curious")

# Question 6
a7 = Answer.create(author_id: roger_harrison.id, question_id: q6.id, body: "Rumor has it that Bo knows how to take down Bo. For us mere mortals I suggest you play against another team!")

# Question 7
a8 = Answer.create(author_id: brian_downey.id, question_id: q7.id, body: "Leave no gravestone unturned...")
c7 = Comment.create(author_id: chris.id, commentable_id: a8.id, commentable_type: "Answer", body: "I found the old man but he doesn't give me the sword...")

# Question 8
a9 = Answer.create(author_id: brian_downey.id, question_id: q8.id, body: "This is gonna start a debate!\n\nMy favorite is Mega Man 3, which boasts the latest and greatest Mega Man weaponry. And who doesn't love Mega Man's adorable pooch Rush?")
c8 = Comment.create(author_id: radical_randy.id, commentable_id: a9.id, commentable_type: "Answer", body: "If you are looking for the latest and greatest, scope out Mega Man 4, amigo!")
sleep 1
c9 = Comment.create(author_id: brian_downey.id, commentable_id: a9.id, commentable_type: "Answer", body: "Really Randy, you and your rumors. Sometimes I think we need to monitor comments more harshly")
a10 = Answer.create(author_id: matt_alderman.id, question_id: q8.id, body: "I'd recommend the original Mega Man. It's the one that started them all and you can't go wrong with a classic!")

# Question 9
a11 = Answer.create(author_id: caesar_filori.id, question_id: q9.id, body: "5 lives is 4 more than it took me. But if you can't handle the difficulty you can always input the Konami code:\n\n\nup, up, down, down, left, right, left, right, B, A, start.\n\n\n But why take away the challenge?")
c10 = Comment.create(author_id: jerry_hicks.id, commentable_id: a11.id, commentable_type: "Answer", body: "Caesar...")

# Question 10
a12 = Answer.create(author_id: brian_anderson.id, question_id: q10.id, body: "You need to first get the bombs, then bomb a hole in the floor and drop through the sand to a secret room")
c11 = Comment.create(author_id: chris.id, commentable_id: a12.id, commentable_type: "Answer", body: "Could you be more specific?")


