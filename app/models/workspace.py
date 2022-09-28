from .db import db

class Workspace(db.Model):
    __tablename__ = 'workspaces'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    workspace_type = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    is_archived = db.Column(db.Boolean, nullable=True)

    boards = db.relationship("Board", back_populates='workspace', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<{self.name}: workspace with type: {self.workspace_type}. is_archived - {self.is_archived}>'

    def to_dict(self):
        return {
            "id" : self.id,
            "name" : self.name,
            "workspaceType" : self.workspace_type,
            "description" : self.description,
            "isArchived" : self.is_archived
        }