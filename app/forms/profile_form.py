from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Optional
from app.models import User



def imageURL_validation(form, field):
    img = field.data
    if not img[-3:] == 'jpg' and (not img[-3:] == 'png') and img[-4:] != 'jpeg' and img[-4:] != 'webp' and img[-3:] != 'gif' and img[-3:] != 'svg':

        raise ValidationError("Input must be a valid Image Url.")


class ProfileForm(FlaskForm):

    avatar = StringField('avatar', validators=[Optional() ,imageURL_validation])
