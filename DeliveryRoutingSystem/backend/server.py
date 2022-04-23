import flask
from flask_pymongo import PyMongo
import json
from bson import json_util
import utils

app = flask.Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://Project295:drs295@cluster0.slztl.mongodb.net/drs?retryWrites=true&w=majority"
mongo = PyMongo(app)
db = mongo.db

@app.route("/users")
def members():
     user_list = list(db.users.find())
     return json.dumps(user_list, default=json_util.default)

@app.route("/getRoute/<n>/<k>/<algo>")
def getRoute():
     xc, yc, x_quantum, quantum_cost, nodeMap = utils.getRoute(n,k,algo)
     res = {
          "xc": xc,
          "yc": yc,
          "x_quantum": x_quantum,
          "quantum_cost": quantum_cost,
          "nodeMap": nodeMap
     }
     return json.dumps(res, default=json_util.default)
     
if __name__ == "__main__":
    app.run(debug=True)
