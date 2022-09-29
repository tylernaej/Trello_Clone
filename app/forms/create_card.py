from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, DateField, validators
from wtforms.validators import DataRequired, Optional, Email, ValidationError, NumberRange


#validations

def title_length(form, field):
    name = field.data
    if len(name) > 100:
        raise ValidationError('Name must be less than 100 characters')

def description_length(form, field):
    description = field.data
    if len(description) > 1000:
        raise ValidationError('Description must be less than 1000 characters')

#form

class CreateCard(FlaskForm):
    listId = IntegerField("Board Id", validators=[DataRequired()])
    title = StringField("Title", validators=[DataRequired(), title_length])
    coverColor = StringField("Cover Color", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired(), description_length])
    startDate = DateField("Start Date", format='%Y/%m/%d', validators=[Optional()])
    dueDate = DateField("Due Date", format='%Y/%m/%d', validators=[Optional()])
    isArchived = BooleanField("Is Archived")