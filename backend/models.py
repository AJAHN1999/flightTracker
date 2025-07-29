import databaseConn

#create airports table
cursor = databaseConn.get_cursor()


#"country_code","region_name","iata","icao","airport","latitude","longitude"
cursor.execute("CREATE TABLE airports (icao character(4) PRIMARY KEY, country_code character(2), region_name text, iata character(3),airport text, latitude real, longitude real)")




# final steps
databaseConn.get_connection().commit()
databaseConn.close_connection()