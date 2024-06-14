#!/usr/bin/python3

import psycopg2

HOST = "127.0.0.1"

USER = "ted"

PASSWORD = "ombre1235"

DATABASE = "test"

PORT = 5433

# Connect to an existing database
def get_db_connection() :
    try : 
        conn = psycopg2.connect("host=%s dbname=%s port=%s user=%s password=%s" % (HOST, DATABASE,PORT, USER, PASSWORD))
        # print (conn)
        print("ok")
        return conn
        # Close connection
        # conn.close()
    except (Exception, psycopg2.Error) as error :
        print ("Erreur lors de la connextion  avec la base de donnée PostgreSQL", error)
        return None
    
# Close existing connexion database   
def close_db_connection():
    conn = get_db_connection()
    conn.close()

# test = get_db_connection()
print(get_db_connection())