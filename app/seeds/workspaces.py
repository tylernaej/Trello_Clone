from app.models import db, Workspace, User

def seed_workspaces():

    demo = User.query.get(1)
    marnie = User.query.get(2)
    bobbie = User.query.get(3)
    tyler = User.query.get(4)

    workspace_1 = Workspace(
        name = "Workspace_1",
        workspace_type = "development",
        description = "This is the desctiption for Workspace_1!",
        is_archived = 0
    )

    workspace_1.users.append(tyler)
    workspace_1.users.append(marnie)

    workspace_2 = Workspace(
        name = "Workspace_2",
        workspace_type = "development",
        description = "This is the desctiption for Workspace_2!",
        is_archived = 0
    )

    workspace_2.users.append(demo)
    workspace_2.users.append(marnie)
    
    workspace_3 = Workspace(
        name = "Workspace_3",
        workspace_type = "production",
        description = "This is the desctiption for Workspace_3!",
        is_archived = 1
    )

    workspace_3.users.append(bobbie)
    workspace_3.users.append(demo)

    db.session.add(workspace_1)
    db.session.add(workspace_2)
    db.session.add(workspace_3)

    db.session.commit()

def undo_workspaces():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()