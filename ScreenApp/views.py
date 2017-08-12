from django.shortcuts import render
import datetime as d

def index(request):

    daymap = {1:'Monday',
              2:'Tuesday',
              3:'Wednesday',
              4:'Thursday',
              5:'Friday',
              6:'Saturday',
              7:'Sunday'}

    monthmap = {'01':'January',
                '02':'February',
                '03':'March',
                '04':'April',
                '05':'May',
                '06':'June',
                '07':'July',
                '08':'August',
                '09':'September',
                '10':'October',
                '11':'November',
                '12':'December'}

    today = d.datetime.now()
    day_of_week = today.isoweekday()
    day = today.strftime('%d')
    month = today.strftime('%m')

    return render(request, 'ScreenApp/index.html', context={'today':daymap[day_of_week],
                                                            'day':day,
                                                            'month':monthmap[month]})
