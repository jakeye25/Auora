from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Question, db, question
from app.api.auth_routes import validation_errors_to_error_messages
from datetime import datetime

now= datetime.now()

question_routes = Blueprint('questions', __name__)

#get all questions
