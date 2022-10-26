from app.models import db, Topic

def seed_topics():
    food = Topic(name='Food', topicimage='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png')
    tech = Topic(name='Technology', topicimage='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png')
    travel = Topic(name='Travel', topicimage='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png')
    book = Topic(name='Books', topicimage='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png')
    movie = Topic(name='Movies', topicimage='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png')


    db.session.add(food)
    db.session.add(tech)
    db.session.add(travel)
    db.session.add(book)
    db.session.add(movie)

    db.session.commit()


def undo_topics():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
