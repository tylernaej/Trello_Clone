from flask import Blueprint, request, Response, make_response, jsonify, abort
from app.models import User, db, Workspace, Board, List, Card
from flask_login import current_user, login_user, logout_user, login_required
from app.forms.create_card import CreateCard

card_routes = Blueprint('cards', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@card_routes.route('/', methods=['POST'])
@login_required
def create_card():

    print(f'\n\nIn route\n\n')

    print(request.data)

    form = CreateCard()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        card = Card(
            list_id = form.listId.data,
            title = form.title.data,
            cover_color = form.coverColor.data,
            description = form.description.data,
            start_date = form.startDate.data,
            due_date = form.dueDate.data,
            is_archived = form.isArchived.data
        )
        db.session.add(card)
        db.session.commit()

        return card.to_dict()
    
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@card_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_card(id):

    cardQ = Card.query.get(id)

    if not cardQ:
        return {"message": "Card could not be found", "statusCode": 404}, 404

    form = CreateCard()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        cardQ.list_id = form.listId.data
        cardQ.title = form.title.data
        cardQ.cover_color = form.coverColor.data
        cardQ.description = form.description.data
        cardQ.start_date = form.startDate.data
        cardQ.due_date = form.dueDate.data
        cardQ.is_archived = form.isArchived.data

        db.session.commit()

        return cardQ.to_dict()
    
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@card_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_card(id):
    cardQ = Card.query.get(id)

    if not cardQ:
        return {"message": "Card could not be found", "statusCode": 404}, 404

    db.session.delete(cardQ)
    db.session.commit()

    return {"message": "successfully deleted", "statusCode": 200}
