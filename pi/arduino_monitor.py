import create
import serial
from time import sleep
import sys

robot = create.Create("/dev/ttyUSB0")

COM = "/dev/ttyUSB1"
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
MAX_FORWARD = 40  # in cm per second
MAX_ROTATION = 50  # in cm per second
SPEED_INC = 5  # increment in percent



# start 50% speed
FWD_SPEED = MAX_FORWARD/8
ROT_SPEED = MAX_ROTATION/8
# at rest
robot_dir = 0
robot_rot = 0

while True:
    input_val = str(ser.readline().decode().strip('\r\n'))
    if input_val:
        print(input_val)
    # sample input is '12, a'
    button_input = input_val.split(",")
    if not button_input:
        continue
    if len(button_input) < 2:
        continue
    print(button_input)
    # no switch-case in python :(
    if button_input[1] == 'a':
        # forward
        robot_dir=1
        update_roomba = True
        FWD_SPEED += MAX_FORWARD*SPEED_INC/100
        if FWD_SPEED>MAX_FORWARD:
		    FWD_SPEED = MAX_FORWARD
		    # ROT_SPEED += MAX_ROTATION*SPEED_INC/100
        # if ROT_SPEED > MAX_ROTATION:
        #     ROT_SPEED = MAX_ROTATION
    elif button_input[1] == 'b':
        # backward
        robot_dir=1
        update_roomba = True
	FWD_SPEED = 0
        robot_rot=0
        if FWD_SPEED<0:
            FWD_SPEED = 0
	    # ROT_SPEED -= MAX_ROTATION*SPEED_INC/100
        # if ROT_SPEED<0:
        #     ROT_SPEED = 0
    elif button_input[1] == 'c':
        # left
        robot_rot-=.5
    elif button_input[1] == 'd':
        # right
        robot_rot+=.5
    # elif button_input[1] == 'e':
    #     # stop and terminate
    #     robot.go(0, 0) 
    #     break
    else:
        # unknown, one of nature's mysteries
        print("Unknown input: {}".format(button_input))

    robot.go(robot_dir*FWD_SPEED,robot_rot*ROT_SPEED) 

    #switch(valA[0])

    #if (monitor == True):
    #print(val, end="\r", flush=True)
