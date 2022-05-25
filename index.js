const TelegramApi = require('node-telegram-bot-api')
const token = '5313371873:AAHJoPS6PQrx1zRn-dyCtlw1-k923GeaHtA'
const bot = new TelegramApi(token, {polling: true})

let PC = {
    Place: [
        { number: 1, available: 0, user_id: 0, text: 'super - INTEL CORE I5-11400, GEFORCE RTX 3060 DUAL OC 12GB', cost: 10},
        { number: 2, available: 0, user_id: 0, text: 'super - INTEL CORE I5-11400, GEFORCE RTX 3060 DUAL OC 12GB', cost: 10},
        { number: 3, available: 0, user_id: 0, text: 'super - INTEL CORE I5-11400, GEFORCE RTX 3060 DUAL OC 12GB', cost: 10},
        { number: 4, available: 1, user_id: 642607008, text: 'vip - INTEL CORE I7-8700K, NVIDIA GEFORCE RTX 2080TI 11GB', cost: 5},
        { number: 5, available: 0, user_id: 0, text: 'vip - INTEL CORE I7-8700K, NVIDIA GEFORCE RTX 2080TI 11GB', cost: 5},
        { number: 6, available: 0, user_id: 0, text: 'vip - INTEL CORE I7-8700K, NVIDIA GEFORCE RTX 2080TI 11GB', cost: 5},
        { number: 7, available: 0, user_id: 0, text: 'общий - INTEL CORE I5-11400F, PALIT GEFORCE RTX 3060 DUAL OC', cost: 2},
        { number: 8, available: 0, user_id: 0, text: 'общий - INTEL CORE I5-11400F, PALIT GEFORCE RTX 3060 DUAL OC', cost: 2},
        { number: 9, available: 0, user_id: 0, text: 'общий - INTEL CORE I5-11400F, PALIT GEFORCE RTX 3060 DUAL OC', cost: 2},
        { number: 10, available: 0, user_id: 0, text: 'общий - INTEL CORE I5-11400F, PALIT GEFORCE RTX 3060 DUAL OC', cost: 2},
        { number: 11, available: 0, user_id: 0, text: 'общий - INTEL CORE I5-11400F, PALIT GEFORCE RTX 3060 DUAL OC', cost: 2},
        { number: 12, available: 0, user_id: 0, text: 'playstation 5', cost: 5},
        { number: 13, available: 0, user_id: 0, text: 'playstation 5', cost: 5},
        { number: 14, available: 0, user_id: 0, text: 'plalstation 5', cost: 5}
    ]
 };


const Menu1 = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Личный кабинет', callback_data: '1'}],
            [{text: 'Справка', callback_data: '2'}],
            [{text: '🔥🔥🔥Горящее🔥🔥🔥', callback_data: '3'}],
            [{text: 'Сделать заказ', callback_data: '4'}],
            [{text: 'Поддержка', callback_data: '5'}]
        ]   
    })
}


let usersChatId = {};

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию (имя)'},
        {command: '/register', description: 'Регистрация'}
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') { 
            console.log(msg);
            return bot.sendMessage(chatId, 'Здарова приятель. Добро пожаловать в тест бот проекта ТРиТПО  testTRITPObot \nМеню:' , Menu1);  
        }

       if (text === '/info') {
           return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`);
       }

        if (text === '/register') {
            if (usersChatId.length === 0) {
                usersChatId.push(chatId);
                console.log('first user registed');
                return bot.sendMessage(chatId, 'Вы зарегистрировались первым. Поздравляем');
            }
            for (let i = 0; i <= usersChatId.length; i++) {
                if (i === 0) continue;
                if (usersChatId[i] === chatId) {
                    return bot.sendMessage(chatId, 'Вы уже зарегистрированы');     
                }
                if (i === usersChatId.length && i != 0){
                    usersChatId.push(chatId);
                    console.log('user registered');
                    return bot.sendMessage(chatId, 'Вы только что зарегистрировались.');
                }
            }   
        }

        return bot.sendMessage(chatId, 'Я тебя не понимать, попробуй еще раз. Unknown command.');
    })

    setInterval(function () {
        if (usersChatId.length > 0) {
            for (let i = 0; i < usersChatId.length; i++) {
                if (i === 0) {
                    bot.sendMessage(usersChatId[0], 'Вы первый зарегистрированный пользователь, Поздравляем');
                    continue;
                }
                bot.sendMessage(usersChatId[i], `Are you here? You are ${i}st user`);
            }
        } else {
            console.log('no user registered')
        }
    }, 10000)

    bot.on('callback_query', msg => {
        const choosenFromButtons = msg.data;
        const chatId = msg.message.chat.id;
        
        switch (choosenFromButtons) {
            case '1':
                // bot.sendMessage(chatId, PC.Place.number);
                bot.sendMessage(chatId,'Ваши заказы:')
                let flag = 0
                for (let i = 0; i < 14; i++){ 
                    if(PC.Place[i].user_id === chatId){
                        bot.sendMessage(chatId, PC.Place[i].number + PC.Place[i].text)
                        flag = 1
                    }   
                }
                if (!flag) {
                    bot.sendMessage(chatId,'На данный момент у Вас нет заказов.');
                } 
                break;
            case '2':
                bot.sendMessage(chatId, `запрещается:
                курить сигареты, сигары, вейпы;
                нарушать общественный порядок других посетителей;
                выражаться нецензурной бранью;
                наносить вред имуществу Киберлаунжа;
                грубить сотрудникам и гостям Киберлаунжа, провоцировать конфликты и вступать в драки;
                заходить в служебные помещения;
                создавать помехи в работе компьютеров;
                 употреблять продукты питания за компьютерным местом, за исключением напитков;
                танцевать;
                ставить ноги на диваны, столы;
                свистеть и громко кричать;
                стоять за спинкой кресла играющего за компьютером гостя;
                Администрация Киберлаунжа оставляет за собой право отказать в обслуживании без объяснения причин. 
                    Администрация Киберлаунжа также оставляет за собой право, в случае нарушения гостем вышеуказанных правил, в любой момент отключить компьютер или телевизор гостя и попросить его удалиться из Киберлаунжа без возвращения оплаченной стоимости услуг.`);    //////////////////////////////////Текст справки
                break;
            case '3':
                bot.sendMessage(chatId, ` Titan – первый киберлаунж в Минске, где каждый гость найдет себе занятие по душе. У нас большой выбор настольных игр, и, конечно же, зона gaming.


                Игровая зона Titan разделена на два зала:
                
                - общий зал на 30 машин
                
                - VIP зал на 10 машин с профессиональным оборудованием
                
                - Super VIP зал на 6 машин с профессиональным оборудованием
                
                
                Также, для любителей PS5 наш киберлаунж предлагает 3 комфортные зоны с диванами и TV.`);    //////////////////////////////////Текст горящего
                break;
            case '4':
                bot.sendMessage(chatId, `Свободные места:`)
                for (i = 0; i < 14; i++){
                    if(PC.Place[i].available === 0){
                        bot.sendMessage(chatId, '№' + PC.Place[i].number + ' - ' + PC.Place[i].text)
                    }
                }
                // setTimeout( bot.sendMessage(chatId, `Введите номер который вы хотели бы заказать:`), 200000000)
                // bot.sendMessage(chatId, `Введите номер который вы хотели бы заказать:`)
                


                // bot.on('text', function(msg)
                // {
                //     var messageChatId = msg.chat.id;
                //     var messageText = msg.text;
                 
                //     if (messageText === '1') {
                //         bot.sendMessage(ChatId, 'AAAAAAAAAAAAAAAAAAAa');
                //     }
                // });






                break;
            case '5':
                bot.sendMessage(chatId, `Режим работы: круглосуточно 24/7
                Адрес: ул. Пушкина 322
                Телефон: +375(33)668-23-49`);    
                break;
            default: 
                console.log(" ")
                break;
        }
    })
}

start()
