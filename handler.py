import json as jason
import time
import os
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import MetaData
from sqlalchemy import Table
from sqlalchemy.ext.declarative import declarative_base
import modules.logs as logs
import modules.response as Response
import pymysql

Base = declarative_base()


class Votos(Base):
    __tablename__ = 'votos'

    id = Column(Integer, primary_key=True)
    encuesta_id = Column(Integer)
    pregunta = Column(String)
    voto = Column(String)

    def __repr__(self):
       return "<Votos(encuesta_id=%d, pregunta='%s', voto='%s')>".format(self.encuesta_id, self.pregunta, self.voto)


class Comentarios(Base):
    __tablename__ = 'comentarios'

    id = Column(Integer, primary_key=True)
    encuesta_id = Column(Integer, unique=True)
    comentario = Column(String)

    def __repr__(self):
       return "<Comentarios(encuesta_id='%s', comentario='%s')>".format(self.encuesta_id, self.comentario)


def mysql_engine():
    return create_engine(os.environ['DB_CONNECTION'])


def create_table():
    metadata = MetaData(mysql_engine())
    votos = Table('votos', metadata,
                  Column('id', Integer, primary_key=True),
                  Column('encuesta_id', Integer),
                  Column('pregunta', String(180)),
                  Column('voto', String(50)))

    comentarios = Table('comentarios', metadata,
                  Column('id', Integer, primary_key=True),
                  Column('encuesta_id', Integer, unique=True),
                  Column('comentario', String(180)))

    # Create all tables
    metadata.create_all()

    for _t in metadata.tables:
        print("Table: ", _t)


def create(event, context):
    if "body" not in event or event.get("body") is None:
        return Response.error(
            "Missing required parameters: resultados and comentarios"
        )

    event = jason.loads(event.get("body"))
    seconds = time.time()

    resultados = event.get("resultados", None)
    votos = []
    for r in resultados.split('&'):
        votos.append(r.split('='))

    comentarios = Comentarios(encuesta_id=seconds, comentario=event.get("comentarios", None))

    s = Session(mysql_engine())
    objects = []
    for v in votos:
        e = Votos(pregunta=v[0], voto=v[1], encuesta_id=seconds)
        objects.append(e)

    s.bulk_save_objects(objects)
    s.bulk_save_objects([comentarios])
    s.commit()

    logs.info("Handler", "create: {}, {}".format(votos, comentarios))

    return Response.created(
        "create: {}, {}".format(resultados, comentarios)
    )


if __name__ == "__main__":
    create_table()

    # event = {
    #     'body': jason.dumps({
    #         'resultados': "servicio-regular=on&comida-bueno=on&precios-muybueno=on&chocolateycafe-regular=on&mejoras-bueno=on",
    #         'comentarios': "sdasdasdasd"
    #     })
    # }
    #
    # while range(1,30):
    #     time.sleep(2)
    #     create(event, None)