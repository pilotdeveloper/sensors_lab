import create
import serial
from time import sleep
import sys


robot = create.Create("/dev/ttyUSB1")

COM = "/dev/ttyUSB0"
BAUD = 115200
montior = False
ser = serial.Serial(COM,BAUD,timeout = .1)

print ('Waiting for device')
sleep(3)
print(ser.name)

if("-m" in sys.argv):
    monitor = True
else:
    monitor = False

while True:
    val = str(ser.readline().decode().strip('\r\n'))
    if val:
        print(val)
    valA = val.split("/")
    
    #switch(valA[0])
    
    
    #if (monitor == True):
            #print(val, end="\r", flush=True)

