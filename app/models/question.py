from .db import db
from sqlalchemy.types  import DateTime, Date

class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    questioncotent = db.Column(db.String(1000), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    topicId = db.Column(db.Integer, db.ForeignKey('topics.id'), nullable=False)
    questionimage = db.Column(db.String(1000))
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    answers = db.relationship('Answer', back_populates='question', cascade = 'all, delete')
    topic = db.relationship('Topic', back_populates='questions')
    user = db.relationship('User', back_populates='questions')



    def to_dict(self):
        return {
            'id': self.id,
            'questioncotent': self.questioncotent,
            'userId':self.userId,
            'topicId':self.topicId,
            'questionimage':self.questionimage,
            'createdAt':self.createdAt,
            'updatedAt':self.updatedAt,
            'answers': [answer.to_dict() for answer in self.answers],
            'username': self.user.username if self.user else None,
            'avatar': self.user.avatar if self.user else None
        }
