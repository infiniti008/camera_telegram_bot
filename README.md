Телеграм бот присылает сделанное по запросу фото с телефона. 
Бот написан на node.js и по этому использует ряд программ, которые можно установить из Play market.
Необходимо:
 - Linux deploy - Для развертывания контейнера в котором будет крутиться node.js приложение.
 - Busy box ( from meefik) - Для того чтобы Linux deploy работал на телефоне.
 - Macro droid - С помощью этой программы происходит съемка фотографии.
 - Токен для телеграм бота
 
 Как это работает:
 - Программа Linux deploy позволяет развернуть на вашем телефоне в контейнере полноценную линукс сисему. У меня используется Ubuntu 14.04.
 - Следуя иструкциям из оффициальных источников необходимо установить в контейнер Node.js версии не ниже 6.11.
 - Скопировать себе репозиторий и установить необходимые npm пакеты.
 - Указать свой токен для телеграм бота в файле index.js
 - В программе Macrodroid экспортировать макрос photo.mdr
 - Запустить приложение в контейнере с помощью команды nodejs index
 
 Логика работы приложения:
 - Телеграм бот получает запрос от пользователя
 - отправляет на телефон уведомление, ожидает появления фото.
 - Программа Macrodroid, получив уведомление содержащее "create_photo" от программы Linux deploy запускает выполнение макроса
 - В макросе описано создание фото с помощью указанной камеры
 - После создания, фото размещается в указанной папке
 - После появления фото в папке приложение отправляет его пользователю и удаляет фото из папки.
