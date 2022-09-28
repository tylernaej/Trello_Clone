from app.models import db, Card
from datetime import date

def seed_cards():
    card_1 = Card(
        list_id = 1,
        title = 'card_1',
        cover_color = "red",
        description = "This is the description for card_1!",
        start_date = date(2022, 12, 4),
        is_archived = 0
    )
    card_2 = Card(
        list_id = 2,
        title = 'card_2',
        cover_color = "red",
        description = "This is the description for card_2!",
        start_date = date(2022, 12, 4),
        is_archived = 0
    )    
    card_3 = Card(
        list_id = 3,
        title = 'card_3',
        cover_color = "red",
        description = "This is the description for card_3!",
        start_date = date(2022, 12, 4),
        is_archived = 0
    )    
    card_4 = Card(
        list_id = 4,
        title = 'card_4',
        cover_color = "red",
        description = "This is the description for card_4!",
        start_date = date(2022, 12, 4),
        is_archived = 0
    )    
    card_5 = Card(
        list_id = 5,
        title = 'card_5',
        cover_color = "red",
        description = "This is the description for card_5!",
        start_date = date(2022, 12, 4),
        is_archived = 0
    )    
    card_6 = Card(
        list_id = 6,
        title = 'card_6',
        cover_color = "red",
        description = "This is the description for card_6!",
        start_date = date(2022, 12, 4),
        is_archived = 1
    )
    




    db.session.add(card_1)
    db.session.add(card_2)
    db.session.add(card_3)
    db.session.add(card_4)
    db.session.add(card_5)
    db.session.add(card_6)

    db.session.commit()

def undo_cards():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()