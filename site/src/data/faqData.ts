export interface IFaq {
    id: string;
    question: string;
    answer?: string;
    telegramPost?: string;
    videoUrl?: string;
    children?: IFaq[];
    isImportant?: boolean;
}

export const faqData: IFaq[] = [
    {
        id: '1',
        question: "Как пользоваться Telegram-ботом",
        answer: "Смотрите краткий видео-обзор:",
        isImportant: true,
        telegramPost: "tutor4admin/7",
    },
    {
        id: '2',
        question: "Как пользоваться веб-версией",
        answer: "Смотрите краткий видео-обзор:",
        isImportant: true,
        telegramPost: "tutor4admin/5",
    },
    {
        id: '3',
        question: "Розыск",
        children: [
            {
                id: '3.1',
                question: "Проверка статуса пользователя",
                children: [
                    {
                        id: '3.1.1',
                        question: "Через Telegram-бот",
                        answer: `Проверить статус в боте:\n
Запустите бота - Нажмите [Проверить статус] - [введите @ username | Имя | телеграм ID]\n
Вы увидите:\n
\n
🔎 Статус: в бане / не заблокирован\n
👤 Профиль: имя и @username\n
🆔 Telegram ID\n
💬 Чаты пользователя\n
🚫 Причина бана\n
👮 Кто забанил\n
📅 Дата и время бана\n
📋 История банов и разбанов`,
                    },
                    {
                        id: '3.1.2',
                        question: "Через веб-версию",
                        answer: "Видео инструкция:",
                        telegramPost: "tutor4admin/23",
                    }
                ]
            },
            {
                id: '3.2',
                question: "Поиск по истории сообщений",
                children: [
                    {
                        id: '3.2.1',
                        question: "Через Telegram-бот",
                        answer: `Запустите бота - Нажмите [Последние 30 сообщений во всех чатах]\n
Вы увидите сообщения / фото / стикеры в чате`,
                    },
                    {
                        id: '3.2.2',
                        question: "Через веб-версию",
                        answer: "Видео инструкция:",
                        telegramPost: "tutor4admin/33",
                    }
                ]
            },
            {
                id: '3.3',
                question: "Поиск анонимного пользователя",
                children: [
                    {
                        id: '3.3.1',
                        question: "Аноним пишет в чате плохие сообщения",
                        answer: "Видео инструкция:",
                        telegramPost: "tutor4admin/31",
                    },
                    {
                        id: '3.3.2',
                        question: "Аноним пишет в личные сообщения",
                        answer: "Видео инструкция:",
                        telegramPost: "tutor4admin/34",
                    }
                ]
            },
            {
                id: '3.4',
                question: "Поиск по стоп-словам",
                children: [
                    {
                        id: '3.4.1',
                        question: "Через Telegram-бот",
                        answer: "Видео инструкция:",
                        telegramPost: "tutor4admin/30",
                    },
                    {
                        id: '3.4.2',
                        question: "Через веб-версию",
                        answer: "Видео инструкция:",
                        telegramPost: "tutor4admin/29",
                    }
                ]
            },
            {
                id: '3.5',
                question: "Как вычислить telegram ID",
                answer: "Видео инструкция:",
                telegramPost: "tutor4admin/32",
            }
        ]
    },
    {
        id: '4',
        question: "Забанить пользователя",
        children: [
            {
                id: '4.1',
                question: "Забанить через Telegram-бот",
                children: [
                    {
                        id: '4.1.1',
                        question: "По Username",
                        answer: "Видео инструкция:",
                        telegramPost: "tutor4admin/25",
                    },
                    {
                        id: '4.1.2',
                        question: "По имени",
                        answer: "Видео инструкция:",
                        telegramPost: "tutor4admin/26",
                    },
                    {
                        id: '4.1.3',
                        question: "По Telegram ID",
                        answer: "Видео инструкция:",
                        telegramPost: "tutor4admin/28",
                    },
                    {
                        id: '4.1.4',
                        question: "По сообщению из чата",
                        answer: "Видео инструкция:",
                        telegramPost: "tutor4admin/35",
                    }
                ]
            },
            {
                id: '4.2',
                question: "Забанить через веб-версию",
                children: [
                    {
                        id: '4.2.1',
                        question: "По Username",
                        answer: "Видео инструкция:",
                        telegramPost: "tutor4admin/18",
                    },
                    {
                        id: '4.2.2',
                        question: "По имени",
                        answer: "Видео инструкция:",
                        telegramPost: "tutor4admin/19",
                    },
                    {
                        id: '4.2.3',
                        question: "По Telegram ID",
                        answer: "Видео инструкция:",
                        telegramPost: "tutor4admin/22",
                        children: [
                            {
                                id: '4.2.3.1',
                                question: "Как вычислить Telegram ID?",
                                answer: "Смотрите тут:",
                                telegramPost: "tutor4admin/32",
                            }
                        ]
                    }
                ]
            },
            {
                id: '4.3',
                question: "Быстрая блокировка по ссылке",
                answer: "Видео инструкция:",
                telegramPost: "tutor4admin/35",
            }
        ]
    },
    {
        id: '5',
        question: "Разбанить пользователя",
        children: [
            {
                id: '5.1',
                question: "Разбанить через Telegram-бот",
                answer: `Разбанить в боте:\n
Запустите бота - Нажмите [Разбанить] - [введите @ username | Имя | телеграм ID]`,
            },
            {
                id: '5.2',
                question: "Разбанить через веб-версию",
                answer: "Видео инструкция:",
                telegramPost: "tutor4admin/24",
            }
        ]
    },
    {
        id: '6',
        question: "Панель управления и аналитика",
        children: [
            {
                id: '6.1',
                question: "Общая статистика",
                answer: "(скоро будет)",
            },
            {
                id: '6.2',
                question: "Статистика сообщений",
                answer: "(скоро будет)",
            },
            {
                id: '6.3',
                question: "Статистика пользователей",
                answer: "(скоро будет)",
            },
            {
                id: '6.4',
                question: "Статистика блокировок",
                answer: "(скоро будет)",
            },
            {
                id: '6.5',
                question: "Статистика стоп-слов",
                answer: "(скоро будет)",
            },
            {
                id: '6.6',
                question: "Аналитика",
                answer: "(скоро будет)",
            }
        ]
    }
];