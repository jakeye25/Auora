from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Answer, db
from app.api.auth_routes import validation_errors_to_error_messages
from datetime import datetime

now= datetime.now()

answer_routes = Blueprint('answers', __name__)

#get all answers
@answer_routes.route('/')
def answers():
    answers = Answer.query.all()
    return {'answers': [answer.to_dict() for answer in answers]}

#get one answer
@answer_routes.route('/<int:id>')
def answer(id):
    answer = Answer.query.get(id)
    if answer is None:
        return {'message': "No such answer"}
    return answer.to_dict()


#get current user question
@answer_routes.route("/current")
@login_required
def currentuser_answer():
    currentuserid = current_user.id
    answers = Answer.query.filter(answer.userId == currentuserid)
    return {'answers': [answer.to_dict() for answer in answers]}
