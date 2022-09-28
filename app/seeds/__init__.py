from flask.cli import AppGroup
from .users import seed_users, undo_users
from .workspaces import seed_workspaces, undo_workspaces
from .boards import seed_boards, undo_boards
from .lists import seed_lists, undo_lists
from .cards import seed_cards, undo_cards

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_workspaces()
    seed_boards()
    seed_lists()
    seed_cards()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_workspaces()
    undo_boards()
    undo_lists()
    undo_cards()
    # Add other undo functions here
