import psycopg2

# Initialize single connection for now
_connection = None

def get_connection():
    global _connection
    if _connection is None:
        _connection = psycopg2.connect("dbname=flighttracker user=ajahn")
    return _connection

def get_cursor():
    conn = get_connection()
    return conn.cursor()

def close_connection ():
    _connection.close()

