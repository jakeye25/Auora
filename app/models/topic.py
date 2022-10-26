from .db import db
from sqlalchemy.types  import DateTime, Date

class Topic(db.Model):
    __tablename__ = 'topics'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    topicimage = db.Column(db.String(1000), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    question = db.relationship('Question', back_populates='topics')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'topicimage ':self.topicimage ,
            'createdAt':self.createdAt,
            'updatedAt':self.updatedAt,
        }
