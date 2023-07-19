from flask import Flask, jsonify, request
from bson import ObjectId
from pymongo import MongoClient
import json
from datetime import datetime

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, (datetime, ObjectId)):
            return str(o)
        return super().default(o)

app = Flask(__name__)
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
        return jsonify({'message':'Manager deleted... '})
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

if __name__ == '__main__':
       app.run(debug=True)