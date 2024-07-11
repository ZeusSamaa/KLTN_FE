'use client'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { 
    ADMIN_MENU, 
    TEACHER_MENU, 
    STUDENT_MENU, 
    BUSINESS_MENU, 
    MANAGE_APP_MENU 
} from '@/constant/menu';
import styles from './menu-sidebar.module.scss';
import { ROLE } from '@/constant/role';

import { LocalStorageService } from '@/services/localStorage.service';
import { setLoading } from "@/store/reducer/loadingReducer";
import { setSelectedMenuItemIndex } from "@/store/reducer/menuReducer";

const cx = classNames.bind(styles);

export default function Menu() {
    const isLogined = useSelector(state => state.login);
    const loading = useSelector(state => state.loading);
    const menu = useSelector(state => state.menu);
    const { fullLoading } = loading;
    const { selectedMenuItemIndex } = menu;

    let role = LocalStorageService.getRole();
    const dispatch = useDispatch();

    const [menuList, setMenuList] = useState([]);

    const router = useRouter();

    function handleReloadPage() {
        if (role !== ROLE.UNLOGINED) {
            const currentPath = window.location.pathname;
            dispatch(setLoading({ fullLoading, navbarLoading: true }));
            renderMenu(currentPath);
        } else {
            router.push('/login');
        }
    }

    useEffect(() => {
        handleReloadPage();
    }, [role])
    
    useEffect(() => {
        if (menuList.length > 0) {
            router.push(currentPath(selectedMenuItemIndex), undefined, { shallow: true });
            dispatch(setLoading({ fullLoading, navbarLoading: false }));
        } 
    }, [menuList, selectedMenuItemIndex])

    const renderMenu = (currentPath) => {
        let _menu = [];
        setInitPathIndexInMenuList(currentPath);
        if (role === ROLE.ADMIN) {
            _menu = ADMIN_MENU.map((item) => ({
                title: item.title,
                icon: item.icon,
                path: item.rolePaths.admin
            }))
            setMenuList(_menu);
            return;
        }
        if (role === ROLE.STUDENT) {
            _menu = STUDENT_MENU.map((item) => ({
                title: item.title,
                icon: item.icon,
                path: item.rolePaths.student
            }))
            setMenuList(_menu);
            return;
        }
        if (role === ROLE.TEACHER) {
            _menu = TEACHER_MENU.map((item) => ({
                title: item.title,
                icon: item.icon,
                path: item.rolePaths.teacher
            }))
            setMenuList(_menu);
            return;
        }
        if (role === ROLE.BUSINESS) {
            _menu = BUSINESS_MENU.map((item) => ({
                title: item.title,
                icon: item.icon,
                path: item.rolePaths.business
            }))
            setMenuList(_menu);
            return;
        }
        if (role === ROLE.MANAGE_APP) {
            _menu = MANAGE_APP_MENU.map((item) => ({
                title: item.title,
                icon: item.icon,
                path: item.rolePaths.manage_app
            }))
            setMenuList(_menu);
            return;
        }
    }

    const setInitPathIndexInMenuList = path => {
        if (role === ROLE.ADMIN) {
            ADMIN_MENU.forEach((item, indx) => {
                if (item?.rolePaths.admin === path && path !== '/admin') {
                    dispatch(setSelectedMenuItemIndex({ selectedMenuItemIndex: indx }))
                } 
                return;
            })
        }
        if (role === ROLE.STUDENT) {
            STUDENT_MENU.forEach((item, indx) => {
                if (item?.rolePaths.student === path && path !== '/student') {
                    dispatch(setSelectedMenuItemIndex({ selectedMenuItemIndex: indx }))
                } 
                return;
            })
        }
        if (role === ROLE.TEACHER) {
            TEACHER_MENU.forEach((item, indx) => {
                if (item?.rolePaths.teacher === path && path !== '/teacher') {
                    dispatch(setSelectedMenuItemIndex({ selectedMenuItemIndex: indx }))
                } 
                return;
            })
        }
        if (role === ROLE.BUSINESS) {
            BUSINESS_MENU.forEach((item, indx) => {
                if (item?.rolePaths.business === path && path !== '/business') {
                    dispatch(setSelectedMenuItemIndex({ selectedMenuItemIndex: indx }))
                } 
                return;
            })
        }
        if (role === ROLE.MANAGE_APP) {
            MANAGE_APP_MENU.forEach((item, indx) => {
                if (item?.rolePaths.manage_app === path && path !== '/manage-app') {
                    dispatch(setSelectedMenuItemIndex({ selectedMenuItemIndex: indx }))
                } 
                return;
            })
        }
    }
   
    const currentPath = (index) => menuList[index]?.path;

    const onNavigate = (currentSelectedMenuIndex) => {
        if (currentSelectedMenuIndex !== selectedMenuItemIndex) {
            dispatch(setSelectedMenuItemIndex({ selectedMenuItemIndex: currentSelectedMenuIndex }));
        } 
    }

    return (
        <React.Fragment>
            {
                isLogined  && (
                    <div className={cx('wrapper', {
                        logined: role !== ROLE.UNLOGINED
                    })}>
                        <img 
                            src="https://firebasestorage.googleapis.com/v0/b/internship-management-90eca.appspot.com/o/logo%2Fsecond-logo.png?alt=media&token=436b2e38-df1f-4727-bf7c-61cd2ea6514c"
                            alt="logo"
                            width={140}
                            height={100}
                            style={{objectFit: 'cover', cursor: 'pointer'}}
                            onClick={() => window.location.assign('/')}
                        />
                        <ul className={cx('menu-list')}>
                            {
                                menuList.length > 0 && menuList.map((item, index) => (
                                    <li 
                                        key={index} 
                                        className={cx('menu-item', {
                                            active: selectedMenuItemIndex === index
                                        })}
                                        onClick={() => onNavigate(index)}
                                    >
                                        <div className={cx('menu-item__icon')}>
                                            <FontAwesomeIcon icon={item.icon.name} size={item.icon.size}/>
                                        </div>
                                        <span>{item.title}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        </React.Fragment>
    )
}