from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange


#validations

def description_length(form, field):
    description = field.data
    if len(description) > 500:
        raise ValidationError('Description must be less than 500 characters')

def name_length(form, field):
    name = field.data
    if len(name) > 100:
        raise ValidationError('Name must be less than 100 characters')

#form

class CreateWorkspace(FlaskForm):
    userId = IntegerField("User Id", validators=[DataRequired()])
    name = StringField("Name", validators=[DataRequired(), name_length])
    workspaceType = StringField("Workspace Type", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired(), description_length])
    isArchived = BooleanField("Is Archived")