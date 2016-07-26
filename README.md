Установка
========================
* Клонируйте репозиторий git@github.com:flakyspark/angular_test.git
* Создайте базу MySQL для проекта
* Перейдите в каталог с приложением и запустите команду composer install,
* Во время установки укажите имя созданной базы и доступы к ней
* Перейдите в каталог /web/angular_prj
* Запустите команду npm install (должна быть установлена node.js)
* Вернитесь в корень проекта и запустите команду php bin/console doctrine:migrations:migrate
* Запустите команду php bin/console server:run
* Откройте в браузере страницу  http://127.0.0.1:8000
