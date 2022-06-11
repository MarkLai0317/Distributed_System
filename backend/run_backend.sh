node chat_service/message_broker.js &
node chat_service/all_message_handler.js &
cd shardings
node broker.js &
{
    sleep 2
    node customer-1.js 
} &
{
    sleep 2
    node customer-2.js 
} &
{
    sleep 2
    node manager-1.js 
} &
{
    sleep 2
    node chat.js
} & 
sleep 4
cd ..
node index.js

