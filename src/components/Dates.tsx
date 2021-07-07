import React from 'react';
import { IonSlide } from '@ionic/react';

export default function Dates(props: {activeDate: (string | number)[],
  // eslint-disable-next-line no-unused-vars
  setActiveDate: (input: (string | number)[]) => void, }) {
  const dateInfo = getDateFormat();
  return (
    <>
      {
      dateInfo.map((item) => {
        if (props.activeDate[1] !== item[1]) {
          return (
            <IonSlide onClick={() => props.setActiveDate(item)}>
              <div className="item day">
                <p className="gray-day">{item[0]}</p>
                <p className="number">{item[1]}</p>
              </div>
            </IonSlide>
          );
        }

        return (
          <IonSlide onClick={() => props.setActiveDate(item)}>
            <div className="item-today today">
              <p>{item[0]}</p>
              <p className="number">{item[1]}</p>
            </div>
          </IonSlide>
        );
      })
}
    </>
  );
}

function getDateFormat() {
  let myDate = new Date();
  const rusDayArray = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const rusMonthArray = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября',
    'Октября', 'Ноября', 'Декабря'];
  // I render one week ahead. I could get date format from firebase realTime database for specific
  // free time every specialist
  const dates = Array.from(Array(8).keys());
  return dates.map((item, index) => {
    myDate.setDate(myDate.getDate() + index);
    const month = myDate.getMonth();
    const days = myDate.getDate();
    const day = myDate.getDay();
    const arr = [rusDayArray[day], days, rusMonthArray[month]];
    myDate = new Date();
    return arr;
  });
}
