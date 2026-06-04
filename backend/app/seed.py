from sqlalchemy.orm import Session

from app import models


def seed_database(db: Session) -> None:
    if db.query(models.User).first():
        return

    db.add(
        models.User(
            id=1,
            name="Демо пользователь",
            email="demo@wpservice.co.il",
            role="client",
            rating=4.8,
            balance=120,
            trust=86,
        )
    )

    db.add_all(
        [
            models.Master(
                id=101,
                name="Илья Коэн",
                profession="Стиральные машины",
                city="Хайфа",
                rating=4.9,
                reviews=214,
                verified=True,
                skills="насосы, модули, коды ошибок",
                price=160,
            ),
            models.Master(
                id=102,
                name="Давид Леви",
                profession="Автоэлектрик",
                city="Нетания",
                rating=4.7,
                reviews=138,
                verified=True,
                skills="диагностика, датчики, CAN",
                price=220,
            ),
            models.Master(
                id=103,
                name="Марина Сегаль",
                profession="Кондиционеры",
                city="Тель-Авив",
                rating=4.95,
                reviews=301,
                verified=True,
                skills="утечки, чистка, платы управления",
                price=190,
            ),
        ]
    )
    db.commit()

    db.add_all(
        [
            models.ServiceRequest(
                id=9001,
                client="Анна",
                category="Стиральная машина",
                city="Хайфа",
                symptom="Не сливает воду, слышен гул",
                budget=350,
                urgency="Сегодня",
                status="booked",
                master_id=101,
                slot="Сегодня 17:00-19:00",
            ),
            models.ServiceRequest(
                id=9002,
                client="Рон",
                category="Автоэлектрика",
                city="Нетания",
                symptom="Ошибка ABS после замены аккумулятора",
                budget=420,
                urgency="Завтра",
                status="open",
            ),
        ]
    )
    db.commit()

    db.add_all(
        [
            models.KnowledgeArticle(
                id="wm-drain-client",
                audience="client",
                category="Стиральные машины",
                title="Машина не сливает воду: как не переплатить",
                difficulty="Безопасно",
                red_flags="Сразу предлагают менять модуль без проверки фильтра, насоса и питания.",
                price_range="Диагностика 120-180 ILS, насос с работой 280-520 ILS.",
                steps=[
                    "Отключите питание и проверьте сливной фильтр.",
                    "Сфотографируйте модель и код ошибки.",
                    "Не разбирайте плату управления без опыта.",
                ],
            ),
            models.KnowledgeArticle(
                id="wm-drain-master",
                audience="master",
                category="Стиральные машины",
                title="Диагностика слива: чек-лист мастера",
                difficulty="Профи",
                red_flags="Фиксируйте фото до/после и согласование цены до замены насоса.",
                price_range="Работа + деталь, гарантия 30-90 дней по типу детали.",
                steps=[
                    "Проверить фильтр, крыльчатку, сливной тракт.",
                    "Проверить питание насоса и прессостат.",
                    "Добавить в заказ фото детали и акт согласования.",
                ],
            ),
            models.KnowledgeArticle(
                id="ac-clean-diy",
                audience="diy",
                category="Кондиционеры",
                title="Чистка фильтров кондиционера своими руками",
                difficulty="Легко",
                red_flags="Не лейте воду на плату и не разбирайте наружный блок без допуска.",
                price_range="Самостоятельно бесплатно, профессиональная чистка 180-350 ILS.",
                steps=[
                    "Выключите питание.",
                    "Снимите и промойте фильтры теплой водой.",
                    "Если есть запах гари, течь или лед, остановитесь и создайте заявку.",
                ],
            ),
            models.KnowledgeArticle(
                id="car-abs-client",
                audience="client",
                category="Автоэлектрика",
                title="ABS после аккумулятора: что спросить у мастера",
                difficulty="Средне",
                red_flags="Не соглашайтесь на замену блока ABS до чтения ошибок сканером.",
                price_range="Компьютерная диагностика 150-250 ILS.",
                steps=[
                    "Запишите, когда появилась ошибка.",
                    "Проверьте, не горят ли другие индикаторы.",
                    "Попросите распечатку или фото кодов ошибок.",
                ],
            ),
        ]
    )

    db.add(models.Booking(id=501, request_id=9001, master_id=101, slot="Сегодня 17:00-19:00"))
    db.commit()

    db.add_all(
        [
            models.InventoryItem(
                sku="PUMP-WM-34",
                name="Насос стиральной машины",
                qty=3,
                supplier="Haifa Parts",
                price=145,
            ),
            models.InventoryItem(
                sku="AC-FILTER-12",
                name="Фильтр кондиционера",
                qty=8,
                supplier="CoolTrade",
                price=38,
            ),
            models.InventoryItem(
                sku="OBD-CAN-2",
                name="OBD адаптер CAN",
                qty=2,
                supplier="AutoDiag",
                price=210,
            ),
        ]
    )

    db.add_all(
        [
            models.ForumTopic(
                id=701,
                author="Илья",
                role="Мастер",
                topic="Как фиксировать отказ клиента?",
                replies=6,
            ),
            models.ForumTopic(
                id=702,
                author="Анна",
                role="Клиент",
                topic="Стиралка гудит: насос или засор?",
                replies=12,
            ),
        ]
    )

    db.add(
        models.Dispute(
            id=301,
            request_id=9001,
            opened_by="Мастер",
            reason="Клиент не открыл дверь после подтвержденного слота",
            status="Сбор доказательств",
        )
    )

    db.commit()
