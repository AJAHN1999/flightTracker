# from urllib.request import urlretrieve
#  cleanse data

# urlretrieve("https://raw.githubusercontent.com/ip2location/ip2location-iata-icao/refs/heads/master/iata-icao.csv", "icao.csv")


import csv
import databaseConn

#reading csv as dictreader
{'country_code': 'ZW', 'region_name': 'Midlands', 'iata': 'GWE', 'icao': 'FVTL', 'airport': 'Thornhill Air Base', 'latitude': '-19.4364', 'longitude': '29.8619'}
with open('./icao.csv',mode='r') as csvfile:
    file = csv.DictReader(csvfile)

    conn = databaseConn.get_connection()
    cursor = databaseConn.get_cursor()
    unique ={}
    for line in file:
        if line["icao"]=="" or line["icao"] in unique:
            continue
        cursor.execute(
            '''
            INSERT INTO airports (icao, country_code, region_name, iata, airport, latitude, longitude)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ''',
            (
                line["icao"],
                line["country_code"],
                line["region_name"],
                line["iata"],
                line["airport"],
                float(line["latitude"]),
                float(line["longitude"])
            )
        )
        unique[f"{line["icao"]}"] = 1

    conn.commit()
    print("ingestion successfull")
        
        


