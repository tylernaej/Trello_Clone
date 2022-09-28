from .db import db

class Board(db.Model):
    __tablename__ = 'boards'

    id = db.Column(db.Integer, primary_key=True)
    workspace_id = db.Column(db.Integer, db.ForeignKey('workspaces.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    background_color = db.Column(db.String(100), nullable=False)
    visibility = db.Column(db.String(100), nullable=True)
    is_archived = db.Column(db.Boolean, nullable=True)

    workspace = db.relationship("Workspace", back_populates="boards")
    lists = db.relationship("List", back_populates="board", cascade="all, delete-orphan")

    def __repr__(self):
        return f'<{self.title}: Board with visibility: {self.visibility}. is_archived - {self.is_archived}>'

    def to_dict(self):
        return {
            "id" : self.id,
            "title" : self.title,
            "backgroundColor" : self.background_color,
            "visibility" : self.visibility,
            "isArchived" : self.is_archived
        }