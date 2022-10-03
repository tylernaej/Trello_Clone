from flask import Blueprint, request, Response, make_response, jsonify, abort
from app.models import User, db, Workspace, Board, List, Card
from flask_login import current_user, login_user, logout_user, login_required
from app.forms.create_workspace import CreateWorkspace
from datetime import date

workspace_routes = Blueprint('workspaces', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@workspace_routes.route('/')
@login_required
def get_all_workspaces():

    workspaces = Workspace.query.join(Board).all()

    all_workspaces = []

    for workspace in workspaces:
        boards = []
        for board in workspace.boards:
            boards.append(board.to_dict())
        dict_workspace = workspace.to_dict()
        dict_workspace['boards'] = boards
        all_workspaces.append(dict_workspace)

    return {'workspaces': all_workspaces}

@workspace_routes.route('/<int:id>/boards')
@login_required
def get_all_boards_of_workspace(id):

    workspaceQ = Workspace.query.get(id)

    if not workspaceQ:
        return {"message": "Workspace could not be found", "statusCode": 404}, 404

    workspace = workspaceQ.to_dict()

    boardsQ = Board.query.outerjoin(List).outerjoin(Card).filter(Board.workspace_id == id).all()

    boards = []
    for board in boardsQ:
        dict_board = board.to_dict()
        lists = []
        for list in board.lists:
            dict_list = list.to_dict()
            cards = [card.to_dict() for card in list.cards]
            dict_list['cards'] = cards
            lists.append(dict_list)
        dict_board['lists'] = lists
        boards.append(dict_board)

    return {"workspace": workspace, "boards": boards}

@workspace_routes.route('/', methods=['POST'])
@login_required
def create_workspace():

    form = CreateWorkspace()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        workspace = Workspace(
            name = form.name.data,
            workspace_type = form.workspaceType.data,
            description = form.description.data,
            is_archived = form.isArchived.data
        )
        db.session.add(workspace)
        db.session.commit()

        user = User.query.get(form.userId.data)
        workspace.users.append(user)
        db.session.commit()
        

        return workspace.to_dict_with_users_boards()
    
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@workspace_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_workspace(id):

    print(f'\n\n\nHitting backend route!\n\n\n')

    workspaceQ = Workspace.query.get(id)

    if not workspaceQ:
        return {"message": "Workspace could not be found", "statusCode": 404}, 404

    form = CreateWorkspace()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        workspaceQ.name = form.name.data
        workspaceQ.workspace_type = form.workspaceType.data
        workspaceQ.description = form.description.data
        workspaceQ.is_archived = form.isArchived.data

        db.session.commit()

        return workspaceQ.to_dict()
    
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@workspace_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_workspace(id):
    workspaceQ = Workspace.query.get(id)

    if not workspaceQ:
        return {"message": "Workspace could not be found", "statusCode": 404}, 404

    db.session.delete(workspaceQ)
    db.session.commit()

    return {"message": "successfully deleted", "statusCode": 200}

@workspace_routes.route('/current')
@login_required
def get_all_workspaces_by_userId():

    workspacesQ = Workspace.query.outerjoin(Board).all()

    # print(f'\n\nworkspacesQ: {workspacesQ}')

    current_user_workspaces = []
    for workspaceQ in workspacesQ:
        workspace = workspaceQ.to_dict_with_users()
        workspace['boards'] = [board.to_dict() for board in workspaceQ.boards]
        user_ids = [user.to_dict()['id'] for user in workspace['users']]
        users = [user.to_dict() for user in workspace['users']]
        if current_user.id in user_ids:
            del workspace['users']
            workspace['users'] = users
            current_user_workspaces.append(workspace)

    return {'workspaces': current_user_workspaces}

   



