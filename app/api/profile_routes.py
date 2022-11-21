from flask import Blueprint, jsonify, session, request
from app.models import db, User
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from datetime import datetime
from app.forms import SignUpForm

now= datetime.now()

profile_routes = Blueprint('profiles', __name__)

@profile_routes.route('/<int:id>')
def profile(id):
    profile = User.query.get(id)
    if profile is None:
        return {'message': "No such profile"}
    return profile.to_dict()


#update profile
@profile_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def update_profile(id):
    # print(id)
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    edit_profile = User.query.get(id)
    # print(edit_product)
    if edit_profile is None:
        return {"errors" : "Profile couldn't be found"}, 404
    if edit_profile.id != current_user.id:
        return {"errors" : "You don't have the right to edit the profile"}, 403

    if form.validate_on_submit():
        edit_profile = User.query.get(id)
        edit_profile.username = form.data['username']
        edit_profile.avatar = form.data['avatar']
        # edit_product.userId = current_user.id
        # edit_product.createdAt = now,
        edit_profile.updatedAt = now
        # db.session.add(edit_product)
        db.session.commit()
        return edit_profile.to_dict()
    return {"errors" : validation_errors_to_error_messages(form.errors)}, 400
