import sqlite3
from calenderclasses import event, project

conn = sqlite3.connect('calenderdata.db')

c = conn.cursor()

def create_db():

    c.execute("""CREATE TABLE IF NOT EXISTS events (
            title TEXT,
            start_date TEXT,
            end_date TEXT,
            repetition TEXT
        )""")

    c.execute("""CREATE TABLE IF NOT EXISTS projects (
            title TEXT,
            start_date TEXT,
            deadline TEXT,
            weight INTEGER,
            work_days TEXT,
            state TEXT
        )""")

def insert_event(event):
    with conn:
        c.execute("INSERT INTO events VALUES (:title, :start_date, :end_date, :repetition)", 
            {'title': event.title, 'start_date': event.start_date, 'end_date': event.end_date, 'repetition': event.repetition})

def insert_project(project):
    with conn:
        c.execute("INSERT INTO projects VALUES (:title, :start_date, :deadline, :weight, :work_days, :state)", 
            {'title': project.title, 'start_date': project.start_date, 'deadline': project.deadline, 'weight': project.weight, 'work_days': project.work_days, 'state': project.state})

def remove_event(event):
    with conn:
        c.execute("DELETE from events WHERE title = :title AND start_date = :start_date",
            {'title': event.title, 'start_date': event.start_date})

def remove_project(project):
    with conn:
        c.execute("DELETE from projects WHERE title = :title AND start_date = :start_date",
            {'title' : project.title, 'start_date': project.start_date})

def get_events_by_start_date(start_date):
    c.execute("SELECT * FROM events WHERE start_date=:start_date", {'start_date': start_date})
    return c.fetchall()



print_stuff = get_events_by_start_date('10.10.2020.20:00')

print(print_stuff)

conn.commit()

conn.close()

# TODOLSIT STUFF, fetched data to javascrip which then renders all neccecary stuff to user

