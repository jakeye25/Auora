from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Question, db
from app.api.auth_routes import validation_errors_to_error_messages
from datetime import datetime

now= datetime.now()

question_routes = Blueprint('questions', __name__)

#get all questions
@question_routes.route('/')
def questions():
    questions = Question.query.all()
    return {'questions': [question.to_dict() for question in questions]}

#get one question
@question_routes.route('/<int:id>')
def question(id):
    question = Question.query.get(id)
    if question is None:
        return {'message': "No such question"}
    return question.to_dict()


#get current user question
@question_routes.route("/current")
@login_required
def currentuser_question():
    currentuserid = current_user.id
    questions = Question.query.filter(question.userId == currentuserid)
    return {'questions': [question.to_dict() for question in questions]}
