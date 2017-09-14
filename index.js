var TelegramBot = require('node-telegram-bot-api');
var fs = require('fs');
var token = "268377689:AAEehpljdqiY6qITewLNPUkbe60Kbszl95w";

var command = {
    '/echo':' - Команда ЭХО.',
    '/help':' - Справка о доступных командах.',
    '/photo':' - Получить фото.'
};
start_bot();

function start_bot(){
    var bot = new TelegramBot(token, { polling: true });
    console.log('We start telegramm bot!');
    
    
    // bot.onText(/\/save_as (.+) (.+)/, function (msg, match){
    // 	var chatId = msg.chat.id;
   	//     save_name = match[1];
    //     linc[chatId] = match[2];
    // });
    
    bot.onText(/\/help/, function (msg, match) {
        var help = 'Я умею выполнять следующие команды: \n';
        for(var j in command){
            help += j + command[j] + '\n';
        }
        var chatId = msg.chat.id;
        bot.sendMessage(chatId, help);
    });
    
    
    bot.onText(/\/photo/, function (msg, match) {
        var chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Мы получили ваш запрос, обрабатывам...');
    
    
        var spawn = require('child_process').spawn;
        const create_photo = spawn('echo \"am broadcast -a ru.meefik.linuxdeploy.BROADCAST_ACTION --es \"info\" \"create_photo\"\" | unchroot', {
            stdio: 'inherit',
            shell: true
        });

//     var spawn = require('child_process').spawn;
//     const echo = spawn('echo "am start -n com.arlosoft.macrodroid/.LauncherActivity" | unchroot', {
//   stdio: 'inherit',
//   shell: true
// });

        create_photo.on('exit', function (code) {
            console.log('child process exited with code ' + code);
            read_dir(function(dir) {
                console.log(dir);
                bot.sendPhoto(chatId, __dirname + '/photo/' + dir[0]);
                fs.unlinkSync( __dirname + '/photo/' + dir[0]);
            });
        });
    });
    
    // Listen for any kind of message. There are different kinds of
    // messages.
    bot.on('message', function (msg) {
        var chatId = msg.chat.id;
        console.log(msg);
        if(!msg.entities){
            bot.sendMessage(chatId, 'Мы получили ваше сообщение, но ничего сделать не можем. Выберите команду "/');
        }
    });
}

function read_dir(cb){
    fs.readdir(__dirname + '/photo', function(err, files) {
        if (err) {
           // some sort of error
        } else {
           if (!files.length) {
               // directory appears to be empty
               read_dir(cb);
           }
           else{
               cb(files);
           }
        }
    });
}