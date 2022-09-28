from app.models import db, Workspace

def seed_workspaces():
    workspace_1 = Workspace(
        name = "Workspace_1",
        workspace_type = "development",
        description = "This is the desctiption for Workspace_1!",
        is_archived = 0
    )

    workspace_2 = Workspace(
        name = "Workspace_2",
        workspace_type = "development",
        description = "This is the desctiption for Workspace_2!",
        is_archived = 0
    )

    
    workspace_3 = Workspace(
        name = "Workspace_3",
        workspace_type = "production",
        description = "This is the desctiption for Workspace_3!",
        is_archived = 1
    )

    db.session.add(workspace_1)
    db.session.add(workspace_2)
    db.session.add(workspace_3)

    db.session.commit()

def undo_workspaces():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()