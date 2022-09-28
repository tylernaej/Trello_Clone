from app.models import db, List

def seed_lists():
    list_1 = List(
        board_id = 1,
        title = 'list_1',
        is_archived = 0
    )
    list_2 = List(
        board_id = 2,
        title = 'list_2',
        is_archived = 0
    )
    list_3 = List(
        board_id = 3,
        title = 'list_3',
        is_archived = 0
    )
    list_4 = List(
        board_id = 4,
        title = 'list_4',
        is_archived = 0
    )
    list_5 = List(
        board_id = 5,
        title = 'list_5',
        is_archived = 0
    )
    list_6 = List(
        board_id = 6,
        title = 'list_6',
        is_archived = 1
    )



    db.session.add(list_1)
    db.session.add(list_2)
    db.session.add(list_3)
    db.session.add(list_4)
    db.session.add(list_5)
    db.session.add(list_6)

    db.session.commit()

def undo_lists():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()