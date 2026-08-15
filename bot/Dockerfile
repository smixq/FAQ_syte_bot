# Используем легковесный образ Python
FROM python:3.11-slim

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файл с зависимостями и устанавливаем их
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Создаем папку для базы данных, чтобы aiosqlite не выдал ошибку при первом запуске
RUN mkdir -p data

# Копируем весь остальной код (main.py)
COPY . .

# Команда для запуска бота
CMD ["python", "main.py"]