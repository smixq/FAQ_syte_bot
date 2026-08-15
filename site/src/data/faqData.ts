export interface IFaq {
    id: string;
    question: string;
    answer?: string;
    telegramPost?: string;
    videoUrl?: string;
    children?: IFaq[];
}

export const faqData: IFaq[] = [
    {
        id: '1',
        question: "Хочу заблокировать пользователя",
        answer: "Он состоит в наших чатах?",
        children: [
            {
                id: '1.1',
                question: "Да",
                answer: "",
                children: [
                    {
                        id: '1.1.1',
                        question: "Я знаю его номер телефона",
                        answer: "Видео инструкция",
                        telegramPost: "leoday/26741",
                    },
                    {
                        id: '1.1.2',
                        question: "Я знаю его @username",
                        answer: "Видео инструкция",
                        telegramPost: "tutor4admin/8",
                    },
                    {
                        id: '1.1.3',
                        question: "Я знаю его Имя в телеграме",
                        answer: "Видео инструкция",
                        telegramPost: "tutor4admin/10",
                    },
                    {
                        id: '1.1.4',
                        question: "Я знаю его сообщение в одном из наших чатов",
                        answer: "Видео инструкция",
                        telegramPost: "tutor4admin/17",
                    },
                    {
                        id: '1.1.5',
                        question: "Не знаю о нем ничего",
                        answer: "Возвращайтесь, когда узнаете хоть что-то",
                        telegramPost: "tutor4admin/12",
                    },
                ]
            },
            {
                id: '1.2',
                question: "Нет",
                answer: "Он состоит в наших чатах?",
                children: [{
                    id: '1.2.1',
                    question: "Написал мне в личные сообщения",
                    answer: "В его профиле есть username, номер телефона, Имя",
                    children: [
                        {
                            id: '1.2.1.1',
                            question: "Да",
                            telegramPost: "leoday/26745",
                        },
                        {
                            id: '1.2.1.2',
                            question: "Нет",
                            telegramPost: "leoday/26746",
                        }
                    ]
                }]
            }
        ]
    },
    {
        id: '2',
        question: "Как искать негодяя?",
        answer: "",
        children: [
            {
                id: '2.1',
                question: "В веб версии: По истории сообщений за последние 72 часа",
                answer: "Видео инструкция",
                telegramPost: "tutor4admin/15",
            },
            {
                id: '2.2',
                question: "В веб версии: По стоп-словам в истории сообщений за последние 72 часа",
                answer: "Видео инструкция",
                telegramPost: "tutor4admin/15",
            }
        ]
    }
];