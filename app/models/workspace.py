from .db import db

user_workspaces = db.Table(
    "user_workspaces",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column("workspace_id", db.Integer, db.ForeignKey('workspaces.id'), primary_key=True)
)

class Workspace(db.Model):
    __tablename__ = 'workspaces'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    workspace_type = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    is_archived = db.Column(db.Boolean, nullable=True)

    boards = db.relationship("Board", back_populates='workspace', cascade="all, delete-orphan")
    users = db.relationship("User", secondary=user_workspaces, back_populates='workspaces')

    def __repr__(self):
        return f'<{self.name}: workspace with type: {self.workspace_type}. is_archived - {self.is_archived}>'

    def get_workspace_users(self):
        return [user.to_dict() for user in self.users]

    def to_dict_with_users(self):
        return {
            "id" : self.id,
            "name" : self.name,
            "workspaceType" : self.workspace_type,
            "description" : self.description,
            "isArchived" : self.is_archived,
            "users" : self.users
        }

    def to_dict_with_users_boards(self):
        users = [user.to_dict() for user in self.users]
        boards = [board.to_dict() for board in self.boards]
        return {
            "id" : self.id,
            "name" : self.name,
            "workspaceType" : self.workspace_type,
            "description" : self.description,
            "isArchived" : self.is_archived,
            "users" : users,
            "boards" : boards
        }

    def to_dict(self):
        return {
            "id" : self.id,
            "name" : self.name,
            "workspaceType" : self.workspace_type,
            "description" : self.description,
            "isArchived" : self.is_archived
        }