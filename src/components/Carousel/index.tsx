import React, { useState } from "react";
import "./styles.css";
import { Carousel as SwipeCarousel } from "@trendyol-js/react-carousel";
import { HandySvg } from "handy-svg";
import iconSrc from "assets/icon/arrowLeftRounded.svg";

const employees = [
  {
    name: "Руководитель группы сырьевых поставок",
    fullName: "Черненко Светлана Юрьевна",
    phone: "8 (3842) 34-64-86",
    email: "s.chernenko@tdsds.ru",
  },
  {
    name: "Зам. начальника отдела оборудования",
    fullName: "Морозов Семен Сергеевич",
    phone: "8 (3842) 34-64-92",
    email: "s.morozov@tdsds.ru",
  },
  {
    name: "Руководитель группы горно-шахтного оборудования",
    fullName: "Балабухин Александр Игоревич",
    phone: "8 (3842) 34-64-91",
    email: "a.balabukhin@tdsds.ru",
  },
  {
    name: "Начальник тендерного отдела",
    fullName: "Ренжин Александр Евгеньевич",
    phone: "8 (3842) 34-64-87",
    email: "a.renjin@tdsds.ru",
  },
  {
    name: "Начальник отдела КГШ",
    fullName: "Кротиков Олег Викторович",
    phone: "8 (3842) 39-09-05",
    email: "o.krotikov@tdsds.ru",
  },
  {
    name: "Руководитель группы отдела логистики и ВЭД",
    fullName: "Довидович Владислава Валерьевна",
    phone: "8 (3842) 34-64-82",
    email: "v.dovidovich@tdsds.ru",
  },
  {
    name: "Начальник договорного отдела",
    fullName: "Ковших Наталья Викторовна",
    phone: "8 (3842) 34-64-99",
    email: "n.kovshikh@tdsds.ru",
  },
  {
    name: "Руководитель группы ЭТП",
    fullName: "Сергеев Андрей Викторович",
    phone: "8 (3842) 34-64-83",
    email: "a.sergeev@tdsds.ru",
  },
  {
    name: "Инженер группы ЭТП",
    fullName: "Капштык Сергей Викторович",
    phone: "8 (3842) 34-64-95",
    email: "s.kapstik@tdsds.ru",
  },
  {
    name: "Руководитель группы вспомогательных материалов",
    fullName: "Калимуллин Артем Асхатович",
    phone: "8 (3842) 34-64-95",
    email: "a.kalimullin@tdsds.ru",
  },
  {
    name: "Специалист группы вспомогательных материалов",
    fullName: "Высокина Екатерина Артёмовна",
    phone: "8 (3842) 34-64-95",
    email: "e.vysokina@tdsds.ru",
  },
  {
    name: "Руководитель группы строительных и отделочных материалов",
    fullName: "Баженов Роман Анатольевич",
    phone: "8 (3842) 34-84-64",
    email: "r.bazhenov@tdsds.ru",
  },
  {
    name: "Начальник отдела сырьевых поставок",
    fullName: "Киселев Павел Анатольевич",
    phone: "8 (3842) 34-64-79",
    email: "p.kiselev@tdsds.ru",
  },
  {
    name: "Заместитель генерального директора",
    fullName: "Мазуров Андрей Андреевич",
    phone: "8 (3842) 34-64-87",
    email: "a.mazurov@tdsds.ru",
  },
  {
    name: "Зам. генерального директора по безопасности",
    fullName: "Бариновский Евгений Валентинович",
    phone: "8 (3842) 34-64-89",
    email: "e.barinovskiy@tdsds.ru",
  },
  {
    name: "Начальник отдела материалов",
    fullName: "Абзалов Ильдар Ахатович",
    phone: "8 (3842) 34-64-88",
    email: "i.abzalov@tdsds.ru",
  },
  {
    name: "Руководитель группы запасных частей и металла",
    fullName: "Разыграев Михаил Сергеевич",
    phone: "8 (3842) 34-64-85",
    email: "m.razygraev@tdsds.ru",
  },
  {
    name: "Инженер группы запасных частей и металла",
    fullName: "Паутов Филипп Сергеевич",
    phone: "8 (3842) 34-64-85",
    email: "f.pautov@tdsds.ru",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? employees.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === employees.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel-container">
      <SwipeCarousel
        className="carousel"
        show={5}
        slide={3}
        swiping={true}
        leftArrow={
          <HandySvg src={iconSrc} className="prev" height={24} width={24} />
        }
        rightArrow={
          <HandySvg src={iconSrc} className="next" height={24} width={24} />
        }
      >
        {employees.map((employee, index) => (
          <div
            key={index}
            className={`card ${index === currentIndex ? "active" : ""}`}
          >
            <h3>{employee.name}</h3>
            <p>{employee.fullName}</p>
            <p>Тел.: {employee.phone}</p>
            <p>E-mail: {employee.email}</p>
          </div>
        ))}
      </SwipeCarousel>
    </div>
  );
};

export default Carousel;
