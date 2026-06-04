(function () {
  const storageKey = "wp-service-mvp-state-v1";

  const navItems = [
    { id: "dashboard", title: "Панель", icon: "DB" },
    { id: "requests", title: "Заявки", icon: "RQ" },
    { id: "knowledge", title: "База знаний", icon: "KB" },
    { id: "booking", title: "Бронирование", icon: "BK" },
    { id: "checkin", title: "Приезд мастера", icon: "IN" },
    { id: "crm", title: "CRM и склад", icon: "CM" },
    { id: "forum", title: "Форум", icon: "FR" },
    { id: "arbitration", title: "Арбитраж", icon: "AR" },
    { id: "admin", title: "Админка", icon: "AD" }
  ];

  const roleNames = {
    client: "Клиент",
    master: "Мастер",
    store: "Магазин запчастей",
    support: "Поддержка",
    admin: "Администратор"
  };

  const statusNames = {
    open: "Новая",
    booked: "Забронирована",
    done: "Завершена",
    dispute: "Спор",
    proof: "Есть доказательство"
  };

  const seedState = {
    route: "dashboard",
    role: "client",
    theme: "light",
    currentUser: {
      id: 1,
      name: "Демо пользователь",
      email: "demo@wpservice.co.il",
      rating: 4.8,
      balance: 120,
      trust: 86
    },
    masters: [
      {
        id: 101,
        name: "Илья Коэн",
        profession: "Стиральные машины",
        city: "Хайфа",
        rating: 4.9,
        reviews: 214,
        verified: true,
        skills: "насосы, модули, коды ошибок",
        price: 160
      },
      {
        id: 102,
        name: "Давид Леви",
        profession: "Автоэлектрик",
        city: "Нетания",
        rating: 4.7,
        reviews: 138,
        verified: true,
        skills: "диагностика, датчики, CAN",
        price: 220
      },
      {
        id: 103,
        name: "Марина Сегаль",
        profession: "Кондиционеры",
        city: "Тель-Авив",
        rating: 4.95,
        reviews: 301,
        verified: true,
        skills: "утечки, чистка, платы управления",
        price: 190
      }
    ],
    requests: [
      {
        id: 9001,
        client: "Анна",
        category: "Стиральная машина",
        city: "Хайфа",
        symptom: "Не сливает воду, слышен гул",
        budget: 350,
        urgency: "Сегодня",
        status: "booked",
        masterId: 101,
        slot: "Сегодня 17:00-19:00",
        evidence: []
      },
      {
        id: 9002,
        client: "Рон",
        category: "Автоэлектрика",
        city: "Нетания",
        symptom: "Ошибка ABS после замены аккумулятора",
        budget: 420,
        urgency: "Завтра",
        status: "open",
        masterId: null,
        slot: "",
        evidence: []
      }
    ],
    knowledge: [
      {
        id: "wm-drain-client",
        audience: "client",
        category: "Стиральные машины",
        title: "Машина не сливает воду: как не переплатить",
        difficulty: "Безопасно",
        redFlags: "Сразу предлагают менять модуль без проверки фильтра, насоса и питания.",
        priceRange: "Диагностика 120-180 ILS, насос с работой 280-520 ILS.",
        steps: [
          "Отключите питание и проверьте сливной фильтр.",
          "Сфотографируйте модель и код ошибки.",
          "Не разбирайте плату управления без опыта."
        ]
      },
      {
        id: "wm-drain-master",
        audience: "master",
        category: "Стиральные машины",
        title: "Диагностика слива: чек-лист мастера",
        difficulty: "Профи",
        redFlags: "Фиксируйте фото до/после и согласование цены до замены насоса.",
        priceRange: "Работа + деталь, гарантия 30-90 дней по типу детали.",
        steps: [
          "Проверить фильтр, крыльчатку, сливной тракт.",
          "Проверить питание насоса и прессостат.",
          "Добавить в заказ фото детали и акт согласования."
        ]
      },
      {
        id: "ac-clean-diy",
        audience: "diy",
        category: "Кондиционеры",
        title: "Чистка фильтров кондиционера своими руками",
        difficulty: "Легко",
        redFlags: "Не лейте воду на плату и не разбирайте наружный блок без допуска.",
        priceRange: "Самостоятельно бесплатно, профессиональная чистка 180-350 ILS.",
        steps: [
          "Выключите питание.",
          "Снимите и промойте фильтры теплой водой.",
          "Если есть запах гари, течь или лед, остановитесь и создайте заявку."
        ]
      },
      {
        id: "car-abs-client",
        audience: "client",
        category: "Автоэлектрика",
        title: "ABS после аккумулятора: что спросить у мастера",
        difficulty: "Средне",
        redFlags: "Не соглашайтесь на замену блока ABS до чтения ошибок сканером.",
        priceRange: "Компьютерная диагностика 150-250 ILS.",
        steps: [
          "Запишите, когда появилась ошибка.",
          "Проверьте, не горят ли другие индикаторы.",
          "Попросите распечатку или фото кодов ошибок."
        ]
      }
    ],
    bookings: [
      { id: 501, requestId: 9001, masterId: 101, slot: "Сегодня 17:00-19:00", status: "Подтверждено" }
    ],
    inventory: [
      { sku: "PUMP-WM-34", name: "Насос стиральной машины", qty: 3, supplier: "Haifa Parts", price: 145 },
      { sku: "AC-FILTER-12", name: "Фильтр кондиционера", qty: 8, supplier: "CoolTrade", price: 38 },
      { sku: "OBD-CAN-2", name: "OBD адаптер CAN", qty: 2, supplier: "AutoDiag", price: 210 }
    ],
    forum: [
      { id: 701, author: "Илья", role: "Мастер", topic: "Как фиксировать отказ клиента?", replies: 6 },
      { id: 702, author: "Анна", role: "Клиент", topic: "Стиралка гудит: насос или засор?", replies: 12 }
    ],
    disputes: [
      {
        id: 301,
        requestId: 9001,
        openedBy: "Мастер",
        reason: "Клиент не открыл дверь после подтвержденного слота",
        status: "Сбор доказательств"
      }
    ],
    proofLog: []
  };

  let state = loadState();
  let kbAudience = "all";
  let cameraStream = null;

  const root = document.getElementById("appRoot");
  const pageTitle = document.getElementById("pageTitle");
  const roleSelect = document.getElementById("roleSelect");
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const themeLabel = document.getElementById("themeLabel");
  const navList = document.getElementById("navList");
  const userStrip = document.getElementById("userStrip");
  const dialog = document.getElementById("appDialog");
  const dialogTitle = document.getElementById("dialogTitle");
  const dialogBody = document.getElementById("dialogBody");

  function loadState() {
    try {
      const raw = localStorage.getItem(storageKey);
      const loaded = raw ? JSON.parse(raw) : seedState;
      return { ...seedState, ...loaded };
    } catch (error) {
      return seedState;
    }
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function resetDemo() {
    state = JSON.parse(JSON.stringify(seedState));
    saveState();
    render();
  }

  function applyTheme() {
    const theme = state.theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    if (themeIcon) themeIcon.textContent = theme === "dark" ? "☾" : "☀";
    if (themeLabel) themeLabel.textContent = theme === "dark" ? "Темная" : "Светлая";
    if (themeToggle) themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  }

  function formatMoney(value) {
    return new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(value);
  }

  function nowLabel() {
    return new Intl.DateTimeFormat("ru-RU", {
      dateStyle: "medium",
      timeStyle: "medium"
    }).format(new Date());
  }

  function setClock() {
    const clock = document.getElementById("serverClock");
    const today = document.getElementById("todayLabel");
    if (clock) {
      clock.textContent = new Intl.DateTimeFormat("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }).format(new Date());
    }
    if (today) {
      today.textContent = new Intl.DateTimeFormat("ru-RU", { dateStyle: "full" }).format(new Date());
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function initials(name) {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  function statusBadge(status) {
    return `<span class="status ${status}">${statusNames[status] || escapeHtml(status)}</span>`;
  }

  function getMaster(id) {
    return state.masters.find((master) => master.id === Number(id));
  }

  function setRoute(route) {
    state.route = route;
    saveState();
    render();
  }

  function renderNav() {
    navList.innerHTML = navItems
      .map(
        (item) => `
          <button class="nav-button ${state.route === item.id ? "active" : ""}" data-route="${item.id}">
            <span class="nav-icon">${item.icon}</span>
            <span>${item.title}</span>
          </button>
        `
      )
      .join("");
  }

  function renderUserStrip() {
    const user = state.currentUser;
    userStrip.innerHTML = `
      <div class="profile-line">
        <div class="avatar">${initials(user.name)}</div>
        <div>
          <strong>${escapeHtml(user.name)} · ${roleNames[state.role]}</strong>
          <p>${escapeHtml(user.email)} · рейтинг ${user.rating} · доверие ${user.trust}%</p>
        </div>
      </div>
      <div class="balance-pills">
        <span class="pill">Баланс <strong>${formatMoney(user.balance)}</strong></span>
        <span class="pill">Активные заявки <strong>${state.requests.filter((item) => item.status !== "done").length}</strong></span>
        <button class="ghost-button" data-action="reset">Сбросить демо</button>
      </div>
    `;
  }

  function render() {
    applyTheme();
    setClock();
    roleSelect.value = state.role;
    renderNav();
    renderUserStrip();

    const current = navItems.find((item) => item.id === state.route);
    pageTitle.textContent = current ? current.title : "Панель";

    const renderers = {
      dashboard: renderDashboard,
      requests: renderRequests,
      knowledge: renderKnowledge,
      booking: renderBooking,
      checkin: renderCheckin,
      crm: renderCrm,
      forum: renderForum,
      arbitration: renderArbitration,
      admin: renderAdmin
    };

    root.innerHTML = (renderers[state.route] || renderDashboard)();
    bindPageEvents();
  }

  function renderDashboard() {
    const active = state.requests.filter((request) => request.status !== "done").length;
    const booked = state.bookings.length;
    const proofs = state.proofLog.length;
    const avgRating = (
      state.masters.reduce((sum, master) => sum + master.rating, 0) / state.masters.length
    ).toFixed(2);

    return `
      <div class="grid-4">
        <article class="card metric">
          <span class="eyebrow">Заявки</span>
          <strong>${active}</strong>
          <p>Новые, забронированные и спорные работы.</p>
        </article>
        <article class="card metric">
          <span class="eyebrow">Бронирования</span>
          <strong>${booked}</strong>
          <p>Слоты мастеров с подтверждением клиента.</p>
        </article>
        <article class="card metric">
          <span class="eyebrow">Доказательства</span>
          <strong>${proofs}</strong>
          <p>Check-in записи приезда мастеров.</p>
        </article>
        <article class="card metric">
          <span class="eyebrow">Рейтинг</span>
          <strong>${avgRating}</strong>
          <p>Средняя оценка проверенных мастеров.</p>
        </article>
      </div>

      <div class="grid-2">
        <section class="panel">
          <div class="list-head">
            <div>
              <span class="eyebrow">Быстрый сценарий</span>
              <h2>Создать заявку и подобрать мастера</h2>
            </div>
            <button class="button" data-action="go" data-route="requests">Создать</button>
          </div>
          <div class="map-visual">
            <img src="./assets/service-board.svg" alt="Схема работы сервиса: заявка, мастер, доказательство, отзыв" />
          </div>
        </section>

        <section class="panel">
          <span class="eyebrow">Топ мастера</span>
          <div class="list">
            ${state.masters
              .map(
                (master) => `
                  <article class="list-item">
                    <div class="list-head">
                      <div>
                        <strong>${escapeHtml(master.name)}</strong>
                        <p>${escapeHtml(master.profession)} · ${escapeHtml(master.city)} · ${escapeHtml(master.skills)}</p>
                      </div>
                      <span class="pill"><strong>${master.rating}</strong> / ${master.reviews}</span>
                    </div>
                    <div class="actions">
                      <button class="ghost-button" data-action="go" data-route="booking">Забронировать</button>
                      <button class="ghost-button" data-action="go" data-route="knowledge">База знаний</button>
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
        </section>
      </div>
    `;
  }

  function renderRequests() {
    return `
      <section class="panel">
        <div class="list-head">
          <div>
            <span class="eyebrow">Клиентская заявка</span>
            <h2>Новая работа</h2>
          </div>
        </div>
        <form class="form-grid" data-form="request">
          <label class="field">
            <span>Клиент</span>
            <input name="client" value="${escapeHtml(state.currentUser.name)}" required />
          </label>
          <label class="field">
            <span>Город</span>
            <input name="city" placeholder="Хайфа" required />
          </label>
          <label class="field">
            <span>Категория</span>
            <select name="category">
              <option>Стиральная машина</option>
              <option>Кондиционер</option>
              <option>Автоэлектрика</option>
              <option>Сантехника</option>
              <option>Электрика</option>
            </select>
          </label>
          <label class="field">
            <span>Срочность</span>
            <select name="urgency">
              <option>Сегодня</option>
              <option>Завтра</option>
              <option>На неделе</option>
              <option>Не срочно</option>
            </select>
          </label>
          <label class="field">
            <span>Бюджет, ILS</span>
            <input name="budget" type="number" min="0" value="300" />
          </label>
          <label class="field">
            <span>Желаемое окно</span>
            <input name="slot" placeholder="Завтра 10:00-12:00" />
          </label>
          <label class="field full">
            <span>Симптом и что уже пробовали</span>
            <textarea name="symptom" placeholder="Опишите проблему, код ошибки, фото/видео можно будет добавить в backend версии" required></textarea>
          </label>
          <div class="actions field full">
            <button class="button" type="submit">Создать заявку</button>
            <button class="ghost-button" type="button" data-action="go" data-route="knowledge">Сначала проверить базу знаний</button>
          </div>
        </form>
      </section>

      <section class="panel">
        <span class="eyebrow">Работы</span>
        <div class="list">
          ${renderRequestList()}
        </div>
      </section>
    `;
  }

  function renderRequestList() {
    if (!state.requests.length) {
      return `<div class="empty">Заявок пока нет.</div>`;
    }

    return state.requests
      .map((request) => {
        const master = request.masterId ? getMaster(request.masterId) : null;
        return `
          <article class="list-item">
            <div class="list-head">
              <div>
                <strong>#${request.id} · ${escapeHtml(request.category)} · ${escapeHtml(request.city)}</strong>
                <p>${escapeHtml(request.symptom)}</p>
              </div>
              ${statusBadge(request.status)}
            </div>
            <div class="balance-pills">
              <span class="pill">Бюджет <strong>${formatMoney(request.budget)}</strong></span>
              <span class="pill">Срочность <strong>${escapeHtml(request.urgency)}</strong></span>
              <span class="pill">Мастер <strong>${master ? escapeHtml(master.name) : "не выбран"}</strong></span>
              ${request.slot ? `<span class="pill">Слот <strong>${escapeHtml(request.slot)}</strong></span>` : ""}
            </div>
            <div class="actions">
              <button class="ghost-button" data-action="assign" data-request-id="${request.id}">Назначить мастера</button>
              <button class="ghost-button" data-action="done" data-request-id="${request.id}">Завершить</button>
              <button class="danger-button" data-action="dispute" data-request-id="${request.id}">Открыть спор</button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderKnowledge() {
    const filters = [
      { id: "all", label: "Все" },
      { id: "client", label: "Для клиента" },
      { id: "master", label: "Для мастера" },
      { id: "diy", label: "Сделать самому" }
    ];
    const items = state.knowledge.filter((item) => kbAudience === "all" || item.audience === kbAudience);

    return `
      <section class="panel">
        <div class="list-head">
          <div>
            <span class="eyebrow">Защита обеих сторон</span>
            <h2>База знаний без унижения и разводов</h2>
            <p>Материалы ведут клиента к нормальному ТЗ, мастера к доказательствам, DIY-пользователя к безопасной границе.</p>
          </div>
        </div>
        <div class="kb-filter">
          ${filters
            .map(
              (filter) => `
                <button class="chip ${kbAudience === filter.id ? "active" : ""}" data-action="filter-kb" data-audience="${filter.id}">
                  ${filter.label}
                </button>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="grid-2">
        ${items
          .map(
            (item) => `
              <article class="card knowledge-card ${item.audience}">
                <span class="eyebrow">${audienceName(item.audience)} · ${escapeHtml(item.category)}</span>
                <h3>${escapeHtml(item.title)}</h3>
                <p><strong>Сложность:</strong> ${escapeHtml(item.difficulty)}</p>
                <p><strong>Красный флаг:</strong> ${escapeHtml(item.redFlags)}</p>
                <p><strong>Ориентир цены:</strong> ${escapeHtml(item.priceRange)}</p>
                <ol class="safe-steps">
                  ${item.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
                </ol>
                <div class="actions">
                  <button class="button" data-action="go" data-route="requests">Создать заявку по теме</button>
                </div>
              </article>
            `
          )
          .join("")}
      </section>
    `;
  }

  function audienceName(audience) {
    return {
      client: "Клиент",
      master: "Мастер",
      diy: "DIY"
    }[audience] || audience;
  }

  function renderBooking() {
    const slots = ["Сегодня 17:00-19:00", "Завтра 09:00-11:00", "Завтра 14:00-16:00", "Пятница 10:00-12:00", "Пятница 18:00-20:00", "Суббота 11:00-13:00"];
    return `
      <section class="grid-2">
        <div class="panel">
          <span class="eyebrow">Слоты</span>
          <h2>Забронировать мастера</h2>
          <p>В backend версии система будет учитывать район, дорогу, буфер между заказами, отмены и минимальный выезд.</p>
          <div class="booking-board">
            ${state.masters
              .map((master, index) =>
                slots
                  .slice(index, index + 2)
                  .map(
                    (slot) => `
                      <button class="slot" data-action="book" data-master-id="${master.id}" data-slot="${escapeHtml(slot)}">
                        <strong>${escapeHtml(slot)}</strong>
                        <span>${escapeHtml(master.name)}</span>
                        <span>${escapeHtml(master.profession)} · ${formatMoney(master.price)}</span>
                      </button>
                    `
                  )
                  .join("")
              )
              .join("")}
          </div>
        </div>
        <div class="panel">
          <span class="eyebrow">Подтвержденные брони</span>
          <div class="list">
            ${state.bookings
              .map((booking) => {
                const master = getMaster(booking.masterId);
                return `
                  <article class="list-item">
                    <strong>Бронь #${booking.id}</strong>
                    <p>Заявка #${booking.requestId} · ${master ? escapeHtml(master.name) : "мастер"} · ${escapeHtml(booking.slot)}</p>
                    <span class="status booked">${escapeHtml(booking.status)}</span>
                  </article>
                `;
              })
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderCheckin() {
    const activeRequests = state.requests.filter((request) => request.status !== "done");
    return `
      <section class="grid-2">
        <div class="panel">
          <span class="eyebrow">Доказательство приезда</span>
          <h2>Check-in мастера у клиента</h2>
          <p>В рабочей версии время берется с backend сервера, видео загружается сразу на сервер, а GPS проверяется по адресу заказа.</p>

          <label class="field">
            <span>Заказ</span>
            <select id="checkinRequest">
              ${activeRequests.map((request) => `<option value="${request.id}">#${request.id} · ${escapeHtml(request.category)} · ${escapeHtml(request.city)}</option>`).join("")}
            </select>
          </label>

          <div class="camera-box" id="cameraBox">
            <video id="cameraVideo" autoplay muted playsinline></video>
            <div class="watermark">
              <span>WP Service · доказательство приезда</span>
              <strong id="proofClock">${nowLabel()}</strong>
              <span id="proofGeo">GPS ожидает подтверждения</span>
            </div>
          </div>

          <div class="actions">
            <button class="button" data-action="start-camera">Включить камеру</button>
            <button class="ghost-button" data-action="get-geo">Проверить GPS</button>
            <button class="danger-button" data-action="create-proof">Клиент не открыл / отказался</button>
          </div>
        </div>

        <div class="panel">
          <span class="eyebrow">Журнал</span>
          <div class="list">
            ${
              state.proofLog.length
                ? state.proofLog
                    .map(
                      (proof) => `
                        <article class="list-item">
                          <div class="list-head">
                            <strong>#${proof.id} · заказ #${proof.requestId}</strong>
                            <span class="status proof">check-in</span>
                          </div>
                          <p>${escapeHtml(proof.createdAt)}</p>
                          <p>${escapeHtml(proof.geo)}</p>
                          <p>${escapeHtml(proof.note)}</p>
                        </article>
                      `
                    )
                    .join("")
                : `<div class="empty">Доказательств пока нет.</div>`
            }
          </div>
        </div>
      </section>
    `;
  }

  function renderCrm() {
    return `
      <section class="grid-2">
        <div class="panel">
          <span class="eyebrow">Склад мастера</span>
          <h2>Запчасти и поставщики</h2>
          <table>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Деталь</th>
                <th>Остаток</th>
                <th>Поставщик</th>
                <th>Цена</th>
              </tr>
            </thead>
            <tbody>
              ${state.inventory
                .map(
                  (item) => `
                    <tr>
                      <td>${escapeHtml(item.sku)}</td>
                      <td>${escapeHtml(item.name)}</td>
                      <td>${item.qty}</td>
                      <td>${escapeHtml(item.supplier)}</td>
                      <td>${formatMoney(item.price)}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </div>

        <div class="panel">
          <span class="eyebrow">Мини CRM</span>
          <h2>Что появится после backend</h2>
          <div class="list">
            <article class="list-item">
              <strong>Клиенты и гарантия</strong>
              <p>История работ, фото до/после, сроки гарантии, повторные визиты.</p>
            </article>
            <article class="list-item">
              <strong>Сметы и акты</strong>
              <p>Шаблоны цен, согласование через платформу, защита в споре.</p>
            </article>
            <article class="list-item">
              <strong>Поставщики</strong>
              <p>Остатки магазинов, аналоги деталей, резервирование запчасти под заказ.</p>
            </article>
          </div>
        </div>
      </section>
    `;
  }

  function renderForum() {
    return `
      <section class="grid-2">
        <div class="panel">
          <span class="eyebrow">Общение</span>
          <h2>Форум и поддержка</h2>
          <form class="form-grid" data-form="forum">
            <label class="field full">
              <span>Тема</span>
              <input name="topic" placeholder="Например: клиент спорит по диагностике" required />
            </label>
            <div class="actions field full">
              <button class="button" type="submit">Добавить тему</button>
            </div>
          </form>
          <div class="list">
            ${state.forum
              .map(
                (topic) => `
                  <article class="list-item">
                    <strong>${escapeHtml(topic.topic)}</strong>
                    <p>${escapeHtml(topic.author)} · ${escapeHtml(topic.role)} · ответов: ${topic.replies}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
        <div class="panel">
          <span class="eyebrow">Правила доверия</span>
          <div class="list">
            <article class="list-item">
              <strong>Клиент защищен</strong>
              <p>Отзывы только после реальных заявок, смета фиксируется до работ, база знаний показывает красные флаги.</p>
            </article>
            <article class="list-item">
              <strong>Мастер защищен</strong>
              <p>Подтвержденный слот, минимальный выезд, check-in, история переписки и фото.</p>
            </article>
          </div>
        </div>
      </section>
    `;
  }

  function renderArbitration() {
    return `
      <section class="grid-2">
        <div class="panel">
          <span class="eyebrow">Споры</span>
          <h2>Открыть арбитраж</h2>
          <form class="form-grid" data-form="dispute">
            <label class="field">
              <span>Заявка</span>
              <select name="requestId">
                ${state.requests.map((request) => `<option value="${request.id}">#${request.id} · ${escapeHtml(request.category)}</option>`).join("")}
              </select>
            </label>
            <label class="field">
              <span>Кто открыл</span>
              <select name="openedBy">
                <option>Клиент</option>
                <option>Мастер</option>
                <option>Поддержка</option>
              </select>
            </label>
            <label class="field full">
              <span>Причина</span>
              <textarea name="reason" required placeholder="Что произошло, какие доказательства есть"></textarea>
            </label>
            <div class="actions field full">
              <button class="danger-button" type="submit">Открыть спор</button>
            </div>
          </form>
        </div>

        <div class="panel">
          <span class="eyebrow">Очередь арбитража</span>
          <div class="list">
            ${state.disputes
              .map(
                (dispute) => `
                  <article class="list-item">
                    <div class="list-head">
                      <strong>Спор #${dispute.id} · заявка #${dispute.requestId}</strong>
                      <span class="status dispute">${escapeHtml(dispute.status)}</span>
                    </div>
                    <p>${escapeHtml(dispute.openedBy)}: ${escapeHtml(dispute.reason)}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderAdmin() {
    return `
      <section class="grid-3">
        <article class="card">
          <span class="eyebrow">Роли</span>
          <h3>RBAC</h3>
          <p>client, master, store, support, admin. В backend будет таблица permissions и audit log.</p>
        </article>
        <article class="card">
          <span class="eyebrow">Монетизация</span>
          <h3>Копейка за ценность</h3>
          <p>Pro CRM, комиссия с успешной сделки, срочные лиды, витрина магазинов, база знаний.</p>
        </article>
        <article class="card">
          <span class="eyebrow">Риск</span>
          <h3>Модерация</h3>
          <p>Подозрительные отзывы, частые споры, фейковые check-in, жалобы и блокировки.</p>
        </article>
      </section>

      <section class="panel">
        <span class="eyebrow">Операционные данные</span>
        <table>
          <thead>
            <tr>
              <th>Сущность</th>
              <th>Количество</th>
              <th>Следующий шаг</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Мастера</td><td>${state.masters.length}</td><td>Верификация документов</td></tr>
            <tr><td>Заявки</td><td>${state.requests.length}</td><td>Подключить backend статусы</td></tr>
            <tr><td>Статьи базы знаний</td><td>${state.knowledge.length}</td><td>Редактор контента</td></tr>
            <tr><td>Споры</td><td>${state.disputes.length}</td><td>Решения поддержки</td></tr>
          </tbody>
        </table>
      </section>
    `;
  }

  function bindPageEvents() {
    document.querySelectorAll("[data-action='go']").forEach((button) => {
      button.addEventListener("click", () => setRoute(button.dataset.route));
    });

    document.querySelectorAll("[data-action='filter-kb']").forEach((button) => {
      button.addEventListener("click", () => {
        kbAudience = button.dataset.audience;
        render();
      });
    });

    document.querySelectorAll("[data-action='assign']").forEach((button) => {
      button.addEventListener("click", () => openAssignDialog(Number(button.dataset.requestId)));
    });

    document.querySelectorAll("[data-action='done']").forEach((button) => {
      button.addEventListener("click", () => {
        updateRequest(Number(button.dataset.requestId), { status: "done" });
      });
    });

    document.querySelectorAll("[data-action='dispute']").forEach((button) => {
      button.addEventListener("click", () => {
        state.route = "arbitration";
        saveState();
        render();
      });
    });

    document.querySelectorAll("[data-action='book']").forEach((button) => {
      button.addEventListener("click", () => bookMaster(Number(button.dataset.masterId), button.dataset.slot));
    });

    const requestForm = document.querySelector("[data-form='request']");
    if (requestForm) requestForm.addEventListener("submit", createRequest);

    const forumForm = document.querySelector("[data-form='forum']");
    if (forumForm) forumForm.addEventListener("submit", createForumTopic);

    const disputeForm = document.querySelector("[data-form='dispute']");
    if (disputeForm) disputeForm.addEventListener("submit", createDispute);

    const startCamera = document.querySelector("[data-action='start-camera']");
    if (startCamera) startCamera.addEventListener("click", enableCamera);

    const getGeo = document.querySelector("[data-action='get-geo']");
    if (getGeo) getGeo.addEventListener("click", getGeoProof);

    const createProof = document.querySelector("[data-action='create-proof']");
    if (createProof) createProof.addEventListener("click", createProofLog);
  }

  function createRequest(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    state.requests.unshift({
      id: Date.now(),
      client: data.client,
      category: data.category,
      city: data.city,
      symptom: data.symptom,
      budget: Number(data.budget) || 0,
      urgency: data.urgency,
      status: "open",
      masterId: null,
      slot: data.slot || "",
      evidence: []
    });
    saveState();
    event.target.reset();
    render();
  }

  function createForumTopic(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    state.forum.unshift({
      id: Date.now(),
      author: state.currentUser.name,
      role: roleNames[state.role],
      topic: data.topic,
      replies: 0
    });
    saveState();
    render();
  }

  function createDispute(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    state.disputes.unshift({
      id: Date.now(),
      requestId: Number(data.requestId),
      openedBy: data.openedBy,
      reason: data.reason,
      status: "Сбор доказательств"
    });
    updateRequest(Number(data.requestId), { status: "dispute" }, false);
    saveState();
    render();
  }

  function openAssignDialog(requestId) {
    dialogTitle.textContent = `Назначить мастера на заявку #${requestId}`;
    dialogBody.innerHTML = `
      <div class="list">
        ${state.masters
          .map(
            (master) => `
              <article class="list-item">
                <div class="list-head">
                  <div>
                    <strong>${escapeHtml(master.name)}</strong>
                    <p>${escapeHtml(master.profession)} · ${escapeHtml(master.city)} · рейтинг ${master.rating}</p>
                  </div>
                  <button class="button" data-dialog-assign="${master.id}">Выбрать</button>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    `;
    dialog.showModal();
    dialogBody.querySelectorAll("[data-dialog-assign]").forEach((button) => {
      button.addEventListener("click", () => {
        updateRequest(requestId, { masterId: Number(button.dataset.dialogAssign), status: "booked" });
        dialog.close();
      });
    });
  }

  function updateRequest(requestId, patch, shouldRender = true) {
    state.requests = state.requests.map((request) => (request.id === requestId ? { ...request, ...patch } : request));
    saveState();
    if (shouldRender) render();
  }

  function bookMaster(masterId, slot) {
    const openRequest = state.requests.find((request) => request.status === "open") || state.requests[0];
    if (!openRequest) return;
    state.bookings.unshift({
      id: Date.now(),
      requestId: openRequest.id,
      masterId,
      slot,
      status: "Подтверждено"
    });
    updateRequest(openRequest.id, { masterId, slot, status: "booked" });
  }

  async function enableCamera() {
    const video = document.getElementById("cameraVideo");
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showNotice("Камера недоступна", "Браузер не дал доступ к камере. В демо это нормально, особенно при открытии через file://.");
      return;
    }
    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      video.srcObject = cameraStream;
    } catch (error) {
      showNotice("Камера не включилась", "Разрешите доступ к камере или откройте страницу через HTTPS/localhost.");
    }
  }

  function getGeoProof() {
    const target = document.getElementById("proofGeo");
    if (!navigator.geolocation) {
      target.textContent = "GPS недоступен в браузере";
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = position.coords;
        target.textContent = `GPS: ${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)} · точность ${Math.round(coords.accuracy)} м`;
      },
      () => {
        target.textContent = "GPS не подтвержден. Нужен fallback: фото/видео и звонок клиенту.";
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  function createProofLog() {
    const select = document.getElementById("checkinRequest");
    const geo = document.getElementById("proofGeo");
    const requestId = Number(select.value);
    state.proofLog.unshift({
      id: Date.now(),
      requestId,
      createdAt: nowLabel(),
      geo: geo ? geo.textContent : "GPS не указан",
      note: "Мастер зафиксировал приезд. Клиент не открыл дверь или отказался от работ."
    });
    updateRequest(requestId, { status: "proof" }, false);
    saveState();
    render();
  }

  function showNotice(title, body) {
    dialogTitle.textContent = title;
    dialogBody.innerHTML = `<p>${escapeHtml(body)}</p>`;
    dialog.showModal();
  }

  document.addEventListener("click", (event) => {
    const routeButton = event.target.closest("[data-route]");
    if (routeButton && routeButton.classList.contains("nav-button")) {
      setRoute(routeButton.dataset.route);
    }

    if (event.target.matches("[data-close-dialog]")) {
      dialog.close();
    }

    if (event.target.matches("[data-action='reset']")) {
      resetDemo();
    }
  });

  roleSelect.addEventListener("change", () => {
    state.role = roleSelect.value;
    saveState();
    render();
  });

  themeToggle.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    saveState();
    render();
  });

  setInterval(() => {
    setClock();
    const proofClock = document.getElementById("proofClock");
    if (proofClock) proofClock.textContent = nowLabel();
  }, 1000);

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  }

  render();
})();
