from flask import Blueprint, request, Response, make_response, jsonify, abort
from app.models import User, db, Workspace, Board, List, Card
from flask_login import current_user, login_user, logout_user, login_required
from app.forms.create_board import CreateBoard

board_routes = Blueprint('boards', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@board_routes.route('/')
@login_required
def get_all_boards():

    return "Route doesn't exist"

@board_routes.route('/<int:id>')
@login_required
def get_board_by_id(id):

    boardQ = Board.query.get(id)

    if not boardQ:
        return {"message": "Board could not be found", "statusCode": 404}, 404

    board = boardQ.to_dict()

    listsQ = List.query.filter(List.board_id == id)
    lists = []

    for list in listsQ:
        cardsQ = Card.query.filter(Card.list_id == list.id)
        cards = [card.to_dict() for card in cardsQ]
        dict_list = list.to_dict()
        dict_list['cards'] = cards
        lists.append(dict_list)

    board['lists'] = lists

    return {"board": board}

@board_routes.route('/', methods=['POST'])
@login_required
def create_board():

    form = CreateBoard()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        board = Board(
            workspace_id = form.workspaceId.data,
            title = form.title.data,
            background_color = form.backgroundColor.data,
            visibility = form.visibility.data,
            is_archived = form.isArchived.data
        )
        db.session.add(board)
        db.session.commit()

        return board.to_dict()
    
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@board_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_board(id):

    boardQ = Board.query.get(id)

    if not boardQ:
        return {"message": "Board could not be found", "statusCode": 404}, 404

    form = CreateBoard()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        boardQ.workspace_id = form.workspaceId.data
        boardQ.title = form.title.data
        boardQ.background_color = form.backgroundColor.data
        boardQ.visibility = form.visibility.data
        boardQ.is_archived = form.isArchived.data

        db.session.commit()

        return boardQ.to_dict()
    
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@board_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_board(id):
    boardQ = Board.query.get(id)

    if not boardQ:
        return {"message": "Board could not be found", "statusCode": 404}, 404

    db.session.delete(boardQ)
    db.session.commit()

    return {"message": "successfully deleted", "statusCode": 200}
