#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>
#include "printf.h"

#include <Wire.h>

int address = 0x28; // 28 is the address
byte byte1, byte2, byte3, byte4;

RF24 radio (8, 10); //yours

struct dataStruct{
  int table;
  float t1;
  char response; 
}transmitter1_data;

unsigned char ADDRESS0[5]  = 
{
  0xb1,0x43,0x88,0x99,0x45
}; // Define a static TX address
//just change b1 to b2 or b3 to send to other pip on resciever

void setup()
{
 // Wire.begin();

  radio.begin();
  Serial.begin(115200);
  printf_begin();
  radio.setPALevel(RF24_PA_MAX);   
  radio.setRetries(1,1);
  radio.enableDynamicPayloads();
  radio.setDataRate(RF24_250KBPS);
  radio.openWritingPipe(ADDRESS0);
  radio.openReadingPipe(0,ADDRESS0);
  radio.stopListening();

  radio.printDetails();

  int buttonNr=0;
  pinMode(2, INPUT);           // set pin to input
  pinMode(3, INPUT);           // set pin to input
  pinMode(4, INPUT);           // set pin to input
  pinMode(5, INPUT);           // set pin to input
  digitalWrite(2, HIGH);       // turn on pullup resistors
  digitalWrite(3, HIGH);       // turn on pullup resistors
  digitalWrite(4, HIGH);       // turn on pullup resistors
  digitalWrite(5, HIGH);       // turn on pullup resistors

}

void loop()
{
    while (digitalRead(2)!=0 && digitalRead(3)!=0 && digitalRead(4)!=0 && digitalRead(5)!=0)
    {
      delay(10);
    }

    transmitter1_data.table = 5;
    transmitter1_data.t1 = 27.33; // this is currently unused but we're leaving it in because I'm too lazy to update the receiver. 
    if (digitalRead(2)==0){
      transmitter1_data.response='a';
    }
 
    if (digitalRead(3)==0){
      transmitter1_data.response='b'; 
    }
    
    if (digitalRead(4)==0){
      transmitter1_data.response='c';
    }
    
    if (digitalRead(5)==0){
      transmitter1_data.response='d';   
    }

    bool ok = radio.write(&transmitter1_data, sizeof(transmitter1_data));
    delay(10);
}
