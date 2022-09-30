from flask import Blueprint, request, Response, make_response, jsonify, abort
from app.models import User, db, Workspace, Board, List, Card
from flask_login import current_user, login_user, logout_user, login_required
from app.forms.create_list import CreateList

list_routes = Blueprint('lists', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@list_routes.route('/', methods=['POST'])
@login_required
def create_list():

    form = CreateList()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        list = List(
            board_id = form.boardId.data,
            title = form.title.data,
            is_archived = form.isArchived.data
        )
        db.session.add(list)
        db.session.commit()

        return list.to_dict()
    
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@list_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_list(id):

    listQ = List.query.get(id)

    if not listQ:
        return {"message": "List could not be found", "statusCode": 404}, 404

    form = CreateList()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        listQ.board_id = form.boardId.data
        listQ.title = form.title.data
        listQ.is_archived = form.isArchived.data

        db.session.commit()

        return listQ.to_dict()
    
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@list_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_list(id):
    listQ = List.query.get(id)

    if not listQ:
        return {"message": "List could not be found", "statusCode": 404}, 404

    db.session.delete(listQ)
    db.session.commit()

    return {"message": "successfully deleted", "statusCode": 200}
