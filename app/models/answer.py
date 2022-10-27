from .db import db
from sqlalchemy.types  import DateTime, Date

class Answer(db.Model):
    __tablename__ = 'answers'

    id = db.Column(db.Integer, primary_key=True)
    answercontent = db.Column(db.String(1000), nullable=False)
    questionId = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    answerimage = db.Column(db.String(1000))
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    user = db.relationship('User', back_populates='answers')
    question = db.relationship('Question', back_populates='answers')


    def to_dict(self):
        return {
            'id': self.id,
            'answercontent': self.answercontent,
            'questionId':self.questionId,
            'userId':self.userId,
            'answerimage':self.answerimage,
            'createdAt':self.createdAt,
            'updatedAt':self.updatedAt,
            'username': self.user.username if self.user else None,
            'avatar': self.user.avatar if self.user else None
        }
