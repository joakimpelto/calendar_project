import eel
import datetime
from calendar import monthrange
from dateutil import relativedelta

eel.init('web')

month_tracker = 0

@eel.expose
def month_info_py(direction):

    global month_tracker

    if (direction == 0):
        month_tracker = datetime.date.today()
    elif (direction == 1):
        month_tracker += relativedelta.relativedelta(months=1)
    elif (direction == -1):
        month_tracker += relativedelta.relativedelta(months=-1)
    
    month_info = str(month_tracker)

    year = int(month_info[0:4])
    month = int(month_info[5:7])
    day = int(month_info[8:10])
    first_and_total = monthrange(year, month)
    first_day = first_and_total[0]
    total_days = first_and_total[1]

    print("Year: {}, month {}, day {}, first day {}, total days {}" .format(year, month, day, first_day, total_days))
    return (first_day, total_days, year, month, day)

eel.start('main.html', mode='edge')


