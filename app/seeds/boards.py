from app.models import db, Board

def seed_boards():

    board_1 = Board(
        workspace_id = 1,
        title = 'board_1',
        background_color = "red",
        visibility = "visible",
        is_archived = 0
    )

    board_2 = Board(
        workspace_id = 1,
        title = 'board_2',
        background_color = "green",
        visibility = "private",
        is_archived = 0
    )

    board_3 = Board(
        workspace_id = 2,
        title = 'board_3',
        background_color = "blue",
        visibility = "visible",
        is_archived = 0
    )

    board_4 = Board(
        workspace_id = 2,
        title = 'board_4',
        background_color = "yellow",
        visibility = "visible",
        is_archived = 0
    )

    board_5 = Board(
        workspace_id = 2,
        title = 'board_5',
        background_color = "red",
        visibility = "visible",
        is_archived = 0
    )

    board_6 = Board(
        workspace_id = 3,
        title = 'board_6',
        background_color = "grey",
        visibility = "private",
        is_archived = 1
    )

    db.session.add(board_1)
    db.session.add(board_2)
    db.session.add(board_3)
    db.session.add(board_4)
    db.session.add(board_5)
    db.session.add(board_6)

    db.session.commit()

def undo_boards():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()