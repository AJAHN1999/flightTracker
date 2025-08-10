from opensky_api import OpenSkyApi
from fastapi import FastAPI
import json
api = OpenSkyApi()
import databaseConn;
from fastapi.middleware.cors import CORSMiddleware
from credes import getAccessToken
cur = databaseConn.get_cursor()
app = FastAPI()

#initiate the API client
#

# origins = [
#     "http://localhost:8080",
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/airports/{airportName}")
def retrieveAirportName(airportName: str):
    result = {}
    airport = "%"+airportName.strip().capitalize()+"%"
    cur.execute("SELECT * FROM airports WHERE airport LIKE %s ESCAPE ''",(airport,))
    list_of_dicts = [{'icao':everyResult[0],'country_code':everyResult[1],'region_name':everyResult[2],'iata':everyResult[3],'airport':everyResult[4],'latitude':everyResult[5],'longitude':everyResult[6]} for everyResult in cur.fetchall()]
    print(cur.fetchall())
    return json.dumps(list_of_dicts)

@app.get("/AllAirports")
def retrieveAllAirports ():
    cur.execute("SELECT * FROM airports")
    list_of_dicts = [{'icao':everyResult[0],'country_code':everyResult[1],'region_name':everyResult[2],'iata':everyResult[3],'airport':everyResult[4],'latitude':everyResult[5],'longitude':everyResult[6]} for everyResult in cur.fetchall()]
    print(cur.fetchall())
    return json.dumps(list_of_dicts)




@app.get("/")
def retrieveAirplanes(bbox:tuple):
    longLats = []
    states = api.get_states(bbox=tuple(bbox))
    for s in states.states:
        longLats.append((s.longitude,s.latitude))
    return longLats

@app.get("/login")
def login():
    return getAccessToken()
        



        
        




#min_latitude, max_latitude, min_longitude, max_longitude
# s = api.get_track_by_aircraft(icao24="0d0fdb")
# print(s)


