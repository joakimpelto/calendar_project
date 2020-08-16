class event():
    def __init__(self, title, start_date, ende_date, repetition):
        self.title = title
        self.start_date = start_date
        self.end_date = ende_date
        self.repetition = repetition

class project():
    def __init__(self, title, start_date, deadline, weight, work_days, state):
        self.title = title
        self.start_date = start_date
        self.deadline = deadline
        self.weight = weight
        self.work_days = work_days
        self.state = state 
