from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from app.models import Question
from wtforms.validators import DataRequired, Email, ValidationError, Optional

def imageURL_validation(form, field):
    img = field.data
    if not img[-3:] == 'jpg' and (not img[-3:] == 'png') and img[-4:] != 'jpeg' and img[-4:] != 'webp' and img[-3:] != 'gif' and img[-3:] != 'svg':

        raise ValidationError("Input must be a valid Image Url")

class AnswerForm(FlaskForm):
    answercontent = StringField("Answer Content", validators= [DataRequired()])
    answerimage = StringField("Image URL", validators= [Optional() , imageURL_validation])
