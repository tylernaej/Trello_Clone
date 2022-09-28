from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange


#validations

def title_length(form, field):
    name = field.data
    if len(name) > 100:
        raise ValidationError('Name must be less than 100 characters')

#form

class CreateList(FlaskForm):
    boardId = IntegerField("Board Id", validators=[DataRequired()])
    title = StringField("Title", validators=[DataRequired(), title_length])
    isArchived = BooleanField("Is Archived")