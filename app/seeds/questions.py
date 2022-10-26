from app.models import db, Question

def seed_questions():
    question01 = Question(questioncotent='What is the most dangerous book in the world?', userId = 1, topicId = 4)
    question02 = Question(questioncotent='What is the longest Harry Potter book?', userId = 2, topicId = 4, questionimage='https://m.media-amazon.com/images/I/61H1Vt5PpyL._AC_SY350_.jpg')
    question03 = Question(questioncotent='What is one food that only Germans eat?', userId = 3, topicId = 1)
    question04 = Question(questioncotent='What is the best restaurant in Las Vegas?', userId = 4, topicId = 1, questionimage='https://media.timeout.com/images/105491872/image.jpg')
    question05 = Question(questioncotent='When did you start feeling "old" in the tech industry?', userId = 1, topicId = 2)
    question06 = Question(questioncotent='What is the easiest way to make money online?', userId = 5, topicId = 2, questionimage = 'https://i0.wp.com/calmatters.org/wp-content/uploads/2022/03/California-technology.jpg')
    question07 = Question(questioncotent='What is it like to live in a small town in Australia?', userId = 1, topicId = 3)
    question08 = Question(questioncotent='How long will your trip take in hours if you travel 400 km at an average speed of 80 km/h?', userId = 6, topicId = 3)
    question09 = Question(questioncotent='Was an actor ever fired for reasons other than their acting talent?', userId = 7, topicId = 5)
    question10 = Question(questioncotent='Where can I download a movie?', userId = 8, topicId = 5)


    db.session.add(question01)
    db.session.add(question02)
    db.session.add(question03)
    db.session.add(question04)
    db.session.add(question05)
    db.session.add(question06)
    db.session.add(question07)
    db.session.add(question08)
    db.session.add(question09)
    db.session.add(question10)

    db.session.commit()


def undo_questions():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
