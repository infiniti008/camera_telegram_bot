var TelegramBot = require('node-telegram-bot-api');
var fs = require('fs');
var token = "268377689:AAEehpljdqiY6qITewLNPUkbe60Kbszl95w";

var command = {
    '/echo':' - Команда ЭХО.',
    '/help':' - Справка о доступных командах.',
    '/add_torrent':' - Функция добавления торрент файла для закачки.',
    '/add_link':' - Функция загрузки файла по прямой ссылке.',
    '/save_as':' - Функция Загрузки файла с указанием имени.'
};
start_bot();

function start_bot(){
    var bot = new TelegramBot(token, { polling: true });
    console.log('We start telegramm bot!');
    
    bot.onText(/\/echo (.+)/, function (msg, match) {
        var chatId = msg.chat.id;
        var resp = match[1];
        bot.sendMessage(chatId, resp);
    });
    
    bot.onText(/\/save_as (.+) (.+)/, function (msg, match){
    // 	var chatId = msg.chat.id;
   	//     save_name = match[1];
    //     linc[chatId] = match[2];
    });
    
    bot.onText(/\/help/, function (msg, match) {
        var help = 'Я умею выполнять следующие команды: \n';
        for(var j in command){
            help += j + command[j] + '\n';
        }
        var chatId = msg.chat.id;
        bot.sendMessage(chatId, help);
    });
    
    
    // Listen for any kind of message. There are different kinds of
    // messages.
    bot.on('message', function (msg) {
        var chatId = msg.chat.id;
        console.log(msg);
        bot.sendMessage(chatId, 'Мы получили вашу ссылку, начинаем загрузку файла!');
    });
}