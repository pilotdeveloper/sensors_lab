import create
import serial
from time import sleep
import sys

robot = create.Create("/dev/ttyUSB1")

COM = "/dev/ttyUSB0"
BAUD = 115200
montior = False
ser = serial.Serial(COM, BAUD, timeout=.1)

print('Waiting for device')
sleep(3)
print(ser.name)

if ("-m" in sys.argv):
    monitor = True
else:
    monitor = False

# Roomba control input design inspired by:
# https://github.com/martinschaef/roomba/blob/master/game.py
MAX_FORWARD = 50  # in cm per second
MAX_ROTATION = 200  # in cm per second
SPEED_INC = 10  # increment in percent



# start 50% speed
FWD_SPEED = MAX_FORWARD/2
ROT_SPEED = MAX_ROTATION/2
# at rest
robot_dir = 0
robot_rot = 0

while True:
    input_val = str(ser.readline().decode().strip('\r\n'))
    if input_val:
        print(input_val)
    # sample input is '12, a'
    team_number, button_input = input_val.split(",")
    # no switch-case in python :(
    if button_input.lower().strip() == 'a':
        # forward
        robot_dir+=1
        update_roomba = True
        FWD_SPEED += MAX_FORWARD*SPEED_INC/100
        if FWD_SPEED>MAX_FORWARD:
		    FWD_SPEED = MAX_FORWARD
		    ROT_SPEED += MAX_ROTATION*SPEED_INC/100
        if ROT_SPEED > MAX_ROTATION:
            ROT_SPEED = MAX_ROTATION
    elif button_input.lower().strip() == 'b':
        # backward
        robot_dir-=1
        update_roomba = True
		FWD_SPEED -= MAX_FORWARD*SPEED_INC/100
        if FWD_SPEED<0:
            FWD_SPEED = 0
		    ROT_SPEED -= MAX_ROTATION*SPEED_INC/100
        if ROT_SPEED<0:
            ROT_SPEED = 0
    elif button_input.lower().strip() == 'c':
        # left
        robot_rot-=1
    elif button_input.lower().strip() == 'd':
        # right
        robot_rot+=1
    elif button_input.lower().strip() == 'e':
        # stop and terminate
        robot.go(0, 0) 
        break
    else:
        # unknown, one of nature's mysteries
        print("Unknown input: {}".format(button_input))

    robot.go(robot_dir*FWD_SPEED,robot_rot*ROT_SPEED) 

    #switch(valA[0])

    #if (monitor == True):
    #print(val, end="\r", flush=True)
