import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {AuthUser, Role} from "../../entities/user/model/types";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import userStore from "../../entities/user/store/userStore";
import {errorHandler} from "../../entities/errorHandler";


const AuthPage = () => {
    const [location, setLocation] = useState('/login');
    const [user, setUser] = useState({} as AuthUser);
    const navigate = useNavigate();
    const [QRCode, setQRCode] = useState(false)

    const regError = () => {
        toast.error("Користувач з таким email вже існує", {
            position: toast.POSITION.TOP_CENTER,
        });
    }

    const showQRCode = () => {
        setQRCode(true)
    }

    const logError = () => {
        toast.error("Не вірний email або пароль", {
            position: toast.POSITION.TOP_CENTER,

        });
    }

    const sendData = () => {
        if (user.email && user.password) {
            if (location === '/registration') {
                userStore.registration(user)
                    .then(() => {
                        setLocation('/login')
                    })
                    .catch(err => {
                        if (err.request.status === 422) {
                            regError()
                        }

                        errorHandler(err)
                    })
            } else {
                userStore.login(user)
                    .then(() => {
                        navigate('/')
                    }).catch(e => {
                    if (e.request.status === 403) {
                        logError()
                        return;
                    }

                    errorHandler(e)
                })
            }

        }
    }

    return (
        <div className={"vh-100"}>
            <div className={'w-100 py-5 d-flex flex-column align-items-center justify-content-center'}>
                <div
                    className={'w-25 h-auto pb-2 pt-2 ps-lg-2 pe-lg-2 rounded-top-4 bg-success  text-white text-center'}>
                    {location === '/registration' ? 'РЕЄСТРАЦІЯ' : "АВТОРИЗАЦІЯ"}
                </div>
                <div className={'bg-white shadow w-75 h-auto rounded-5 p-5 d-flex flex-column align-items-center' +
                    ' justify-content-center gap-4'}>
                    {location === '/registration'
                        &&
                        <div className={'w-50'}>
                            <Form.Label htmlFor="firsName">Ім'я</Form.Label>
                            <Form.Control
                                type="text"
                                id="firsName"
                                aria-describedby="firsNameHelp"
                                className={'text-success border-success'}
                                onChange={(e) => setUser({...user, firstName: e.target.value})}
                            />
                            <Form.Text id="firsNameHelp" muted>
                                Це поле має бути заповненим
                            </Form.Text>
                        </div>
                    }
                    {location === '/registration'
                        &&
                        <div className={'w-50'}>
                            <Form.Label htmlFor="confPassword">Прізвище</Form.Label>
                            <Form.Control
                                type="text"
                                id="lastName"
                                aria-describedby="lastNameHelp"
                                className={'text-success border-success'}
                                onChange={(e) => setUser({...user, lastName: e.target.value})}
                            />
                            <Form.Text id="lastNameHelp" muted>
                                Це поле має бути заповненим
                            </Form.Text>
                        </div>
                    }
                    <div className={'w-50'}>
                        <Form.Label htmlFor="email">Пошта</Form.Label>
                        <Form.Control
                            type="text"
                            id="email"
                            aria-describedby="emailHelp"
                            className={'text-success border-success'}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                        />
                        <Form.Text id="emailHelp" muted>
                            Приклад вашої пошти - example@example.com
                        </Form.Text>
                    </div>
                    <div className={'w-50'}>
                        <Form.Label htmlFor="password">Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            id="password"
                            aria-describedby="passwordHelp"
                            className={'text-success border-success'}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                        />
                        <Form.Text id="passwordHelp" muted>
                            Довжина паролю повинна бути від 8 - 20
                        </Form.Text>
                    </div>
                    {location === '/registration'
                        &&
                        <div className={'w-50'}>
                            <Form.Label htmlFor="confPassword">Підтвердження паролю</Form.Label>
                            <Form.Control
                                type="password"
                                id="confPassword"
                                aria-describedby="confPasswordHelp"
                                className={'text-success border-success'}
                            />
                            <Form.Text id="confPasswordHelp" muted>
                                Паролі мають співпадати
                            </Form.Text>
                        </div>
                    }
                    {location === '/registration'
                        &&
                        <div className={'w-50'}>
                            <Form.Select
                                id={'userRole'}
                                onChange={(e) => setUser({...user, role: e.target.value})}
                                className={'text-success border-success'}
                            >
                                <option selected={true} disabled={true}>Виберіть роль</option>
                                <option value={Role.CUSTOMER}>{Role.CUSTOMER}</option>
                                <option value={Role.OPERATOR}>{Role.OPERATOR}</option>
                            </Form.Select>
                        </div>
                    }
                    <button type="button" className="btn btn-outline-success" onClick={sendData}>Увійти</button>
                    {location === '/registration' ?
                        <div className={'text-success btn text-decoration-underline'}
                             onClick={() => setLocation('/login')}>Вже маєте акаунт?</div>
                        :
                        <>
                            {QRCode ? <img
                                src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAYAAACI7Fo9AAAFzUlEQVR42u3dS04jQRBAQcPxWXJhuAKSUdfLrFi8nRlDu6NGatfn9fH1/ZK0OxdBAl0S6JJAlwS6JNAlgS4JdEmgS6BLAl0S6JJAlwS6JNAlgS4JdAl0SaBLAl0S6JJAlwS6JNAlgS6B7iJIoEsCXRLokkCXBLqkLdBfr8+fSn/9/Z543TvX779/tnQN3nmP0n0FOuiggw466KCDDjrooIMOOuigg56BXn/f+g3zxA1424Bav59BBx100EEHHXTQQQcddNBBBx100DNPUUvv+8TvMnFAeOJnS/cV6KCDDjrooIMOOuiggw466KCDDjroh963NK1z4tRb0EEHHXTQQQcddNBBBx100EEHHXTQF0M/9VT71IBQXxcOOuiggw466KCDDjrooIMOOuiggw764vXoJdSlNfRbNqC0Hh100EEHHXTQQQcddNBBBx100EF3Uosb1euc1AI66F4HOuigex3ooAMCOuigex3ooKs2pba0Nr70TcbV96eLADrooAt00EEX6KCDDjrooIP+1Nrp+lPe0jWduEljffAEHXTQQQcddNBBBx100EEHHXTQQb9qc8iJN8LE9eilgWPLoA066KCDDjrooIMOOuiggw466KCDfuQJcelEktI0UQOvzxJ00EEHHXQ3B+iggw466KCDDjrooKfw19c/b3mKX1pDX//2BXTQQQcddNBBBx100EEHHXTQQQd93OaLJdSlJ7+lG3DLNyPWo4MOOuiggw466KCDDjrooIMOOujXr0fffBJK/Un3bU/nQQcddNBBBx100EEHHXTQQQcddNCtRw9teFh6En9qkC0N+PXp1qCDDjrooIMOOuiggw466KCDDjro46bA1t+3flPWB8rSKTT1+xR00EEHHXTQQQcddNBBBx100EEHfdxa59ImjfX146c2UJx4XUAHHXTQQQcddNBBBx100EEHHXTQx53UUh84Jq7dn7ief+L7gg466KCDDjrooIMOOuiggw466KCP2xyyflNuHmBu24Rzy2cEOuiggw466KCDDjrooIMOOuigg75i6ujEp8YlDKUn2DaHBB100EEHHXTQQQcddNBBBx100K+HfuqEk9KGgqVTXiYerzxx80/QQQcddNBBBx100EEHHXTQQQcd9Os3I6x/wKXrV7/2m+8D0EEHHXTQQQcddNBBBx100EEHHfTMBZyIf/PU0dK68ElYQQcddNBBBx100EEHHXTQQQcddNDHPl2urwuvT72tX+eJgyfooIMOOuiggw466KCDDjrooIMO+ton7KcglZ7E14+nLn3mTmoBHXTQQQcddNBBBx100EEHHXTQPXWPH41b+lag/rc98bP1vxd00EEHHXTQQQcddNBBBx100EEHPf0kfssxvSVI9W8eSv+p2BwSdNBBBx100EEHHXTQQQcddNBBNwV24L9XQn3zBorF+xl00EEHHXTQQQcddNBBBx100EEHfdyT+NKT/S2DRP3bktJGn6CDDjrooIMOOuiggw466KCDDjro46BvmQ5527Td0kkyE7+lAR100EEHHXTQQQcddNBBF+igg56BVDpRo3TMcWkwmbjhZmkgAh100EEHHXTQQQcddNBBBx100EFfsX63dKRx/en3ZkgTvwUBHXTQQQcddNBBBx100EEHHXTQQc9Mr6yfcFKaJlr/1qJ+7U2BBR100EEHHXTQQQcddNBBBx100EEPTZGcOGDVr739AUAHHXTQQQcddNBBBx100EEHHXTQL4NeOt1j4nTX0uA5CSvooIMOOuiggw466KCDDjrooIMO+vr16Fs+9PpGlRMHbdBBBx100EEHHXTQQQcddNBBBx10J7WEppjWN1V0gk3/BCDQQQcddNBBBx100EEHHXTQQQcddEmmwEoCXRLokkCXBLok0CXQJYEuCXRJoEsCXRLokkCXBLoEuosggS4JdEmgSwJdEuiSQJcEuiTQJdAlgS4JdEmgSwJdEuiSQJcEugS6pKX9ArxhOzU6r1TVAAAAAElFTkSuQmCC`}
                                alt="QR Code"/> : null}
                            <p onClick={showQRCode} className={'text-success btn text-decoration-underline'}>Увійти за
                                допомогою
                                Дія</p>
                            <div className={'text-success btn text-decoration-underline'}
                                 onClick={() => setLocation('/registration')}>Зареєструватися
                            </div>
                        </>

                    }
                </div>
            </div>
        </div>
    );
};

export default observer(AuthPage);