<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получение данных из формы
    $phone = $_POST["custom-phone"];
    $messenger = $_POST["messenger"];

    // Список email адресов, на которые будет отправлено письмо
    $to = array(
        "9134847334@list.ru",
        "dendon99@mail.ru",
        "serp7676@yandex.ru"
    );

    // Тема письма
    $subject = "Новая заявка с сайта";

    // Текст письма
    $message = "Номер телефона: " . $phone . "\n";
    $message .= "Мессенджер: " . $messenger . "\n";

    // Отправка письма на каждый из адресов
    $success = true;
    foreach ($to as $recipient) {
        if (!mail($recipient, $subject, $message)) {
            // Если хотя бы одно письмо не отправлено, устанавливаем флаг ошибки
            $success = false;
        }
    }

    // Проверка успешности отправки всех писем
    if ($success) {
        echo "Письмо успешно отправлено";
    } else {
        echo "Ошибка при отправке письма";
    }
} else {
    echo "Ошибка: Неверный метод запроса";
}
?>
