const Theme = styled.div`
padding:100;
margin:100;
background-image:url(https://qbit.org.ua/img/background.png);
background-repeat:repeat-x;
font-family:'tahoma','verdana','arial','helvetica';
border:none;
background-color:#ffffff;

a,a:link{color:#666}
a:active{color:#ccc}
b{color:#333}
p{margin:0 10px 10px 10px}
div#container{padding:0;margin:0}
div#header{position:relative;padding:1em}
div#header h1{margin:0;padding:10px 10px 0;color:#0093DD;
  font-family:'tahoma','arial';font-weight:bold;font-size:200%}
div#header h2{margin:0;padding-left:10px;color:#666666;
  font-family:'tahoma','arial';font-weight:normal;font-size:140%}
div#logo{float:left;width:100px;margin:0;padding:0 15px}
div#head{margin:0 100px;padding:0 15px}
div#content p{line-height:1.4}
div#navigation ul{line-height:1.4;list-style:none;padding-left:0px;margin-top:20px;margin-left:20px}
div#navigation ul li a,a:link{text-decoration:none;color:#c60}
div#navigation ul li a:hover{text-decoration:none;color:#f90}
div#extra{}
div#footer{font-size:70%;color:silver;text-align:center;clear:both}
div#footer p{margin:0;padding:5px 10px;font-size:80%}
div#footer a{display:inline;padding:0;color:silver}
div#footer a:hover{text-decoration:underline}

div#wrapper{float:left;width:100%}
div#content{margin: 0 160px;padding:0 15px;border-left:2px solid #bbb}
div#content h1{color:#999;padding:0px;margin:0px;font-size:140%}
div#content h2{color:#999;padding:0px;margin:0px;font-size:120%}
div#content h3{color:#999;padding:0px;margin:0px;font-size:110%}
div#content a{display:inline;padding:0;text-decoration:underline}
div#content p{padding:5px 0;margin:0}
div#navigation{float:left;width:160px;margin-left:-100%;border-right:2px solid #bbb}
div#google{width:1px;height:1px;display:none}
div#extra{float:left;width:200px;margin-left:-200px}
div#footer{clear:left;width:100%}
div.news{margin:10px 0 30px}
div.news h2{color:#0093DD !important; padding-bottom:10px !important}
div.news h3{color:#0093DD !important; padding-bottom:10px !important}
div.nh{font-size:80%;color:#999;border-bottom:1px dashed #999}
div.nhr{text-align:right;font-size:80%;color:#999;border-top:2px dashed #999;margin-top:10px}
div.nhr1{text-align:center;font-size:90%;font-weight:bold;color:#998;border-top:0px dashed #999;margin-top:10px}
textarea{font-family:'tahoma','verdana','arial','helvetica'}

.list2b {
    margin-bottom: 8px;
    padding:0;
#    list-style: none;
#    counter-reset: li;
}
.list2b li {
    position: relative;
    border: 2px solid #DDDDDD;
    background: #FAFAFA;
    padding:16px 20px 16px 28px;
    margin:12px 0 12px 40px;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
}
.list2b li:hover {
    background: #F0F5FB;
    border: 2px solid #ADCEE9;
}
.list2b li:before {
    line-height: 32px;
    position: absolute;
    top: 4px;
    left:-40px;  
    width:40px;
    text-align:center;
    font-size: 16px;
    font-weight: bold;
    color: #77AEDB;
    background: #77AEDB;
#    counter-increment: li;
    content: counter(li);
    -webkit-transition-duration: 0.2s;
    transition-duration: 0.2s;
}
.list2b li:hover:before {
    width:46px;
    background: #77AEDB;
}
.list2b li:after {
    position: absolute;
    left: 0;
    top: 4px;
    content: "";
    height: 0; 
    width: 0;
    border: 16px solid transparent;
    border-left-color: #77AEDB;
    -webkit-transition-duration: 0.2s;
    transition-duration: 0.2s
}
.list2b li:hover:after {
    margin-left: 6px;
    border-left-color: #77AEDB
} 

.btn {
background-color: #4CAF50;
border: none;
color: #FFFFFF;
padding: 15px 32px;
text-align: center;
-webkit-transition-duration: 0.4s; /* Safari */
transition-duration: 0.4s;
margin: 16px 0 !important;
text-decoration: none;
font-size:16px;
cursor:pointer;
}
.w3-green,.w3-hover-green:hover{color:#fff!important;background-color:#4CAF50!important}


.list6a {
    padding:0;
    margin:0;
    list-style: none;
}
.list6a ul{
    padding:0;
    margin:0;
}
.list6a li{
    padding:6px;
}
.list6a li:before {
    padding-right:10px;
    font-weight: bold;
    color: #77AEDB;
    transition-duration: 0.5s;
}
.list6a li:hover:before {
    color: #337AB7;
}

`;

return (
  <Theme>
    <div id="container">
      <div id="header">
        <div id="logo">
          <a href="/" title="QBit - Кубит">
            <img
              src="https://qbit.org.ua/img/logo.gif"
              width="100"
              height="75"
              border="0"
              alt="QBit - Кубит"
            />
          </a>
        </div>
        <div id="head">
          <h1>Молодіжне наукове товариство</h1>
          <h2>Складне - граючи!</h2>
        </div>
        <br />
      </div>

      <div id="wrapper">
        <div id="content">
          {/* CONTENT BEGIN */}

          <h1>НОВИНИ</h1>
          <br />
          <div class="news">
            <div class="news">
              <h3>ІНТЕНСИВИ З ПРОГРАМУВАННЯ ВІД МНО "Q-BIT", ЛІТО-2023</h3>
              <p align="justify">
                <b>3 липня 2023 року</b> стартуємо «інтенсиви» з розв'язування
                алгоритмічних задач та олімпіадного програмування. Спеціально
                для цього проекту було розроблено навчальні матеріали та
                різнорівневі завданя. «Інтенсив» передбачає повне занурення у
                програмування – щодня протягом двох тижнів на заняття треба
                виділити декілька годин. Інтенсив можна пройти в більш «щадному»
                режимі – всі матеріали, система тестування, відео-записи лекцій
                будуть доступні учасникам інтенсивів до кінця літа.
              </p>

              <p align="justify">
                Плануємо провести два інтенсиви, кожен тривалістю 2 тижні. По
                понеділках, середах та п'ятницях з 14:00 до 19:00 - алгоритмічні
                контести у системі DOTS (
                <a href="https://intensive.dots.org.ua/" target="blank">
                  https://intensive.dots.org.ua
                </a>
                ) А у вівторок, четвер та суботу - розбори задач та дорішування.
              </p>
              <p>
                <b>Дати проведення інтенсивів</b>
              </p>
              <ul STYLE="margin-top:5px">
                <li>
                  Перший інтенсив: 3 - 16 липня (
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSf6th7s2vB8YpwvsFA75MBXWtVQdOdj0WeNqiSj4gjTcDzUtA/viewform?usp=sf_link"
                    target="blank"
                  >
                    РЕЄСТРАЦІЯ
                  </a>
                  )
                  <ul class="list6a">
                    <li>3, 5, 7, 10, 12, 14 липня - алгоритмічні контести</li>
                    <li>
                      4, 6, 8, 11, 13, 15 липня - розбір задач, дорішування
                    </li>
                    <li>16 липня - сертифікація IT SKILLS STANDARD</li>
                  </ul>
                </li>
                <li>
                  Другий інтенсив: 17 - 30 липня (
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdSjJSMULnr-Qidrf1DoKHENt18SPoi_K3BtIjIAz9J8IT5_w/viewform?usp=sf_link"
                    target="blank"
                  >
                    РЕЄСТРАЦІЯ
                  </a>
                  )
                  <ul class="list6a">
                    <li>
                      17, 19, 21, 24, 26, 28 липня - алгоритмічні контести
                    </li>
                    <li>
                      18, 20, 22, 25, 27, 29 липня - розбір задач, дорішування
                    </li>
                    <li>30 липня - сертифікація IT SKILLS STANDARD</li>
                  </ul>
                </li>
                <li>
                  У першому та другому інтенсиві будуть <b>різні</b> набори
                  задач для алгоритмічний контестів!
                </li>
              </ul>
              <p align="justify">
                <b>
                  Заняття проходитимуть у трьох категоріях складності - L1, L2
                  та L3:
                </b>{" "}
              </p>
              <ul class="list2b">
                <li>
                  <b>Рівень L1</b> – для "початківців". Достатньо вміти
                  зчитувати дані та виводити результат виконання програми,
                  застосовувати найпростіші алгоритмічні конструкції
                  (розгалуження та цикл).
                </li>
                <li>
                  <b>Рівень L2</b> передбачає хороші знання та досвід
                  застосування базових алгоритмічних конструкцій, структур та
                  типів даних (масиви, рядки), а також нескладних алгоритмів
                  (квадратичні сортироки, двійковий пошук, проста комбінаторика
                  та теорія чисел).{" "}
                </li>
                <li>
                  <b>Рівень L3</b> – алгоритми та структури даних, підготовка до
                  олімпіад з програмування. У цій категорії будуть розібрані
                  завдання застосування теорії чисел, комбінаторики, динамічного
                  програмування, теорії графів, тощо.
                </li>
              </ul>

              <p>
                <b>Важливі посилання:</b>
              </p>
              <ul class="list6a">
                <li>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSf6th7s2vB8YpwvsFA75MBXWtVQdOdj0WeNqiSj4gjTcDzUtA/viewform?usp=sf_link"
                    target="blank"
                  >
                    Реєстрація на 1-й інтенсив
                  </a>{" "}
                  (3-16 липня)
                </li>
                <li>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdSjJSMULnr-Qidrf1DoKHENt18SPoi_K3BtIjIAz9J8IT5_w/viewform?usp=sf_link"
                    target="blank"
                  >
                    Реєстрація на 2-й інтенсив
                  </a>{" "}
                  (17-30 липня)
                </li>
                <li>
                  <a href="https://t.me/+BNcn2gsqBaQwMzMy" target="blank">
                    Телеграм канал
                  </a>
                </li>
                <li>
                  <a href="https://t.me/ag45root" target="blank">
                    Запитання
                  </a>
                </li>
              </ul>
              <div class="nhr">Додано 12.06.2023 - 00:00</div>
            </div>

            <div class="news">
              <h2>ЛІТНЯ ШКОЛА ПРОФІЛЯ МАТЕМАТИКА/ІНФОРМАТИКА - ЛОЛ-2023</h2>

              <table border="0">
                <tr>
                  <td valign="top" width="25%">
                    <img
                      src="https://qbit.org.ua/cat/news/lol2023.jpg"
                      width="180"
                      class="leftimg"
                    />
                  </td>
                  <td>
                    <p align="justify">
                      <b>З 8 по 22 серпня 2023 </b>{" "}
                      <a href="https://qbit.org.ua/" target="blank">
                        Молодіжне наукове товариство «Q-BIT»
                      </a>{" "}
                      та
                      <a href="https://kobra.in.ua/" target="blank">
                        Центр класичної освіти «Кобра»
                      </a>{" "}
                      планують проведення
                      <b>
                        {" "}
                        XVIІ літньої школи профіля математика-інформатика
                        «ЛОЛ-2023»
                      </b>{" "}
                      в онлайн форматі.
                    </p>
                    <p align="justify">
                      Ця школа є одним з наймасовіших заходів для школярів з
                      математики та програмування в Україні. Учасники школи –
                      учні середніх та старших класів, а також студенти
                      профільних спеціальностей ВНЗ. Заняття ведуть Заслужені
                      вчителя України, призери міжнародних і всеукраїнських
                      змагань з математики та програмування, захоплені фахівці з
                      різних країн світу.
                    </p>
                  </td>
                </tr>
              </table>
              <p align="justify">
                В цьому році нашими офіційним партнером буде{" "}
                <a href="https://mmf.univie.ac.at/team/" target="blank">
                  Віденський університет
                </a>
                ! Для учнів старших класів та випускників у рамках ЛОЛ-2023 буде
                організована міжнародна австрійсько-українська онлайн школа
                <b>"Kharkiv-Vienna Friendship Summer Science School"</b>.
              </p>
              <p align="justify">
                Основними цілями і завданнями літньої школи є пропаганда
                наукових знань та розвиток у молоді інтересу до наукової
                діяльності, активізація роботи спецкурсів, гуртків, наукових
                товариств, створення оптимальних умов для виявлення обдарованих
                і талановитих школярів та студентів, їх подальшого
                інтелектуального розвитку та професійної орієнтації.
              </p>
              <p align="justify">
                Ми спобуємо <b>в онлайн-форматі</b> відтворити не тільки заняття
                математикою та програмуванням, а й традиційні культурні заходи,
                легендарний квест, експерименти з фізики, вечірній лекторіум та
                багато іншого.
              </p>
              <p align="justify">
                Зараз ми хочемо з'ясувати приблизний склад бажаючих взяти участь
                у літній школі профіля математика-інформатика "ЛОЛ-2022". Тому
                просимо заповнити нескладну анкету "
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdVelbPayOc4_ieuPb-zF4nOwnsUv0us43ov17mfiI6_FUNog/viewform?usp=sf_link"
                  target="blank"
                >
                  <b style={{ color: "blue " }}>
                    Попередня реєстарація в ЛОЛ-2023
                  </b>
                </a>
                ".
              </p>

              {/*

<p align="justify">
<b>З 10 по 23 серпня 2022 </b> Молодіжне наукове товариство «Q-BIT» та
<a href="https://kobra.in.ua/" target="blank">Центр класичної освіти «Кобра»</a> планують проведення
<b> XVІ літньої школи профіля математика-інформатика «ЛОЛ-2022»</b> в онлайн форматі.
</p>
<p align="justify">
Ця школа є одним з наймасовіших заходів для школярів з математики та програмування в Україні. Учасники школи – учні середніх та старших класів, а також студенти профільних спеціальностей ВНЗ. Заняття ведуть Заслужені вчителі України, призери міжнародних і всеукраїнських змагань з математики та програмування, захоплені фахівці з різних країн світу.
</p>
<p align="justify">
Основними цілями і завданнями літньої школи є пропаганда наукових знань та розвиток у молоді інтересу до наукової діяльності, активізація роботи спецкурсів, гуртків, наукових товариств, створення оптимальних умов для виявлення обдарованих і талановитих школярів та студентів, їх подальшого інтелектуального розвитку та професійної орієнтації.
</p>
<p align="justify">
Ми спобуємо <b>в онлайн-форматі</b> відтворити не тільки заняття математикою та програмуванням, а й традиційні 
культурні заходи, легендарний квест, експерименти з фізики, вечірній лекторіум та багато іншого.
</p>
<p align="justify">
Зараз ми хочемо з'ясувати приблизний склад бажаючих взяти участь у літній школі профіля математика-інформатика "ЛОЛ-2022".
Тому просимо заповнити нескладну анкету "<a href="https://docs.google.com/forms/d/e/1FAIpQLScxQcS7uytVY4udcBf2Xme6YVj6JrGlA5lr6VNRVguEgdwN2g/viewform?usp=sf_link" target="blank">Попередня реєстарація в ЛОЛ-2022</a>".
</p>

<br/><br/>
<font size="5">
<a href="https://docs.google.com/forms/d/e/1FAIpQLScxQcS7uytVY4udcBf2Xme6YVj6JrGlA5lr6VNRVguEgdwN2g/viewform?usp=sf_link" target="blank">ПОПЕРЕДНЯ РЕЄСТРАЦІЯ</a>&nbsp&nbsp&nbsp&nbsp&nbsp <a href="https://t.me/lol_afina" target="blank">ТЕЛЕГРАМ</a>
&nbsp&nbsp&nbsp&nbsp&nbsp<a href="https://summerschool.lol" target="blank">САЙТ ЛОЛ</a>
</font>
*/}
              <div class="nhr">Додано 22.05.2023 - 16:00</div>
            </div>
          </div>

          <p>&nbsp;</p>
          {/* CONTENT END */}
        </div>
      </div>
      <div id="navigation">
        <ul>
          <li>
            <a href="">Контакти</a>
          </li>
          <li>
            <a href="">Розклад</a>
          </li>
          <li>
            <a href="">Викладачі</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="http://qbit.dots.org.ua" target="blank">
              DOTS
            </a>
          </li>
          <li>
            <a href="http://khcup.dots.org.ua" target="blank">
              KhCUP
            </a>
          </li>
        </ul>
        <ul></ul>
        {/*
    <ul>
        <li><a href="">Система DOTS</a></li>
        <li><a href="">KhCUP</a></li>
        <li><a href="">TechTalents</a></li>
        <li><a href="/pt/">Passion Talk</a></li>
    </ul>
    */}
        <br />

        {/* sponsored */}
        <div class="sponsored"></div>
        {/* sponsored */}
      </div>
      <div id="extra">
        <p>&nbsp;</p>
      </div>

      <div id="footer">
        <br />
        Copyright &copy; 2005-2022 МНО Q-Bit, розробка та технічна підтримка
        &copy; 2005-2022
        <a href="https://www.facebook.com/flyonts">Володя Фльонц</a>
        <br />
        При використанні матеріалів сайта, будь ласка, вкажіть qbit.org.ua.
        <br />
        <br />
      </div>
    </div>
  </Theme>
);
