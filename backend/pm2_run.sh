pm2 start chat_service/message_broker.js  
pm2 start chat_service/all_message_handler.js  
cd shardings
pm2 start broker.js  
pm2 start customer-1.js 
pm2 start customer-2.js 
pm2 start manager-1.js 
pm2 start chat.js
cd ..
pm2 start index.js