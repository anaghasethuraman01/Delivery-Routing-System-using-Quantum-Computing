import flask
from flask_pymongo import PyMongo
import json
from bson import json_util
import utils
from flask_cors import CORS
from numpyencoder import NumpyEncoder

app = flask.Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb+srv://Project295:drs295@cluster0.slztl.mongodb.net/drs?retryWrites=true&w=majority"
mongo = PyMongo(app)
db = mongo.db

@app.route("/users")
def members():
     user_list = list(db.users.find())
     return json.dumps(user_list, default=json_util.default)

@app.route('/getRoute/<n>/<k>/<algo>', methods=['GET'])
def getRoute(n, k, algo):
     xc, yc, x_quantum, quantum_cost, nodeMap, qubit_needed = utils.getRoute(int(n),int(k),algo)
     if(algo == 'classical' {
          res = {
               'x': xc,
               'z': yc,
               'classical_cost': x_quantum
          }
     })
     else {
          res = {
               "xc": xc,
               "yc": yc,
               "x_quantum": x_quantum,
               "quantum_cost": quantum_cost,
               "nodeMap": nodeMap,
               "qubit_needed": qubit_needed
          }
     }
     myResponse = flask.make_response('Response')
     myResponse.access_control_allow_origin = 'http://localhost:3000'
     myResponse.data = json.dumps(res, cls=NumpyEncoder)
     return myResponse
     
if __name__ == "__main__":
    app.run(debug=True)
