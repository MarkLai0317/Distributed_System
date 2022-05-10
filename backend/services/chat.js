function getHistoryTest(UserId){
    //先寫死 測試
    const msgHIstory = {
        '01':[
            {From:'01', Date: 1519129853500, Msg:"Hi I'm 01"},
            {From: UserId, Date:1519129857500, Msg:`Hi I'm ${UserId}`},
            {From:'01', Date: 1519129893500, Msg:"OK COOL"},
        ],
        '02':[
            {From:'02', Date: 1519129853500, Msg:"Hi I'm 02"},
            {From: UserId, Date:1519129857500, Msg:`Hi I'm ${UserId}`},
            {From:'02', Date: 1519129893500, Msg:"OK COOL"},
        ],
        '03':[
            {From:'03', Date: 1519129853500, Msg:"Hi I'm 03"},
            {From: UserId, Date:1519129857500, Msg:`Hi I'm ${UserId}`},
            {From:'03', Date: 1519129893500, Msg:"OK COOL"},
        ],
    }
    return msgHIstory
}
module.exports = {
    '/msg/getHistory': getHistoryTest,
}