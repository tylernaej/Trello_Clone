from app.models import db, Board

def seed_boards():

    board_1 = Board(
        workspace_id = 1,
        title = 'board_1',
        background_color = "686868",
        visibility = "visible",
        is_archived = 0
    )

    board_2 = Board(
        workspace_id = 1,
        title = 'board_2',
        background_color = "822020",
        visibility = "private",
        is_archived = 0
    )

    board_3 = Board(
        workspace_id = 2,
        title = 'board_3',
        background_color = "a95a00",
        visibility = "visible",
        is_archived = 0
    )

    board_4 = Board(
        workspace_id = 2,
        title = 'board_4',
        background_color = "0f3c6f",
        visibility = "visible",
        is_archived = 0
    )

    board_5 = Board(
        workspace_id = 2,
        title = 'board_5',
        background_color = "2d5b28",
        visibility = "visible",
        is_archived = 0
    )

    board_6 = Board(
        workspace_id = 3,
        title = 'board_6',
        background_color = "9a8000",
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