#!/usr/bin/python3

import psycopg2
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


HOST = "127.0.0.1"

USER = "ted"

PASSWORD = "ombre1235"

DATABASE = "sensor"

PORT = 5432

# Connect to an existing database
def get_db_connection() :
    try : 
        conn = psycopg2.connect("host=%s port=%s dbname=%s user=%s password=%s" % (HOST, PORT, DATABASE, USER, PASSWORD))
        # print (conn)
        # print("ok")
        creationTablepsycopg2(conn)
        return conn
        # Close connection
        # conn.close()
    except (psycopg2.OperationalError, psycopg2.Error, Exception) as error :
        print ("Erreur lors de la connextion  avec la base de donnée PostgreSQL", error)
        # Si une erreur est levée (base de données inexistante), la créer
        if hasattr(error, 'pgcode') and error.pgcode == '3D000' or 'does not exist' in str(error):  # Code d'erreur spécifique pour une base de données inexistante
            # Connexion à la base de données par défaut (postgres) pour créer la nouvelle base
            conn = psycopg2.connect(host=HOST, port=PORT, dbname='postgres', user=USER, password=PASSWORD)
            conn.autocommit = True  # Activer l'autocommit pour créer la base de données
            with conn.cursor() as cur:
                create_database(cur)
            # Reconnexion à la base nouvellement créée
            conn = psycopg2.connect("host=%s port=%s dbname=%s user=%s password=%s" % (HOST, PORT, DATABASE, USER, PASSWORD))
            creationTablepsycopg2(conn)
            return conn
            
        else:
            raise  # Relancer l'exception si ce n'est pas une erreur de base inexistante
            return None
            
    
# Close existing connexion database   
# Validation des modifications et fermeture de la connexion
def close_db_connection():
    conn = get_db_connection()
    conn.close()


def create_database(cursor):
    """Crée la base de données si elle n'existe pas."""
    cursor.execute("CREATE DATABASE %s" % DATABASE)

def creationTable(username,password,host,port,database_name):
    
    # Connexion à la base de données PostgreSQL
    engine = create_engine(f'postgresql://{username}:{password}@{host}:{port}/{database_name}')
    Session = sessionmaker(bind=engine)
    session = Session()

    # Définition des modèles de données
    Base = declarative_base()

    class Login(Base):
        __tablename__ = 'login'
        id = Column(Integer, primary_key=True)
        mail_id = Column(String)
        user_name = Column(String)
        password = Column(String)
        status = Column(Boolean)

    class Stepper(Base):
        __tablename__ = 'stepper'
        id = Column(Integer, primary_key=True)
        start_date = Column(DateTime)
        status = Column(Boolean)

    class ParameterData(Base):
        __tablename__ = 'parameter_data'
        id = Column(Integer, primary_key=True)
        temperature = Column(Integer)
        humidity = Column(Integer)
        start_date = Column(DateTime)
        stat_stepper = Column(Boolean)
        number_stepper = Column(Integer)
        espece = Column(String)
        timetoclose = Column(Integer)

    # Vérification de l'existence des tables et création si nécessaire
    if not engine.dialect.has_table(engine, 'login'):
        Base.metadata.create_all(engine, tables=[Login.__table__])
        print("Table 'login' créée avec succès.")

    if not engine.dialect.has_table(engine, 'stepper'):
        Base.metadata.create_all(engine, tables=[Stepper.__table__])
        print("Table 'stepper' créée avec succès.")

    if not engine.dialect.has_table(engine, 'parameter_data'):
        Base.metadata.create_all(engine, tables=[ParameterData.__table__])
        print("Table 'parameter_data' créée avec succès.")

    # Fermeture de la session
    session.close()



def creationTablepsycopg2(conn):
    # Création d'un curseur
    cur = conn.cursor()

    # Vérification de l'existence de la table "login"
    cur.execute("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'login')")
    login_table_exists = cur.fetchone()[0]

    if not login_table_exists:
        # Création de la table "login"
        cur.execute("""
            CREATE TABLE login (
                id SERIAL PRIMARY KEY,
                mail_id TEXT,
                user_name TEXT,
                password TEXT,
                status BOOLEAN
            )
        """)
        cur.execute("INSERT INTO login (mail_id, user_name, password, status) VALUES ('admin', 'admin', 'admin', True) ")
        print("Table 'login' créée avec succès.")

    # Vérification de l'existence de la table "stepper"
    cur.execute("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'stepper')")
    stepper_table_exists = cur.fetchone()[0]

    if not stepper_table_exists:
        # Création de la table "stepper"
        cur.execute("""
            CREATE TABLE stepper (
                id SERIAL PRIMARY KEY,
                start_date INTERVAL,
                status BOOLEAN
            )
        """)
        print("Table 'stepper' créée avec succès.")

    # Vérification de l'existence de la table "parameter_data"
    cur.execute("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'parameter_data')")
    parameter_data_table_exists = cur.fetchone()[0]

    if not parameter_data_table_exists:
        # Création de la table "parameter_data"
        cur.execute("""
            CREATE TABLE parameter_data (
                id SERIAL PRIMARY KEY,
                temperature FLOAT,
                humidity FLOAT,
                start_date DATE,
                stat_stepper BOOLEAN,
                number_stepper INTEGER,
                espece TEXT,
                timetoclose INTEGER
            )
        """)
        print("Table 'parameter_data' créée avec succès.")

    # Vérification de l'existence de la table 'data_temp' et la crée si nécessaire.
    cur.execute("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'data_temp')")
    table_exists = cur.fetchone()[0]

    if not table_exists:
        cur.execute("""
            CREATE TABLE data_temp (
                id SERIAL PRIMARY KEY,
                sensor TEXT,
                temperature NUMERIC,
                humidity NUMERIC,
                date_serveur TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                average_temperature NUMERIC,
                average_humidity NUMERIC,
                fan_status BOOLEAN,
                humidifier_status BOOLEAN,
                numfailedsensors INTEGER
            )
        """)
        print("Table 'data_temp' créée avec succès.")
    
    conn.commit()


# get_db_connection() 