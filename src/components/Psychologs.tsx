import React from 'react';
import { IonSlide } from '@ionic/react';
import psychologist1 from '../assets/psychologist1.webp';
import psychologist2 from '../assets/psychologist2.jpeg';

export default function Psychologs(props: { slideIndex: number, data: { name: string, consultationTime: string,
    time: [string, string][]}[], setPsychologist: () => void}) {
  const image = [psychologist1, psychologist2];
  const { setPsychologist, data, slideIndex } = props;
  return (
    <IonSlide onPointerOver={setPsychologist}>
      <div className="swiper-content">
        <div className="swiper-content-text">{data[slideIndex].name}</div>
        <div className="swiper-content-photo-description">
          <img src={image[slideIndex]} alt="психолог фото" />
          <div className="swiper-content-text consultation">
            Длительность консультации
            <div>{data[slideIndex].consultationTime}</div>
          </div>
        </div>
      </div>
    </IonSlide>
  );
}
