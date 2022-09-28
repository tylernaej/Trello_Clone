from .db import db

class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, db.ForeignKey('lists.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    cover_color = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    start_date = db.Column(db.Date, nullable=True)
    due_date = db.Column(db.Date, nullable=True)
    is_archived = db.Column(db.Boolean, nullable=True)

    list = db.relationship("List", back_populates="cards")

    def __repr__(self):
        return f'<{self.title}: Card. is_archived - {self.is_archived}>'

    def to_dict(self):
        return {
            "id" : self.id,
            "title" : self.title,
            "coverColor" : self.cover_color,
            "description" : self.description,
            "startDate" : self.start_date,
            "dueDate" : self.due_date,
            "isArchived" : self.is_archived
        }