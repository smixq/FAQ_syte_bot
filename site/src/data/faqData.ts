export interface IFaq {
    id: string;
    question: string;
    title?: string;
    answer?: string;
    telegramPost?: string;
    videoUrl?: string;
    children?: IFaq[];
    isImportant?: boolean;
}

export const faqData: IFaq[] = [
    {
        id: '1',
        question: 'Как пользоваться Telegram-ботом',
        title: 'Как пользоваться Telegram-ботом: <a href="https://t.me/bizarrebotgod_bot" target="_blank" rel="noopener noreferrer">https://t.me/bizarrebotgod_bot</a>',
        answer: 'Смотрите краткий видео-обзор:',
        isImportant: true,
        telegramPost: 'tutor4admin/7',
    },
    {
        id: '2',
        question: 'Как пользоваться веб-версией',
        title: 'Как пользоваться веб-версией сервиса: <a href="https://superbot.bizarreclub.ru" target="_blank" rel="noopener noreferrer">https://superbot.bizarreclub.ru</a>',
        answer: 'Смотрите краткий видео-обзор:',
        isImportant: true,
        telegramPost: 'tutor4admin/5',
    },
    {
        id: '3',
        question: 'Розыск',
        title: 'Раздел: Розыск и поиск информации',
        children: [
            {
                id: '3.1',
                question: 'Проверка статуса пользователя',
                title: 'Проверка статуса пользователя',
                children: [
                    {
                        id: '3.1.1',
                        question: 'Через Telegram-бот',
                        title: 'Проверка статуса пользователя через Telegram-бот: <a href="https://t.me/bizarrebotgod_bot" target="_blank" rel="noopener noreferrer">https://t.me/bizarrebotgod_bot</a>',
                        answer: `Проверить статус в боте:\n\nЗапустите бота: <a href="https://t.me/bizarrebotgod_bot" target="_blank" rel="noopener noreferrer">https://t.me/bizarrebotgod_bot</a> - Нажмите [Проверить статус] - [введите @ username | Имя | телеграм ID]\n\nВы увидите:\n\n🔎 Статус: в бане / не заблокирован\n👤 Профиль: имя и @username\n🆔 Telegram ID\n💬 Чаты пользователя\n🚫 Причина бана\n👮 Кто забанил\n📅 Дата и время бана\n📋 История банов и разбанов`,
                    },
                    {
                        id: '3.1.2',
                        question: 'Через веб-версию',
                        title: 'Проверка статуса пользователя через веб-версию: <a href="https://superbot.bizarreclub.ru" target="_blank" rel="noopener noreferrer">https://superbot.bizarreclub.ru</a>',
                        answer: 'Видео инструкция:',
                        telegramPost: 'tutor4admin/23',
                    },
                ],
            },
            {
                id: '3.2',
                question: 'Поиск по истории сообщений',
                title: 'Поиск по истории сообщений',
                children: [
                    {
                        id: '3.2.1',
                        question: 'Через Telegram-бот',
                        title: 'Поиск по истории сообщений через Telegram-бот: <a href="https://t.me/bizarrebotgod_bot" target="_blank" rel="noopener noreferrer">https://t.me/bizarrebotgod_bot</a>',
                        answer: `Запустите бота: <a href="https://t.me/bizarrebotgod_bot" target="_blank" rel="noopener noreferrer">https://t.me/bizarrebotgod_bot</a> - Нажмите [Последние 30 сообщений во всех чатах]\n\nВы увидите сообщения / фото / стикеры в чате`,
                    },
                    {
                        id: '3.2.2',
                        question: 'Через веб-версию',
                        title: 'Поиск по истории сообщений через веб-версию: <a href="https://superbot.bizarreclub.ru" target="_blank" rel="noopener noreferrer">https://superbot.bizarreclub.ru</a>',
                        answer: 'Видео инструкция:',
                        telegramPost: 'tutor4admin/33',
                    },
                ],
            },
            {
                id: '3.3',
                question: 'Поиск анонимного пользователя',
                title: 'Поиск анонимного пользователя',
                children: [
                    {
                        id: '3.3.1',
                        question: 'Аноним пишет в чате плохие сообщения',
                        title: 'Как найти анонимного пользователя, пишущего вредоносные сообщения в чат',
                        answer: 'Видео инструкция:',
                        telegramPost: 'tutor4admin/31',
                    },
                    {
                        id: '3.3.2',
                        question: 'Аноним пишет в личные сообщения',
                        title: 'Как вычислить анонима, пишущего в личные сообщения',
                        answer: 'Видео инструкция:',
                        telegramPost: 'tutor4admin/34',
                    },
                    {
                        id: '3.3.3',
                        question: 'Быстрая блокировка по ссылке',
                        title: 'Быстрая блокировка пользователя по ссылке',
                        answer: 'Видео инструкция:',
                        telegramPost: 'tutor4admin/35',
                    },
                ],
            },
            {
                id: '3.4',
                question: 'Поиск по стоп-словам',
                title: 'Поиск сообщений по стоп-словам',
                children: [
                    {
                        id: '3.4.1',
                        question: 'Через Telegram-бот',
                        title: 'Поиск по стоп-словам через Telegram-бот: <a href="https://t.me/bizarrebotgod_bot" target="_blank" rel="noopener noreferrer">https://t.me/bizarrebotgod_bot</a>',
                        answer: 'Видео инструкция:',
                        telegramPost: 'tutor4admin/30',
                    },
                    {
                        id: '3.4.2',
                        question: 'Через веб-версию',
                        title: 'Поиск по стоп-словам через веб-версию: <a href="https://superbot.bizarreclub.ru" target="_blank" rel="noopener noreferrer">https://superbot.bizarreclub.ru</a>',
                        answer: 'Видео инструкция:',
                        telegramPost: 'tutor4admin/29',
                    },
                ],
            },
            {
                id: '3.5',
                question: 'Как вычислить telegram ID',
                title: 'Инструкция: Как вычислить Telegram ID пользователя',
                answer: 'Видео инструкция:',
                telegramPost: 'tutor4admin/32',
            },
        ],
    },
    {
        id: '4',
        question: 'Забанить пользователя',
        title: 'Раздел: Блокировка пользователей',
        children: [
            {
                id: '4.1',
                question: 'Забанить через Telegram-бот',
                title: 'Способы бана через Telegram-бот: <a href="https://t.me/bizarrebotgod_bot" target="_blank" rel="noopener noreferrer">https://t.me/bizarrebotgod_bot</a>',
                children: [
                    {
                        id: '4.1.1',
                        question: 'По Username',
                        title: 'Как забанить пользователя по Username через Telegram-бот: <a href="https://t.me/bizarrebotgod_bot" target="_blank" rel="noopener noreferrer">https://t.me/bizarrebotgod_bot</a>',
                        answer: 'Видео инструкция:',
                        telegramPost: 'tutor4admin/25',
                    },
                    {
                        id: '4.1.2',
                        question: 'По имени',
                        title: 'Как забанить пользователя по Имени через Telegram-бот: <a href="https://t.me/bizarrebotgod_bot" target="_blank" rel="noopener noreferrer">https://t.me/bizarrebotgod_bot</a>',
                        answer: 'Видео инструкция:',
                        telegramPost: 'tutor4admin/26',
                    },
                    {
                        id: '4.1.3',
                        question: 'По Telegram ID',
                        title: 'Как забанить пользователя по Telegram ID через Telegram-бот: <a href="https://t.me/bizarrebotgod_bot" target="_blank" rel="noopener noreferrer">https://t.me/bizarrebotgod_bot</a>',
                        answer: `Работа в Боте\n\nЗабанить по телеграмм ID доступна:\n\nЗапустите бот <a href="https://t.me/bizarrebotgod_bot" target="_blank" rel="noopener noreferrer">https://t.me/bizarrebotgod_bot</a> - Нажмите [Забанить] - [введите ID] - [Укажите причину] - [Прикрепите скрин] - Происходит бан✅\n\n❗️Однако выяснить ID пользователя напрямую нельзя, нужен компьютер`,
                    },
                    {
                        id: '4.1.4',
                        question: 'По сообщению из чата',
                        title: 'Как забанить пользователя по сообщению из чата через Telegram-бот: <a href="https://t.me/bizarrebotgod_bot" target="_blank" rel="noopener noreferrer">https://t.me/bizarrebotgod_bot</a>',
                        answer: 'Видео инструкция:',
                        telegramPost: 'tutor4admin/35',
                    },
                ],
            },
            {
                id: '4.2',
                question: 'Забанить через веб-версию',
                title: 'Способы бана через веб-версию: <a href="https://superbot.bizarreclub.ru" target="_blank" rel="noopener noreferrer">https://superbot.bizarreclub.ru</a>',
                children: [
                    {
                        id: '4.2.1',
                        question: 'По Username',
                        title: 'Как забанить пользователя по Username через веб-версию: <a href="https://superbot.bizarreclub.ru" target="_blank" rel="noopener noreferrer">https://superbot.bizarreclub.ru</a>',
                        answer: 'Видео инструкция:',
                        telegramPost: 'tutor4admin/18',
                    },
                    {
                        id: '4.2.2',
                        question: 'По имени',
                        title: 'Как забанить пользователя по Имени через веб-версию: <a href="https://superbot.bizarreclub.ru" target="_blank" rel="noopener noreferrer">https://superbot.bizarreclub.ru</a>',
                        answer: 'Видео инструкция:',
                        telegramPost: 'tutor4admin/19',
                    },
                    {
                        id: '4.2.3',
                        question: 'По Telegram ID',
                        title: 'Как забанить пользователя по Telegram ID через веб-версию: <a href="https://superbot.bizarreclub.ru" target="_blank" rel="noopener noreferrer">https://superbot.bizarreclub.ru</a>',
                        answer: 'Видео инструкция:',
                        telegramPost: 'tutor4admin/22',
                        children: [
                            {
                                id: '4.2.3.1',
                                question: 'Как вычислить Telegram ID?',
                                title: 'Инструкция: Как вычислить Telegram ID для бана в веб-версии: <a href="https://superbot.bizarreclub.ru" target="_blank" rel="noopener noreferrer">https://superbot.bizarreclub.ru</a>',
                                answer: 'Смотрите тут:',
                                telegramPost: 'tutor4admin/32',
                            },
                        ],
                    },
                ],
            },
            {
                id: '4.3',
                question: 'Быстрая блокировка по ссылке',
                title: 'Быстрая блокировка пользователя по ссылке',
                answer: 'Видео инструкция:',
                telegramPost: 'tutor4admin/35',
            },
        ],
    },
    {
        id: '5',
        question: 'Разбанить пользователя',
        title: 'Раздел: Разблокировка пользователей',
        children: [
            {
                id: '5.1',
                question: 'Разбанить через Telegram-бот',
                title: 'Как разбанить пользователя через Telegram-бот: <a href="https://t.me/bizarrebotgod_bot" target="_blank" rel="noopener noreferrer">https://t.me/bizarrebotgod_bot</a>',
                answer: `Разбанить в боте:\n\nЗапустите бота - Нажмите [Разбанить] - [введите @ username | Имя | телеграм ID]`,
            },
            {
                id: '5.2',
                question: 'Разбанить через веб-версию',
                title: 'Как разбанить пользователя через веб-версию: <a href="https://superbot.bizarreclub.ru" target="_blank" rel="noopener noreferrer">https://superbot.bizarreclub.ru</a>',
                answer: 'Видео инструкция:',
                telegramPost: 'tutor4admin/24',
            },
        ],
    },
    // {
    //     id: '6',
    //     question: 'Панель управления и аналитика',
    //     title: 'Раздел: Панель управления и аналитика',
    //     children: [
    //         {
    //             id: '6.1',
    //             question: 'Общая статистика',
    //             title: 'Общая статистика системы',
    //             answer: '(скоро будет)',
    //         },
    //         {
    //             id: '6.2',
    //             question: 'Статистика сообщений',
    //             title: 'Статистика сообщений',
    //             answer: '(скоро будет)',
    //         },
    //         {
    //             id: '6.3',
    //             question: 'Статистика пользователей',
    //             title: 'Статистика пользователей',
    //             answer: '(скоро будет)',
    //         },
    //         {
    //             id: '6.4',
    //             question: 'Статистика блокировок',
    //             title: 'Статистика блокировок',
    //             answer: '(скоро будет)',
    //         },
    //         {
    //             id: '6.5',
    //             question: 'Статистика стоп-слов',
    //             title: 'Статистика по стоп-словам',
    //             answer: '(скоро будет)',
    //         },
    //         {
    //             id: '6.6',
    //             question: 'Аналитика',
    //             title: 'Аналитика активности',
    //             answer: '(скоро будет)',
    //         },
    //     ],
    // },
];