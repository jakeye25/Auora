from app.models import db, Topic

def seed_topics():
    food = Topic(name='Food', topicimage='https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg')
    tech = Topic(name='Technology', topicimage='https://www.nato.int/nato_static_fl2014/assets/pictures/images_mfu/2022/7/stock/technology_rdax_775x440s.jpg')
    travel = Topic(name='Travel', topicimage='https://hips.hearstapps.com/hmg-prod/images/where-to-travel-in-2022-1640200544.jpg')
    book = Topic(name='Books', topicimage='https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg')
    movie = Topic(name='Movies', topicimage='https://s3-us-west-2.amazonaws.com/prd-rteditorial/wp-content/uploads/2018/03/13153742/RT_300EssentialMovies_700X250.jpg')


    db.session.add(food)
    db.session.add(tech)
    db.session.add(travel)
    db.session.add(book)
    db.session.add(movie)

    db.session.commit()


def undo_topics():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
