from .db import db

class List(db.Model):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, db.ForeignKey('boards.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    is_archived = db.Column(db.Boolean, nullable=True)

    board = db.relationship("Board", back_populates="lists")
    cards = db.relationship("Card", back_populates="list", cascade="all, delete-orphan")


    def __repr__(self):
        return f'<{self.title}: is a list>'

    def to_dict(self):
        return {
            "id" : self.id,
            "boardId" : self.board_id,
            "title" : self.title,
            "isArchived" : self.is_archived
        }