# TrackQuest

**TrackQuest** — это система для управления обращениями. Она позволяет создавать, обрабатывать, завершать и отменять обращения, а также получать список обращений с фильтрацией по дате.

## Функциональность

Каждое обращение может иметь следующие статусы:  
- **Новое**  
- **В работе**  
- **Завершено**  
- **Отменено**

### Реализованные эндпоинты:

1. **Создать обращение**  
   - Метод: `POST /requests/create`  
   - Параметры:  
     ```json
     {
       "topic": "string",
       "message": "string"
     }
     ```
   - Ответ:  
     ```json
     {
       "message": "Request created successfully"
     }
     ```

2. **Взять обращение в работу**  
   - Метод: `PATCH /requests/start?id={id}`  
   - Ответ:  
     ```json
     {
       "message": "Request started successfully"
     }
     ```

3. **Завершить обработку обращения**  
   - Метод: `PATCH /requests/complete?id={id}`  
   - Параметры:  
     ```json
     {
       "text_answer": "string"
     }
     ```
   - Ответ:  
     ```json
     {
       "message": "Request completed successfully"
     }
     ```

4. **Отмена обращения**  
   - Метод: `PATCH /requests/close?id={id}`  
   - Параметры:  
     ```json
     {
       "reason_cancelled": "string"
     }
     ```
   - Ответ:  
     ```json
     {
       "message": "Request closed successfully"
     }
     ```

5. **Получить список обращений с фильтрацией по дате**  
   - Метод: `GET /requests/getWithFilters?dateFrom={dateFrom}&dateTo={dateTo}`  
   - Параметры:  
     - `dateFrom` (обязательно): дата в формате `DD.MM.YYYY`.  
     - `dateTo` (опционально): дата в формате `DD.MM.YYYY`.  
   - Ответ:  
     ```json
     {
       "requests": [
         {
           "id": 1,
           "topic": "string",
           "message": "string",
           "status": "NEW",
           "created_at": "2025-04-05T00:00:00.000Z",
           "updated_at": "2025-04-05T00:00:00.000Z"
         }
       ]
     }
     ```

6. **Отменить все обращения в статусе "В работе"**  
   - Метод: `PATCH /requests/cancelAllWorks`  
   - Ответ:  
     ```json
     {
       "message": "All requests closed successfully"
     }
     ```

---

## Установка и запуск

### 1. Клонирование репозитория
```bash
git clone https://github.com/Oktawn/TrackQuest.git
cd TrackQuest
npm install
```

### 2. Настройка переменных окружения
Создайте файл `.env` в корневой директории проекта и добавьте следующие переменные:
```plaintext
API_PORT=5000
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=5432
DB_EXTERNAL_PORT=27015
```

### 3. Запуск проекта

В режиме разработки:
```bash
npm run dev
```

В режиме продакшена:
```
npm run build
npm start
```

### Технологии
* Node.js
* Express.js
* TypeScript
* PostgreSQL
* TypeORM


### Примечания

* Все даты должны быть переданы в формате DD.MM.YYYY.