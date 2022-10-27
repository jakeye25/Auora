from app.models import db, Answer, question
from datetime import datetime, date

now = date.today()



def seed_answers():
    answer01 = Answer(answercotent = "The most dangerous book in the world is : Codex Gigas : The Devil's Bible", userId= 2, questionId =1, createdAt= now, updatedAt= now)
    answer02 = Answer(answercotent = 'Harry Potter and the Order of the Phoenix', userId= 1, questionId =2, answerimage='https://upload.wikimedia.org/wikipedia/en/7/70/Harry_Potter_and_the_Order_of_the_Phoenix.jpg', createdAt= now, updatedAt= now)
    answer03 = Answer(answercotent = 'The fifth novel, Harry Potter and the Order of the Phoenix, is the longest book in the series', userId= 3, questionId =2, createdAt= now, updatedAt= now)
    answer04 = Answer(answercotent = '5 hours', userId= 1, questionId =8, createdAt= now, updatedAt= now)
    answer05 = Answer(answercotent = 'Times are 400 km/80 km/h = 5 hours and 400 km/100 km/h = 4 hours.', userId= 2, questionId =8, createdAt= now, updatedAt= now)
    answer06 = Answer(answercotent = 'Create an online course.', userId= 1, questionId =6, createdAt= now, updatedAt= now)


    db.session.add(answer01)
    db.session.add(answer02)
    db.session.add(answer03)
    db.session.add(answer04)
    db.session.add(answer05)
    db.session.add(answer06)

    db.session.commit()


def undo_answers():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
