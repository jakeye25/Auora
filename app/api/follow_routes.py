from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import  db, User, follows
from app.api.auth_routes import validation_errors_to_error_messages


follow_routes = Blueprint('follows', __name__)

@follow_routes.route('/users/<int:id>', methods=['PUT'])
@login_required
def follow_unfollow_user(id):

    user = User.query.get(id)
    if user is None:
        return {'message': "No such user"}

    if current_user not in user.followers:
        user.followers.append(current_user)
        db.session.commit()
    else:
        user.followers.remove(current_user)
        db.session.commit()

    return {'user': user.to_dict()}
