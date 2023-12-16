import React from 'react';
import userStore from "../../entities/user/store/userStore";
import {observer} from "mobx-react-lite";

const UserData = observer(() => {
    const {user} = userStore
    return (
        <div className={'w-100 h-auto d-flex align-items-center justify-content-center gap-3'}>
            {user?.image?
                <img src={`https://46.219.127.6:9999/images/${user?.image?.fileName}`} alt="" className={'w-25' +
                    ' rounded-5 border border-success p-1'}/>
                :
                <img src="https://talent.ua/images/db/resume/picb_517806.jpg?1578758114" alt="" className={'w-25' +
                    ' rounded-5 border border-success p-1'}/>

            }
            <div
                className={'d-flex flex-column align-items-start justify-content-center gap-3 bg-secondary p-4 rounded'}>
                <div className={'h3'}><strong>Прізвище та ім'я:</strong>{` ${user.lastName} ${user.firstName}`}</div>
                {user.phone !== null ?
                    <div className={'h3'}><strong>Номер телефону:</strong>{` ${user.phone}`}</div>
                    :
                    <div className={'h3'}><strong>Номер телефону:</strong>
                        <input className={"rounded border-2 border-success mx-2 text-center px-2"}
                               placeholder={"000-000-00-00"} type="text"/>
                        <button className={"border rounded p-1"}><i className="bi bi-check-lg"></i></button>
                    </div>
                }
                <div className={'h3'}><strong>Пошта:</strong>{` ${user.email}`}</div>
                {user.companyName !== null ?
                    <div className={'h3'}><strong>Назва компанії:</strong>{` ${user.companyName}`}
                    </div>
                    :
                    <div className={'h3'}><strong>Назва компанії:</strong>
                        <input className={"rounded border-2 border-success mx-2 text-center px-2"}
                               placeholder={"Введіть назву компанії..."} type="text"/>
                        <button className={"border rounded p-1"}><i className="bi bi-check-lg"></i></button>
                    </div>
                }
            </div>
        </div>
    );
});

export default UserData;