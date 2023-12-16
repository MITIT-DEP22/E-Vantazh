import {Nav, Navbar} from "react-bootstrap";
import {RouterNames} from "../../shared/enums/RouterNames";
import {Link, useLocation} from "react-router-dom";
import Logo from "./ui/Logo/Logo";
import css from "./Header.module.css"
import userStore from "../../entities/user/store/userStore";
import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";

export const Header = observer(() => {

    const {pathname} = useLocation()
    const {isAuth, user} = userStore

    useEffect(() => {
        userStore.refresh()
    }, [])


    return (
        <Navbar collapseOnSelect expand="lg"
                className={`${pathname === "/" && `position-absolute`} ${css.container} ${pathname === "/" && css.homePage}`}>

            <Navbar.Brand className={css.brand}>
                <Link to={RouterNames.HOME}>
                    <Logo/>
                </Link>
            </Navbar.Brand>

            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link>
                        <Link className={"text-decoration-none text-white"} to={RouterNames.HOME}>Головна</Link>
                    </Nav.Link>


                    <Nav.Link>
                        <Link className={"text-decoration-none text-white"} to={RouterNames.ORDERS}>Замовлення</Link>
                    </Nav.Link>

                    <Nav.Link>
                        <Link className={"text-decoration-none text-white"}
                              to={RouterNames.OPERATORS}>Перевізники</Link>
                    </Nav.Link>

                    <Nav.Link>
                        <Link className={"text-decoration-none text-white"}
                              to={RouterNames.CREATE_ORDER}> Створити ордер</Link>
                    </Nav.Link>
                </Nav>

                <Nav className={" mx-4 gap-4"}>
                    {isAuth ?
                        <>
                            <button type="button" className="btn btn-outline-success rounded-pill px-4" onClick={() => {
                                userStore.logout()
                                window.location.href = '/'
                            }}>Вийти</button>
                            <Nav.Link className={"rounded-pill px-4 border bg-white"}>
                                <Link className={"text-decoration-none text-black w-100 h-100"}
                                      to={RouterNames.PROFILE}>{user.firstName} {user.lastName}</Link>
                            </Nav.Link>
                        </>
                        :
                        <Nav.Link className={"rounded-pill px-4 border bg-white"}>
                            <Link className={"text-decoration-none text-black w-100 h-100"}
                                  to={RouterNames.AUTH}>Увійти</Link>
                        </Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
});
