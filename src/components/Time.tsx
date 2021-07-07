import React from 'react';
import { IonSlide } from '@ionic/react';

// eslint-disable-next-line react/no-unused-prop-types,no-unused-vars
export default function Time(props: { activeTime: string, setActiveTime: (input: string, input2: number) => void,
  data: { name: string, consultationTime: string, time: [string, string][]}[], timeIndex: number}) {
  return (
    <>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.data[0].time.map((item: [string, string], index: number) => {
        if (item[1] === 'free' && props.timeIndex === index) {
          return (
            <IonSlide onClick={() => props.setActiveTime(item[0], index)}>
              <div className="item-time">
                <p className="time-today">{item[0]}</p>
              </div>
            </IonSlide>
          );
        }
        if (item[1] === 'free') {
          return (
            <IonSlide onClick={() => props.setActiveTime(item[0], index)}>
              <div className="item-time">
                <p className="gray-time">{item[0]}</p>
              </div>
            </IonSlide>
          );
        }

        return <></>;
      })}
    </>
  );
}
