cd shardings
node broker.js &
{
    sleep 2
    node chat.js
} &
sleep 4
cd ..
node index
