from flask import Blueprint, request, Response, make_response, jsonify, abort
from app.models import User, db, Workspace, Board, List, Card
from flask_login import current_user, login_user, logout_user, login_required

board_routes = Blueprint('boards', __name__)

@board_routes.route('/')
def get_all_boards():

    return "Route doesn't exist"