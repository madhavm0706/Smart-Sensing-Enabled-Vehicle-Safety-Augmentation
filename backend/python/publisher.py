import time
import paho.mqtt.client as mqtt

temp = False
def senddata():
    value1 = 10
    value2 = 20
    value3 = 30
    client.publish("/IOT/sensor1-data",payload="sensor value", qos=0,retain= False)


def subscribe_to_broker(client,userdata,flags,rc):
    print(f"connection sucessfully established {rc}")
    client.subscribe("/IOT/sensor1-request")
    client.subscribe("/IOT/sensor1-disconnect")
    client.subscribe("/IOT/sensor1-data")

def message_from_topic(client,userdata, msg):
    global temp

    if(msg.topic == "/IOT/sensor1-disconnect"):
        temp = False
        print("Connection terminated")
    
    if(msg.topic == "/IOT/sensor1-request"):
        temp = True
       


        print("send sensor data")
        client.publish("/IOT/sensor1-data",payload="sensor value", qos=0,retain= False)

        time.sleep(3)
              


client = mqtt.Client() 
client.on_connect = subscribe_to_broker 
client.on_message = message_from_topic 

client.connect("broker.hivemq.com",1883,60) #connecting the subscriber to the Broker.
client.loop_forever()