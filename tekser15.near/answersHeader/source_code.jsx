return (
  <>
    <h1>Hello React?</h1>
    <>
      <div className="h-8 pt-0 pl-72">
        <img src={logo} alt="fireSpot" className="h-6 inline align-middle" />

        <span
          className="font-medium pl-1 h-6 align-middle"
          style={{ color: "#AD922A" }}
        >
          NIKIS
        </span>
        <span
          className="font-medium h-6 align-middle"
          style={{ color: "#6D77FA" }}
        >
          TRAIN
        </span>

        <span className="px-3 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
          Задачи
        </span>

        <span className="px-3 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
          Обучение
        </span>

        <span className="px-3 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
          Контесты
        </span>

        <span className="px-3 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
          Войти
        </span>

        <span className="px-3 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 justify-self-end">
          Регистрация
        </span>
      </div>
      <hr></hr>
    </>
  </>
);
