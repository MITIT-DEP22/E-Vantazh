import React from 'react';
import css from "./HomePage.module.css"
import mp1 from '../../assets/images/mp1.png'
import mp2 from '../../assets/images/mp2.png'
import mp3 from '../../assets/images/mp3.png'
import mp4 from '../../assets/images/mp4.png'
import mp5 from '../../assets/images/mp5.png'
import mp6 from '../../assets/images/mp6.png'
import mp7 from '../../assets/images/mp7.png'
import mp8 from '../../assets/images/mp8.png'

const HomePage = () => {
    return (
        <>
            <div className={css.container}>
                <span>єВантаж - Легкість. Надійність. Прозорість.</span>
            </div>
            <div className={'w-100 h-auto p-4 d-flex flex-column align-items-center justify-content-center gap-5'}>
                <div className={'w-100 h-auto text-center h1'}>
                    Наші сервіси
                </div>
                <div className={css.service_container}>
                    <div className={css.service_el}>
                        <img src={mp1} className={css.service_img} alt=""/>
                        <div className={css.service_text}>Контейнерне зберігання</div>
                    </div>
                    <div className={css.service_el}>
                        <img src={mp2} className={css.service_img} alt=""/>
                        <div className={css.service_text}>Начинка / Зачистка</div>
                    </div>
                    <div className={css.service_el}>
                        <img src={mp3} className={css.service_img} alt=""/>
                        <div className={css.service_text}>Охолодження</div>
                    </div>
                    <div className={css.service_el}>
                        <img src={mp4} className={css.service_img} alt=""/>
                        <div className={css.service_text}>Складське зберігання</div>
                    </div>
                </div>
                <div className={css.service_container}>
                    <div className={css.service_el}>
                        <img src={mp5} className={css.service_img} alt=""/>
                        <div className={css.service_text}>Упаковка</div>
                    </div>
                    <div className={css.service_el}>
                        <img src={mp6} className={css.service_img} alt=""/>
                        <div className={css.service_text}>Ізольованість зберігання</div>
                    </div>
                    <div className={css.service_el}>
                        <img src={mp7} className={css.service_img} alt=""/>
                        <div className={css.service_text}>Автоперевезення</div>
                    </div>
                    <div className={css.service_el}>
                        <img src={mp8} className={css.service_img} alt=""/>
                        <div className={css.service_text}>Експорт Імпорт</div>
                    </div>
                </div>
            </div>
            <div className={css.contact_container}>

            </div>
        </>
    );
};

export default HomePage;