#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>
#include "printf.h"
RF24 radio (9, 10);//yours
#define PLOAD_WIDTH  32  // 32 unsigned chars TX payload
byte pip;
byte pload_width_now;
byte newdata;
unsigned char rx_buf[PLOAD_WIDTH] = {0};
struct dataStruct1 {
  int table;
  float t1;
  char response;
} transmitter1_data;

struct dataStruct2 {
  float p1;
  float t1;
  float s1;
} transmitter2_data;

struct dataStruct3 {
  float p1;
  float t1;
  float s1;
} transmitter3_data;

unsigned char ADDRESS2[1] = {0xb2};
unsigned char ADDRESS3[1] = {0xb3};
unsigned char ADDRESS4[1] = {0xb4};
unsigned char ADDRESS5[1] = {0xb5};
int    involtPin[14] = {}; //equals involt.pin.P in app
String involtString[2] = {}; //equals involt.pin.S in app
char involt[16];
String fname;
unsigned char ADDRESS1[5]  =
{
  0xb1, 0x43, 0x88, 0x99, 0x45
}; // Define a static TX address

unsigned char ADDRESS0[5]  =
{
  0xb0, 0x43, 0x88, 0x99, 0x45
}; // Define a static TX address

void setup()
{
  radio.begin();
  printf_begin();
  Serial.begin(115200);
  radio.setDataRate(RF24_250KBPS);
  radio.enableDynamicPayloads();
  radio.openWritingPipe(ADDRESS0);
  radio.openReadingPipe(0, ADDRESS0);
  radio.openReadingPipe(1, ADDRESS1);
  radio.openReadingPipe(2, ADDRESS2);
  radio.openReadingPipe(3, ADDRESS3);
  radio.openReadingPipe(4, ADDRESS4);
  radio.openReadingPipe(5, ADDRESS5);
  radio.setPALevel(RF24_PA_MIN);
  radio.startListening();
  radio.printDetails();
  delay(1000);
}
void loop()
{
  involtReceive();
  if (radio.available(&pip))
  {
    pload_width_now = radio.getDynamicPayloadSize();
    if (!pload_width_now) {
    }
    else
    {
      radio.read( rx_buf, pload_width_now );
      newdata = 1;
    }
  }
  if (newdata == 1)
  {
    newdata = 0;
    if (pip == 1 && pload_width_now == sizeof(transmitter1_data))
    {
      memcpy(&transmitter1_data, rx_buf, sizeof(transmitter1_data));
      if (transmitter1_data.table == 1) {
        involtSendString(10, String(transmitter1_data.response));
      }
      if (transmitter1_data.table == 2) {
        involtSendString(11, String(transmitter1_data.response));
      }
      if (transmitter1_data.table == 3) {
        involtSendString(12, String(transmitter1_data.response));
      }
    }
    if (pip == 2 && pload_width_now == sizeof(transmitter1_data))
    {
      memcpy(&transmitter1_data, rx_buf, sizeof(transmitter1_data));
      if (transmitter1_data.table == 4) {
        involtSendString(13, String(transmitter1_data.response));
      }
      if (transmitter1_data.table == 5) {
        involtSendString(14, String(transmitter1_data.response));
      }
      if (transmitter1_data.table == 6) {
        involtSendString(15, String(transmitter1_data.response));
      }
      if (transmitter1_data.table == 7) {
        involtSendString(16, String(transmitter1_data.response));
      }
    }

    if (pip == 3 && pload_width_now == sizeof(transmitter3_data))
    {
    }
    Serial.println("");
  }
  fname = "";
}

void involtReceive() {
  if (Serial.available() > 0) {
    Serial.readBytesUntil('\n', involt, sizeof(involt));
    int pin;
    if (involt[0] == 'P') {
      int value;
      sscanf(involt, "P%dV%d", &pin, &value);
      involtPin[pin] = value;
    }
    else if (involt[0] == 'S') {
      char value[sizeof(involt)];
      sscanf(involt, "S%dV%s", &pin, &value);
      involtString[pin] = value;
    }
    else if (involt[0] == 'F') {
      char value[sizeof(involt)];
      sscanf(involt, "F%s", &value);
      fname = value;
    };
    memset(involt, 0, sizeof(involt));
  };
};

void involtSend(int pinNumber, int sendValue) {
  Serial.print('A');
  Serial.print(pinNumber);
  Serial.print('V');
  Serial.print(sendValue);
  Serial.println('E');
  Serial.flush();
};

void involtSendString(int pinNumber, String sendString) {
  Serial.print('A');
  Serial.print(pinNumber);
  Serial.print('V');
  Serial.print(sendString);
  Serial.println('E');
  Serial.flush();
};

void involtSendFunction(String functionName) {
  Serial.print('F');
  Serial.print(functionName);
  Serial.println('E');
  Serial.flush();
};

