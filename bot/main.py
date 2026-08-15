import asyncio
import logging
import os
from aiogram import Bot, Dispatcher, F
from aiogram.types import (
    Message, 
    CallbackQuery, 
    InlineKeyboardMarkup, 
    InlineKeyboardButton,
    InputMediaVideo
)
from aiogram.filters import CommandStart
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties
from aiogram.exceptions import TelegramBadRequest

BOT_TOKEN = os.getenv("BOT_TOKEN")
if not BOT_TOKEN:
    raise ValueError("ОШИБКА: Токен бота не найден! Установите переменную окружения BOT_TOKEN.")

# Впишите сюда свой Telegram ID, чтобы только вы могли получать file_id
ADMIN_IDS = [123456789] 

logging.basicConfig(level=logging.INFO)

bot = Bot(
    token=BOT_TOKEN, 
    default=DefaultBotProperties(parse_mode=ParseMode.HTML)
)
dp = Dispatcher()

# Хранилище ID сообщений для очистки чата от "мусора" (особенно от альбомов)
chat_history = {}

async def clear_chat(chat_id: int):
    """Удаляет все предыдущие сообщения бота в чате пользователя."""
    if chat_id in chat_history:
        for msg_id in chat_history[chat_id]:
            try:
                await bot.delete_message(chat_id, msg_id)
            except TelegramBadRequest:
                pass
        chat_history[chat_id] = []

def track_message(chat_id: int, msg_id: int):
    """Запоминает ID сообщения для его последующего удаления."""
    if chat_id not in chat_history:
        chat_history[chat_id] = []
    chat_history[chat_id].append(msg_id)

# ==========================================
# СТРУКТУРА ДАННЫХ
# ==========================================
faq_data = [
    {
        "id": "1",
        "question": "Хочу заблокировать пользователя",
        "answer": "Он состоит в наших чатах?",
        "children": [
            {
                "id": "1.1",
                "question": "Да",
                "answer": "",
                "children": [
                    {
                        "id": "1.1.1",
                        "question": "Я знаю его номер телефона",
                        "answer": "Посмотрите эти видео инструкции:",
                        "video_ids": [
                            "BAACAgIAAxkBAAMLaoDWWdWGa9YCJuCKUCbxA1L9WosAAiigAAI76QlI2XM6ni0sw4g9BA", 
                            "BAACAgIAAxkBAAMLaoDWWdWGa9YCJuCKUCbxA1L9WosAAiigAAI76QlI2XM6ni0sw4g9BA"
                        ]
                    },
                    {
                        "id": "1.1.2",
                        "question": "Я знаю его @username",
                        "answer": "Видео инструкция",
                        "video_ids": ["BAACAgIAAxkBAAM8aoDaZDiZwM4DgkPrJ6_zslgDjVUAApqrAAJ44ghIP3si_6liTis9BA", "BAACAgIAAxkBAAM-aoDaZvwaTY6fbYvo9OjZRA89qlAAApurAAJ44ghI4uFSkH7DPiY9BA"]
                    },
                    {
                        "id": "1.1.3",
                        "question": "Я знаю его Имя в телеграме",
                        "answer": "Видео инструкция",
                        "video_ids": ["BAACAgIAAxkBAAM4aoDaHTdJwCQakoxv97D4OSxYhBsAApirAAJ44ghIgW1PICCYSLg9BA", "BAACAgIAAxkBAAM6aoDaMmiyFWAQq7V24ln-NJEJpBIAApmrAAJ44ghIILTTi08NueU9BA"]
                    },
                    {
                        "id": "1.1.4",
                        "question": "Я знаю его сообщение в одном из наших чатов",
                        "answer": "Видео инструкция",
                        "video_ids": ["BAACAgIAAxkBAAMLaoDWWdWGa9YCJuCKUCbxA1L9WosAAiigAAI76QlI2XM6ni0sw4g9BA"]
                    },
                    {
                        "id": "1.1.5",
                        "question": "Не знаю о нем ничего",
                        "answer": "Возвращайтесь, когда узнаете хоть что-то",
                        "video_ids": ["BAACAgIAAxkBAAM2aoDZzI2eGEkU6bYOz_lkFqkkzrwAAperAAJ44ghIUFJChwRaJeo9BA"]
                    },
                ]
            },
            {
                "id": "1.2",
                "question": "Нет",
                "answer": "Он состоит в наших чатах?",
                "children": [
                    {
                        "id": "1.2.1",
                        "question": "Написал мне в личные сообщения",
                        "answer": "В его профиле есть username, номер телефона, Имя",
                        "children": [
                            {
                                "id": "1.2.1.1",
                                "question": "Да",
                                "answer": "Видео инструкция",
                                "video_ids": ["BAACAgIAAxkBAAMLaoDWWdWGa9YCJuCKUCbxA1L9WosAAiigAAI76QlI2XM6ni0sw4g9BA"]
                            },
                            {
                                "id": "1.2.1.2",
                                "question": "Нет",
                                "answer": "Видео инструкция",
                                "video_ids": ["BAACAgIAAxkBAAMLaoDWWdWGa9YCJuCKUCbxA1L9WosAAiigAAI76QlI2XM6ni0sw4g9BA"]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "2",
        "question": "Как искать негодяя?",
        "answer": "Выберите вариант:",
        "children": [
            {
                "id": "2.1",
                "question": "В веб версии: По истории сообщений за последние 72 часа",
                "answer": "Видео инструкция",
                "video_ids": ["BAACAgIAAxkBAAM0aoDZwmNi37rVIE11B3ex2lRYKCgAAparAAJ44ghI4ISCPzyEIL89BA"]
            },
            {
                "id": "2.2",
                "question": "В веб версии: По стоп-словам в истории сообщений за 72 часа",
                "answer": "Видео инструкция",
                "video_ids": ["BAACAgIAAxkBAAMyaoDZdoPmIUFaUVcShed69M4t77YAApOrAAJ44ghIfvteWptYrx49BA"]
            }
        ]
    },
    {
        "id": "3",
        "question": "Возможности телеграм бота администраторов",
        "answer": "Видео инструкция",
        "video_ids": ["BAACAgIAAxkBAANCaoDbZaBH4cFSTLpZM3uKT101qXMAAqCrAAJ44ghIi16w_Wa8bis9BA"]
    },
    {
        "id": "4",
        "question": "Возможности веб версии панели администраторов",
        "answer": "Видео инструкция",
        "video_ids": ["BAACAgIAAxkBAANEaoDbcZKhWenZlsJTa4X_mhrAQjQAAqGrAAJ44ghIlrGzWBj0o0E9BA"]
    }
]

# ==========================================
# ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
# ==========================================
def find_node(data: list, target_id: str) -> dict | None:
    for item in data:
        if item["id"] == target_id:
            return item
        if "children" in item:
            found = find_node(item["children"], target_id)
            if found:
                return found
    return None

def build_keyboard(children: list, parent_id: str | None = None) -> InlineKeyboardMarkup:
    keyboard = []
    for child in children:
        keyboard.append([InlineKeyboardButton(text=child["question"], callback_data=f"faq_{child['id']}")])
        
    if parent_id is not None:
        back_cb = f"faq_{parent_id}" if parent_id else "faq_root"
        keyboard.append([InlineKeyboardButton(text="🔙 Назад", callback_data=back_cb)])
        
    return InlineKeyboardMarkup(inline_keyboard=keyboard)


# ==========================================
# ОБРАБОТЧИКИ
# ==========================================

@dp.message(CommandStart())
async def cmd_start(message: Message):
    await clear_chat(message.chat.id)
    
    kb = build_keyboard(faq_data)
    msg = await message.answer(
        "👋 <b>Добро пожаловать в базу знаний!</b>\n\nВыберите категорию:",
        reply_markup=kb
    )
    track_message(message.chat.id, msg.message_id)

@dp.callback_query(F.data == "faq_root")
async def process_root_callback(callback: CallbackQuery):
    await clear_chat(callback.message.chat.id)
    
    kb = build_keyboard(faq_data)
    msg = await bot.send_message(
        chat_id=callback.message.chat.id,
        text="👋 <b>Добро пожаловать в базу знаний!</b>\n\nВыберите категорию:",
        reply_markup=kb
    )
    track_message(callback.message.chat.id, msg.message_id)
    await callback.answer()

@dp.callback_query(F.data.startswith("faq_"))
async def process_faq_node(callback: CallbackQuery):
    node_id = callback.data.split("_")[1]
    node = find_node(faq_data, node_id)
    
    if not node:
        await callback.answer("Раздел не найден", show_alert=True)
        return

    # Очищаем старые меню и видео перед отправкой новых
    await clear_chat(callback.message.chat.id)

    parent_id = ".".join(node_id.split(".")[:-1])
    
    question = node.get("question", "")
    answer = node.get("answer", "")
    
    text = f"🔹 <b>{question}</b>\n"
    if answer:
        text += f"\n{answer}"

    # СЦЕНАРИЙ 1: Есть вложенные вопросы (меню)
    if "children" in node and node["children"]:
        kb = build_keyboard(node["children"], parent_id)
        msg = await bot.send_message(
            chat_id=callback.message.chat.id,
            text=text if text.strip() else "Выберите вариант:",
            reply_markup=kb
        )
        track_message(callback.message.chat.id, msg.message_id)
        
    # СЦЕНАРИЙ 2: Конечный ответ с возможными видео
    else:
        back_cb = f"faq_{parent_id}" if parent_id else "faq_root"
        kb = InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="🔙 Назад", callback_data=back_cb)]
        ])
        
        raw_videos = node.get("video_ids", [])
        if not raw_videos and node.get("video_id"):
            raw_videos = [node["video_id"]]
            
        video_ids = [v for v in raw_videos if v and v != "СЮДА_ВСТАВИТЕ_ID_ВИДЕО"]

        # Вариант А: ОДНО ВИДЕО
        if len(video_ids) == 1:
            try:
                msg = await bot.send_video(
                    chat_id=callback.message.chat.id,
                    video=video_ids[0],
                    caption=text,
                    reply_markup=kb
                )
                track_message(callback.message.chat.id, msg.message_id)
            except TelegramBadRequest:
                msg = await bot.send_message(
                    chat_id=callback.message.chat.id,
                    text=text + "\n\n<i>⚠️ Ошибка: Видео не найдено.</i>",
                    reply_markup=kb
                )
                track_message(callback.message.chat.id, msg.message_id)

        # Вариант Б: НЕСКОЛЬКО ВИДЕО (Галерея)
        elif len(video_ids) > 1:
            media = [InputMediaVideo(media=v_id) for v_id in video_ids]
            media[0] = media[0].model_copy(update={"caption": text})
            
            try:
                # Отправляем альбом и сохраняем ID каждого видео в альбоме
                messages = await bot.send_media_group(
                    chat_id=callback.message.chat.id,
                    media=media
                )
                for m in messages:
                    track_message(callback.message.chat.id, m.message_id)
                    
                msg = await bot.send_message(
                    chat_id=callback.message.chat.id,
                    text="👇 <b>Используйте кнопку ниже для навигации:</b>",
                    reply_markup=kb
                )
                track_message(callback.message.chat.id, msg.message_id)
                
            except TelegramBadRequest:
                msg = await bot.send_message(
                    chat_id=callback.message.chat.id,
                    text=text + "\n\n<i>⚠️ Ошибка при загрузке альбома видео.</i>",
                    reply_markup=kb
                )
                track_message(callback.message.chat.id, msg.message_id)

        # Вариант В: БЕЗ ВИДЕО
        else:
            msg = await bot.send_message(
                chat_id=callback.message.chat.id,
                text=text,
                reply_markup=kb
            )
            track_message(callback.message.chat.id, msg.message_id)

    await callback.answer()

# ==========================================
# ПОЛУЧЕНИЕ FILE_ID ДЛЯ ВИДЕО (Только админам)
# ==========================================
@dp.message(F.video, F.from_user.id.in_(ADMIN_IDS))
async def handle_video(message: Message):
    video_id = message.video.file_id
    await message.reply(
        f"✅ <b>file_id получен:</b>\n\n"
        f"<code>{video_id}</code>\n\n"
        f"<i>Скопируйте его в массив video_ids нужного вопроса.</i>"
    )

# ==========================================
# ЗАПУСК
# ==========================================
async def main():
    print("Бот запущен!")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())