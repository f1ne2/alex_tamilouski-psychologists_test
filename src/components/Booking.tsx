import React from 'react';
import { IonSlides, IonSlide } from '@ionic/react';
import firebase from 'firebase';
import Psychologs from './Psychologs';
import vector from '../assets/Vector.svg';
import calendar from '../assets/calendar-outline.svg';
import Dates from './Dates';
import Time from './Time';
import { getData } from './workWithDB/getData';

export default class Booking extends React.Component<{}, {
  loading: boolean, data: { name: string, consultationTime: string, time: [string, string][] }[][],
  activeDate: (string | number)[], activeTime: string, timeIndex: number, slideNumber: number}> {
  constructor(props: any) {
    super(props);
    this.state = { loading: true, data: [], activeDate: ['', new Date().getDate(), 'Сегодня'],
      activeTime: `${String(this.zeros(new Date().getHours()))}:${String(this.zeros(new Date().getMinutes()))}`,
      timeIndex: 0, slideNumber: 0,
    };
  }

  // получаем данные из базы данных
  componentDidMount() {
    this.setState({ loading: true });
    const res = getData('psychologists');
    res.then((data: { name: string, consultationTime: string,
      time: [string, string][] }[][]) => this.setState({ data, loading: false,
      slideNumber: data[0].length - 1 }))
      .catch((e) => {
        console.log(e);
      });
  }

  setActiveDate = (item: (string | number)[]) => {
    this.setState({ activeDate: item });
  }

  setActiveTime = (item: string, id: number) => {
    this.setState({ activeTime: item, timeIndex: id });
  }

  // Sending data to firestore. I save id in localstorage, but I know  It's a bad decision. I can't get booked
  // data from firestore in the incognito window. I didn't use Redux. But now, as far as I know,
  // Redux store can solve this problem.
  sendData = () => {
    const bookedData = document.getElementById('date1');
    if (bookedData === null) {
      return;
    }
    const bookedTime = document.getElementById('time1');
    if (bookedTime === null) {
      return;
    }
    const { data, slideNumber } = this.state;
    const db = firebase.firestore();
    const id = String(localStorage.getItem('id'));
    db.collection('psychologsBooking').doc(id).delete().then(() => {
    })
      .catch((error) => {
        console.error('Error', error);
      });
    localStorage.removeItem('id');
    db.collection('psychologsBooking').add({
      date: bookedData.innerText,
      name: data[0][slideNumber].name, time: bookedTime.innerText,
    })
      .then((dockRef) => {
        localStorage.setItem('id', dockRef.id);
      });
    // }
  }

  // I get information from slider about specialist name here.
  setPsychologist = () => {
    // @ts-ignore
    const result = document.querySelector('.swiper-container').swiper;
    if (result === null) {
      return;
    }
    result.on('slideChange', () => {
      this.setState({ slideNumber: result.activeIndex });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  zeros(i: number) {
    if (i < 10) {
      return `0${i}`;
    }
    return i;
  }

  render() {
    const { loading, activeDate, activeTime, timeIndex, data } = this.state;
    const slideOpts = { initialSlide: 1, speed: 400, slidesPerView: 1, spaceBetween: 8 };
    const secondSlideOpts = { initialSlide: 0, speed: 400, slidesPerView: 3.3, spaceBetween: 8 };
    if (loading) {
      return <h2>Loading...</h2>;
    }
    return (
      <div className="container">
        {/* Psychologists slider. I pass information about consultation time and specialist name from
        firebase realTime database */}
        <IonSlides id="s1" pager options={slideOpts}>
          {data[0].map((item, index) => (
            <IonSlide>
              <Psychologs data={data[0]} slideIndex={index} setPsychologist={this.setPsychologist} />
              <div className="column">
                <div className="possible-date">
                  <div>Возможная дата</div>
                  <div>
                    {/* I used only pictures. As seems to me I did not noticed functionality assigned for these
                    buttons in your task */}
                    <img src={vector} alt="" />
                    <img src={calendar} alt="Calendar" />
                  </div>
                </div>
              </div>
              {/* Dates slider component */}
              <IonSlides pager options={secondSlideOpts}>
                <Dates activeDate={activeDate} setActiveDate={this.setActiveDate} />
              </IonSlides>
              <div className="possible-date free-time">Свободное время</div>
              <IonSlides className="third-slider" pager options={secondSlideOpts}>
                {/* Time slider component. I get time from realtime database. I didn't have time
                set up flag changed (from 'free' to 'booked') for booking time in database. But it's possible to do */}
                <Time data={data[0]} timeIndex={timeIndex} activeTime={activeTime} setActiveTime={this.setActiveTime} />
              </IonSlides>
            </IonSlide>
          ))}
        </IonSlides>

        <div className="booking-container">
          <div className="row">
            <div className="booking-date">
              <div className="text">Дата</div>
              <div id="date1" className="date">{`${activeDate[1]} ${activeDate[2]}`}</div>
            </div>
            <div className="booking-date border-left">
              <div className="text">Время</div>
              <div id="time1" className="date">{activeTime}</div>
            </div>
          </div>
          <button type="button" onClick={this.sendData} className="booking-btn">
            ЗАПИСАТЬСЯ НА БЕСПЛАТНУЮ ВСТРЕЧУ
          </button>
        </div>
      </div>
    );
  }
}
