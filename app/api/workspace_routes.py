from flask import Blueprint, request, Response, make_response, jsonify, abort
from app.models import User, db, Workspace, Board, List, Card
from flask_login import current_user, login_user, logout_user, login_required

workspace_routes = Blueprint('workspaces', __name__)

@workspace_routes.route('/')
@login_required
def get_all_workspaces():

    workspaces = Workspace.query.join(Board).all()

    print(workspaces)

    workspaceKey = {}

    for workspace in workspaces:
        boards = []
        for board in workspace.boards:
            boards.append(board.to_dict())
        dict_workspace = workspace.to_dict()
        dict_workspace['boards'] = boards
        workspaceKey[f'{workspace.name}'] = dict_workspace

    return {'workspaces': workspaceKey}

@workspace_routes.route('/<int:id>/boards')
@login_required
def get_all_boards_of_workspace(id):

    workspace = Workspace.query.get(id)

    if not workspace:
        return {"message": "Workspace could not be found", "statusCode": 404}, 404

    boardsQuery = Board.query.join(List).join(Card).filter(Board.workspace_id == id).all()

    boards = []
    for board in boardsQuery:
        dict_board = board.to_dict()
        for list in board.lists:
            lists = []
            dict_list = list.to_dict()
            for card in list.cards:
                cards = []
                cards.append(card.to_dict())
            dict_list['cards'] = cards
            lists.append(dict_list)
        dict_board['lists'] = lists
        boards.append(dict_board)
            

    return {"boards": boards}