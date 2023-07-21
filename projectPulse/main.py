from flask import Flask, jsonify, request
from bson import ObjectId
from pymongo import MongoClient
import json
from datetime import datetime
from flask_cors import CORS

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, (datetime, ObjectId)):
            return str(o)
        return super().default(o)

app = Flask(__name__)
CORS(app)  # Initialize Flask-Cors with your app
app.json_encoder = JSONEncoder

connection_url='mongodb+srv://dhirajrajpp:root@cluster0.slgcdts.mongodb.net/?retryWrites=true&w=majority'

client = MongoClient(connection_url)
db = client.ProjectPulse

@app.route("/")
def welcome():
       return "welcome to the ProjectPulse"


@app.route('/admin')
def addUsers():
       db.users.insert_one({"id":1,"name":"Dhiraj","role":"Admin","password":"12345"})
       return jsonify({'message':'Admin added successfully'})

# Manager end Point Start here

# add Managers
@app.route('/manager',methods=['POST'])
def add_managers():
    data=request.get_json()
    data['status']=True
    data['start_data']=datetime.now()
    managers=list(db.manager.find())
    length=len(managers)
    if length==0:
        data['managerId']=1
    else:
        data['managerId']=managers[length-1]['managerId']+1

    db.manager.insert_one(data)

    return jsonify({'message':"Manager added Successfully"})


# Update managers
@app.route('/manager/<int:mId>',methods=['PUT'])
def update_managers(mId):
    data=request.get_json()
    update_query = {'$set': data}
    result=db.manager.update_one({'managerId': mId}, update_query)

    if result.modified_count>0:
        return jsonify({'message': 'manager update... '}), 200
    else:
        return jsonify({'message': 'manager Id not matches... '}), 404




#     Delete Managers
@app.route('/manager/<int:mId>',methods=['DELETE'])
def delete_managers(mId):
    length=db.manager.delete_one({'managerId':mId})
    if length.deleted_count>0:
        return jsonify({'message':'Manager deleted... '}),200
    else:
        return jsonify({'message': 'Id not matches... '}),404




# Get Managers
@app.route('/manager/<int:mId>',methods=['GET'])
def get_manager(mId):
    manager=db.manager.find_one({'managerId':mId})
    if manager:
        manager_json = json.dumps(manager, cls=JSONEncoder)
        return manager_json, 200
    else:
        return jsonify({'message':'Manager not present in this id'}),404


# get all managers
@app.route('/manager',methods=['GET'])
def get_managers():
    managers=db.manager.find()
    print(managers)
    if managers:
        documents = [document for document in managers]
        manager_json = json.dumps(documents, default=JSONEncoder().default)
        return manager_json, 200
        #  return jsonify(managers)
    return jsonify({'message':'Manager not present'}),404


# Manager end Point end here
#===========================================================================================================
# Project end Point Start here

# Add project
@app.route("/project",methods=['POST'])
def addProject():
    data=request.get_json()
    id=data['managerId']
    print(id)
    managers=db.manager.find_one({'managerId':id})
    if managers==None:
        return jsonify({'message':'Manager Id not present '})

    projects = list(db.project.find())
    length = len(projects)
    if length == 0:
        data['projectId'] = 1
    else:
        data['projectId'] = projects[length - 1]['projectId'] + 1

    db.project.insert_one(data)

    return jsonify({'message':'Project added successfully'}),200




# Update project
@app.route('/project/<int:pId>',methods=['PUT'])
def update_projects(pId):
    data=request.get_json()
    update_query = {'$set': data}
    result=db.project.update_one({'projectId': pId}, update_query)

    if result.modified_count>0:
        return jsonify({'message': 'project update... '}), 200
    else:
        return jsonify({'message': 'project Id not matches... '}), 404




#     Delete project
@app.route('/project/<int:pId>',methods=['DELETE'])
def delete_projects(pId):
    length=db.project.delete_one({'projectId':pId})
    if length.deleted_count>0:
        return jsonify({'message':'project deleted... '}),200
    else:
        return jsonify({'message': 'Id not matches... '}),404




# Get project
@app.route('/project/<int:pId>',methods=['GET'])
def get_project(pId):
    project=db.project.find_one({'projectId':pId})
    if project:
        project_json = json.dumps(project, cls=JSONEncoder)
        return project_json, 200
    else:
        return jsonify({'message':'project not present in this id'}),404



# Get project
@app.route('/project/manager/<int:mId>',methods=['GET'])
def get_projectmanager(mId):
    projects = db.project.find({'managerId':mId})
    print(projects)
    if projects:
        documents = [document for document in projects]
        project_json = json.dumps(documents, default=JSONEncoder().default)
        return project_json, 200

    return jsonify({'message': 'project not present'}), 404

# get all project
@app.route('/project',methods=['GET'])
def get_projects():
    projects=db.project.find()
    print(projects)
    if projects:
        documents = [document for document in projects]
        project_json = json.dumps(documents, default=JSONEncoder().default)
        return project_json, 200

    return jsonify({'message':'project not present'}),404


# project end point end here
# =================================================================================================================================
# Task end Point Start Here

@app.route("/task",methods=['POST'])
def addtask():
    data=request.get_json()
    id=data['projectId']
    rId=data['resourceId']
    print(id)
    projects=db.project.find_one({'projectId':id})
    if projects==None:
        return jsonify({'message':'project Id not present '})

    resources = db.resource.find_one({'resourceId': rId})
    if resources == None:
        return jsonify({'message': 'resource Id not present '})

    tasks = list(db.task.find())
    length = len(tasks)
    if length == 0:
        data['taskId'] = 1
    else:
        data['taskId'] = tasks[length - 1]['taskId'] + 1

    db.task.insert_one(data)

    return jsonify({'message':'Task added successfully'}),200




# Update project
@app.route('/task/<int:tId>',methods=['PUT'])
def update_task(tId):
    data=request.get_json()
    update_query = {'$set': data}
    result=db.task.update_one({'taskId': tId}, update_query)

    if result.modified_count>0:
        return jsonify({'message': 'Task update... '}), 200
    else:
        return jsonify({'message': 'Task Id not matches... '}), 404




#     Delete project
@app.route('/task/<int:tId>',methods=['DELETE'])
def delete_task(tId):
    length=db.task.delete_one({'taskId':tId})
    if length.deleted_count>0:
        return jsonify({'message':'task deleted... '}),200
    else:
        return jsonify({'message': 'Id not matches... '}),404




# Get project
@app.route('/task/<int:tId>',methods=['GET'])
def get_task(tId):
    task=db.task.find_one({'taskId':tId})
    if task:
        task_json = json.dumps(task, cls=JSONEncoder)
        return task_json, 200
    else:
        return jsonify({'message':'task not present in this id'}),404



# Get projectId
@app.route('/task/project/<int:pId>',methods=['GET'])
def get_task_project(pId):
    tasks = db.task.find({'projectId':pId})
    print(tasks)
    if tasks:
        documents = [document for document in tasks]
        project_json = json.dumps(documents, default=JSONEncoder().default)
        return project_json, 200

    return jsonify({'message': 'tasks not present'}), 404

# get task by developerId
@app.route('/task/developer/<int:dId>',methods=['GET'])
def get_task_developer(dId):
    tasks = db.task.find({'developerId':dId})
    print(tasks)
    if tasks:
        documents = [document for document in tasks]
        project_json = json.dumps(documents, default=JSONEncoder().default)
        return project_json, 200

    return jsonify({'message': 'tasks not present'}), 404


# get task by resourceId
@app.route('/task/resource/<int:rId>',methods=['GET'])
def get_task_resource(rId):
    tasks = db.task.find({'resourceId':rId})
    print(tasks)
    if tasks:
        documents = [document for document in tasks]
        project_json = json.dumps(documents, default=JSONEncoder().default)
        return project_json, 200

    return jsonify({'message': 'tasks not present'}), 404



# get all Task
@app.route('/task',methods=['GET'])
def get_All_task():
    tasks=db.task.find()
    print(tasks)
    if tasks:
        documents = [document for document in tasks]
        project_json = json.dumps(documents, default=JSONEncoder().default)
        return project_json, 200

    return jsonify({'message':'tasks not present'}),404

# task end point end here
# ===============================================================================================================================

# resource end Point start here

# add resource
@app.route('/resource',methods=['POST'])
def add_resource():
    data=request.get_json()

    resources=list(db.resource.find())
    length=len(resources)
    if length==0:
        data['resourceId']=1
    else:
        data['resourceId']=resources[length-1]['resourceId']+1

    db.resource.insert_one(data)

    return jsonify({'message':"resource added Successfully"})




# Update Resource
@app.route('/resource/<int:rId>',methods=['PUT'])
def update_resource(rId):
    data=request.get_json()
    update_query = {'$set': data}
    result=db.resource.update_one({'resourceId': rId}, update_query)

    if result.modified_count>0:
        return jsonify({'message': 'resource update... '}), 200
    else:
        return jsonify({'message': 'resource Id not matches... '}), 404




#     Delete Resource
@app.route('/resource/<int:rId>',methods=['DELETE'])
def delete_resource(rId):
    length=db.resource.delete_one({'resourceId':rId})
    if length.deleted_count>0:
        return jsonify({'message':'Resource deleted... '}),200
    else:
        return jsonify({'message': 'resource Id not matches...  '}),404




# Get Resource
@app.route('/resource/<int:rId>',methods=['GET'])
def get_resource(rId):
    resources=db.resource.find_one({'resourceId':rId})
    if resources:
        manager_json = json.dumps(resources, cls=JSONEncoder)
        return manager_json, 200
    else:
        return jsonify({'message':'resource not present in this id'}),404


# get all Resource
@app.route('/resource',methods=['GET'])
def get_resources():
    resources=db.resource.find()
    print(resources)
    if resources:
        documents = [document for document in resources]
        manager_json = json.dumps(documents, default=JSONEncoder().default)
        return manager_json, 200
        #  return jsonify(managers)
    return jsonify({'message':'resource not present'}),404



# resource end point end here

# =====================================================================================================================
if __name__ == '__main__':
       app.run(debug=True)