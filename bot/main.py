import asyncio
import logging
import os
from typing import Optional, Tuple, List, Dict, Any

from aiogram import Bot, Dispatcher, F
from aiogram.filters import CommandStart, Command
from aiogram.types import Message, CallbackQuery, InlineKeyboardMarkup, InlineKeyboardButton, BotCommand, BotCommandScopeDefault
from aiogram.utils.keyboard import InlineKeyboardBuilder

# ==========================================
# 1. ДЕРЕВО ДАННЫХ FAQ
# ==========================================
FAQ_DATA: List[Dict[str, Any]] = [
    {
        "id": "1",
        "question": "Как пользоваться Telegram-ботом",
        "answer": "Смотрите краткий видео-обзор:",
        "important": True,
        "video_ids": ["BAACAgIAAxkBAAIBIGqDC5S9uiB1D5q0Vv5RGM7SaOV3AAJjqgACo_4YSMcrpMTMrttbPQQ"]  # tutor4admin/7
    },
    {
        "id": "2",
        "question": "Как пользоваться веб-версией",
        "answer": "Смотрите краткий видео-обзор:",
        "important": True,
        "video_ids": ["BAACAgIAAxkBAAIBIWqDC5RnMQ9yrL5uTtrP-5271nuoAAJmqgACo_4YSJ7iPG5wm1_WPQQ"]  # tutor4admin/5
    },
    {
        "id": "3",
        "question": "Розыск",
        "children": [
            {
                "id": "3.1",
                "question": "Проверка статуса пользователя",
                "children": [
                    {
                        "id": "3.1.1",
                        "question": "Через Telegram-бот",
                        "answer": (
                            "Проверить статус в боте:\n\n"
                            "Запустите бота - Нажмите [Проверить статус] - [введите @ username | Имя | телеграм ID]\n\n"
                            "Вы увидите:\n\n"
                            "🔎 Статус: в бане / не заблокирован\n"
                            "👤 Профиль: имя и @username\n"
                            "🆔 Telegram ID\n"
                            "💬 Чаты пользователя\n"
                            "🚫 Причина бана\n"
                            "👮 Кто забанил\n"
                            "📅 Дата и время бана\n"
                            "📋 История банов и разбанов"
                        )
                    },
                    {
                        "id": "3.1.2",
                        "question": "Через веб-версию",
                        "answer": "Видео инструкция:",
                        "video_ids": ["BAACAgIAAxkBAAIBG2qDC5Tis1BoqyrYNXKJDY21BK0ZAAJXqgACo_4YSCkRdUITxzJLPQQ"]  # tutor4admin/23
                    }
                ]
            },
            {
                "id": "3.2",
                "question": "Поиск по истории сообщений",
                "children": [
                    {
                        "id": "3.2.1",
                        "question": "Через Telegram-бот",
                        "answer": (
                            "Запустите бота - Нажмите [Последние 30 сообщений во всех чатах]\n\n"
                            "Вы увидите сообщения / фото / стикеры в чате"
                        )
                    },
                    {
                        "id": "3.2.2",
                        "question": "Через веб-версию",
                        "answer": "Видео инструкция:",
                        "video_ids": ["BAACAgIAAxkBAAIBCGqDCz7o9Ksx0Bp2ATPgPNpLFWcYAAJOqgACo_4YSBZsllpegTYWPQQ"]  # tutor4admin/33
                    }
                ]
            },
            {
                "id": "3.3",
                "question": "Поиск анонимного пользователя",
                "children": [
                    {
                        "id": "3.3.1",
                        "question": "Аноним пишет в чате плохие сообщения",
                        "answer": "Видео инструкция:",
                        "video_ids": ["BAACAgIAAxkBAAIBCmqDCz7KaLAf3hHL7fUZCbWMJDE6AAJRqgACo_4YSCrmDn5AK8ExPQQ"]  # tutor4admin/31
                    },
                    {
                        "id": "3.3.2",
                        "question": "Аноним пишет в личные сообщения",
                        "answer": "Видео инструкция:",
                        "video_ids": ["BAACAgIAAxkBAAIBCWqDCz4iW1AogbLHlQ3LfEt-zQvWAAJQqgACo_4YSFagkXsq3O60PQQ"]  # tutor4admin/34
                    }
                ]
            },
            {
                "id": "3.4",
                "question": "Поиск по стоп-словам",
                "children": [
                    {
                        "id": "3.4.1",
                        "question": "Через Telegram-бот",
                        "answer": "Видео инструкция:",
                        "video_ids": ["BAACAgIAAxkBAAIBC2qDCz6PmLuQ0D9K8-4GHdI-psY0AAJYqgACo_4YSCh-VLOJAtJxPQQ"]  # tutor4admin/30
                    },
                    {
                        "id": "3.4.2",
                        "question": "Через веб-версию",
                        "answer": "Видео инструкция:",
                        "video_ids": ["BAACAgIAAxkBAAIBDGqDCz7gOD9D70YkLa_LFPo_v6abAAJSqgACo_4YSH0TzQhycs_APQQ"]  # tutor4admin/29
                    }
                ]
            },
            {
                "id": "3.5",
                "question": "Как вычислить telegram ID",
                "answer": "Видео инструкция:",
                "video_ids": ["BAACAgIAAxkBAAIBCWqDCz4iW1AogbLHlQ3LfEt-zQvWAAJQqgACo_4YSFagkXsq3O60PQQ"]  # tutor4admin/32
            }
        ]
    },
    {
        "id": "4",
        "question": "Забанить пользователя",
        "children": [
            {
                "id": "4.1",
                "question": "Забанить через Telegram-бот",
                "children": [
                    {
                        "id": "4.1.1",
                        "question": "По Username",
                        "answer": "Видео инструкция:",
                        "video_ids": ["BAACAgIAAxkBAAIBD2qDCz7Mb6QcXnqLcxz9Ko8HvyHjAAJTqgACo_4YSAp05aZymEy9PQQ"]  # tutor4admin/25
                    },
                    {
                        "id": "4.1.2",
                        "question": "По имени",
                        "answer": "Видео инструкция:",
                        "video_ids": ["BAACAgIAAxkBAAIBDmqDCz6dx0zcvfQh-4pp7lAu5ttjAAJaqgACo_4YSKCUa208pZxHPQQ"]  # tutor4admin/26
                    },
                    {
                        "id": "4.1.3",
                        "question": "По Telegram ID",
                        "answer": "Видео инструкция:",
                        "video_ids": []  # tutor4admin/28 (вставьте file_id)
                    },
                    {
                        "id": "4.1.4",
                        "question": "По сообщению из чата",
                        "answer": "Видео инструкция:",
                        "video_ids": []  # tutor4admin/35 (вставьте file_id)
                    }
                ]
            },
            {
                "id": "4.2",
                "question": "Забанить через веб-версию",
                "children": [
                    {
                        "id": "4.2.1",
                        "question": "По Username",
                        "answer": "Видео инструкция:",
                        "video_ids": ["BAACAgIAAxkBAAIBH2qDC5Qq377zfaTgcfyuNRxsuD85AAJeqgACo_4YSLOpTJLs-IjDPQQ"]  # tutor4admin/18
                    },
                    {
                        "id": "4.2.2",
                        "question": "По имени",
                        "answer": "Видео инструкция:",
                        "video_ids": ["BAACAgIAAxkBAAIBHmqDC5T7xxVRgtfupZakb36aVve5AAJcqgACo_4YSP9prAqdcExnPQQ"]  # tutor4admin/19
                    },
                    {
                        "id": "4.2.3",
                        "question": "По Telegram ID",
                        "answer": "Видео инструкция:",
                        "video_ids": ["BAACAgIAAxkBAAIBHGqDC5R6hib5GsUXI8zNFYRAPW0BAAJbqgACo_4YSEcB2rFgDAF4PQQ"],  # tutor4admin/22
                        "children": [
                            {
                                "id": "4.2.3.1",
                                "question": "Как вычислить Telegram ID?",
                                "answer": "Смотрите тут:",
                                "video_ids": ["BAACAgIAAxkBAAIBCWqDCz4iW1AogbLHlQ3LfEt-zQvWAAJQqgACo_4YSFagkXsq3O60PQQ"]  # tutor4admin/32
                            }
                        ]
                    }
                ]
            },
            {
                "id": "4.3",
                "question": "Быстрая блокировка по ссылке",
                "answer": "Видео инструкция:",
                "video_ids": []  # tutor4admin/35 (вставьте file_id)
            }
        ]
    },
    {
        "id": "5",
        "question": "Разбанить пользователя",
        "children": [
            {
                "id": "5.1",
                "question": "Разбанить через Telegram-бот",
                "answer": (
                    "Разбанить в боте:\n\n"
                    "Запустите бота - Нажмите [Разбанить] - [введите @ username | Имя | телеграм ID]"
                )
            },
            {
                "id": "5.2",
                "question": "Разбанить через веб-версию",
                "answer": "Видео инструкция:",
                "video_ids": ["BAACAgIAAxkBAAIBGmqDC5RnxNcZjE9pJNAnt13GglJmAAJVqgACo_4YSMWabV4NkdjFPQQ"]  # tutor4admin/24
            }
        ]
    },
    {
        "id": "6",
        "question": "Панель управления и аналитика",
        "children": [
            {
                "id": "6.1",
                "question": "Общая статистика",
                "answer": "(скоро будет)"
            },
            {
                "id": "6.2",
                "question": "Статистика сообщений",
                "answer": "(скоро будет)"
            },
            {
                "id": "6.3",
                "question": "Статистика пользователей",
                "answer": "(скоро будет)"
            },
            {
                "id": "6.4",
                "question": "Статистика блокировок",
                "answer": "(скоро будет)"
            },
            {
                "id": "6.5",
                "question": "Статистика стоп-слов",
                "answer": "(скоро будет)"
            },
            {
                "id": "6.6",
                "question": "Аналитика",
                "answer": "(скоро будет)"
            }
        ]
    }
]
# ==========================================
# 2. ПАМЯТЬ БОТА
# ==========================================
# Хранит ID видео-сообщений для удаления
user_media_messages: Dict[int, List[int]] = {}
# Хранит текущий раздел пользователя (чтобы работала команда /back)
user_current_node: Dict[int, str] = {}

# ==========================================
# 3. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ И ИНТЕРФЕЙС
# ==========================================
async def delete_previous_videos(chat_id: int, user_id: int, bot: Bot):
    if user_id in user_media_messages and user_media_messages[user_id]:
        for msg_id in user_media_messages[user_id]:
            try:
                await bot.delete_message(chat_id=chat_id, message_id=msg_id)
            except Exception:
                pass
        user_media_messages[user_id].clear()

def find_node(items: List[Dict[str, Any]], target_id: str, parent_id: Optional[str] = None) -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
    for item in items:
        if item["id"] == target_id:
            return item, parent_id
        if "children" in item:
            found, p_id = find_node(item["children"], target_id, item["id"])
            if found:
                return found, p_id
    return None, None

def build_menu_keyboard(children: Optional[List[Dict[str, Any]]] = None, parent_id: Optional[str] = None) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()

    if children:
        for child in children:
            btn_text = f"⚠️ {child['question']}" if child.get("important") else child["question"]
            builder.button(text=btn_text, callback_data=f"faq:{child['id']}")
        builder.adjust(1)

    nav_row = []
    if parent_id:
        nav_row.append(InlineKeyboardButton(text="◀️ Назад", callback_data=f"faq:{parent_id}"))
        nav_row.append(InlineKeyboardButton(text="🏠 Главное меню", callback_data="faq:root"))
    elif not children:
        nav_row.append(InlineKeyboardButton(text="🏠 Главное меню", callback_data="faq:root"))

    if nav_row:
        builder.row(*nav_row)

    return builder.as_markup()

def format_node_text(node: Dict[str, Any]) -> str:
    text_parts = []
    if node.get("important") is True:
        text_parts.append("❗️ <b>ВАЖНО! ОБРАТИТЕ ВНИМАНИЕ</b>\n")
    text_parts.append(f"❓ <b>{node['question']}</b>\n")
    if node.get("answer"):
        text_parts.append(node["answer"])
    return "\n".join(text_parts)

# УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ПЕРЕХОДА ПО МЕНЮ
async def go_to_node(bot: Bot, chat_id: int, user_id: int, node_id: str, message_to_edit: Optional[Message] = None):
    """
    Выполняет все действия по переходу: удаляет видео, запоминает стейт, 
    рендерит текст, отправляет видео и меняет/отправляет меню.
    """
    # 1. Запоминаем где сейчас пользователь
    user_current_node[user_id] = node_id
    
    # 2. Удаляем старые видео
    await delete_previous_videos(chat_id, user_id, bot)

    # 3. Логика Главного меню
    if node_id == "root":
        kb = build_menu_keyboard(children=FAQ_DATA)
        text = "👋 <b>База знаний и инструкции</b>\n\nВыберите нужный раздел:"
        
        if message_to_edit:
            try:
                await message_to_edit.edit_text(text, reply_markup=kb, parse_mode="HTML")
            except Exception:
                pass
        else:
            await bot.send_message(chat_id, text, reply_markup=kb, parse_mode="HTML")
        return

    # 4. Логика Разделов
    node, parent_id = find_node(FAQ_DATA, node_id)
    if not node:
        await bot.send_message(chat_id, "Раздел не найден")
        return

    text = format_node_text(node)
    children = node.get("children")
    kb = build_menu_keyboard(children=children, parent_id=parent_id if parent_id else "root")
    video_ids = node.get("video_ids", [])

    if video_ids:
        # Если есть видео, удаляем старое текстовое сообщение, чтобы меню упало вниз
        if message_to_edit:
            try:
                await message_to_edit.delete()
            except Exception:
                pass

        for video_id in video_ids:
            if video_id:
                try:
                    sent_msg = await bot.send_video(chat_id=chat_id, video=video_id)
                    if user_id not in user_media_messages:
                        user_media_messages[user_id] = []
                    user_media_messages[user_id].append(sent_msg.message_id)
                except Exception as err:
                    logging.error(f"Ошибка отправки видео: {err}")

        # Отправляем новое текстовое меню под видео
        await bot.send_message(chat_id, text, reply_markup=kb, parse_mode="HTML")

    else:
        # Если видео нет, просто редактируем текст (если это клик по кнопке)
        if message_to_edit:
            try:
                await message_to_edit.edit_text(text, reply_markup=kb, parse_mode="HTML")
            except Exception:
                pass
        else:
            # Если вызвано командой, просто отправляем сообщение
            await bot.send_message(chat_id, text, reply_markup=kb, parse_mode="HTML")

# ==========================================
# 4. ДИСПЕТЧЕР И ХЕНДЛЕРЫ
# ==========================================
dp = Dispatcher()

@dp.message(Command("start", "menu"))
async def cmd_start_menu(message: Message, bot: Bot):
    # Обе команды просто отправляют в корень (главное меню)
    await go_to_node(bot, message.chat.id, message.from_user.id, "root")

@dp.message(Command("back"))
async def cmd_back(message: Message, bot: Bot):
    user_id = message.from_user.id
    # Проверяем, где сейчас пользователь. По умолчанию — в корне (root)
    current_node = user_current_node.get(user_id, "root")
    
    if current_node == "root":
        await message.answer("Вы уже находитесь в главном меню.")
        return
        
    # Ищем родителя текущего раздела
    _, parent_id = find_node(FAQ_DATA, current_node)
    
    # Если у раздела нет родителя (или он не найден), кидаем в корень
    target_node = parent_id if parent_id else "root"
    
    # Переходим к найденному узлу
    await go_to_node(bot, message.chat.id, user_id, target_node)

@dp.callback_query(F.data.startswith("faq:"))
async def handle_faq_click(callback: CallbackQuery, bot: Bot):
    node_id = callback.data.split(":")[1]
    # Передаем callback.message как сообщение для редактирования
    await go_to_node(bot, callback.message.chat.id, callback.from_user.id, node_id, message_to_edit=callback.message)
    await callback.answer()

# ВРЕМЕННЫЙ ХЕНДЛЕР ДЛЯ ПОЛУЧЕНИЯ FILE_ID (Для админа)
@dp.message(F.video | F.document)
async def get_video_file_id(message: Message):
    file_id = None
    if message.video:
        file_id = message.video.file_id
    elif message.document and message.document.mime_type and message.document.mime_type.startswith("video/"):
        file_id = message.document.file_id

    if file_id:
        text = f"🎥 <b>file_id вашего видео:</b>\n\n<code>{file_id}</code>"
        await message.reply(text, parse_mode="HTML")

# ==========================================
# 5. ИНИЦИАЛИЗАЦИЯ И СТАРТ
# ==========================================
async def set_bot_commands(bot: Bot):
    """Эта функция создает кнопку меню слева от поля ввода"""
    commands = [
        BotCommand(command="start", description="Перезапустить бота"),
        BotCommand(command="menu", description="Главное меню"),
        BotCommand(command="back", description="Шаг назад")
    ]
    await bot.set_my_commands(commands, scope=BotCommandScopeDefault())

async def main():
    logging.basicConfig(level=logging.INFO)
    token = os.getenv("BOT_TOKEN", "YOUR_TELEGRAM_BOT_TOKEN_HERE")

    bot = Bot(token=token)
    
    # Устанавливаем команды для кнопки "Меню" в Telegram
    await set_bot_commands(bot)
    
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())