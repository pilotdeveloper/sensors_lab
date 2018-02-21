int incomingByte = 0;

void setup() {
  /* 
   *  Opens a serial connection. 
   *  Once this is running, open the Serial Monitor under Tools. 
   *  Be sure the Baud Rate is set to 115200
  */
  Serial.begin(115200);
  
}

void loop() {
  /*
   * This will run forever until the device is turned off.
   */
   if (Serial.available() > 0 ) {
      //read incoming byte
      incomingByte = Serial.read();

      //show the user what we read
      Serial.println("User typed: ");
      Serial.println(incomingByte, DEC);
      
   }
}
