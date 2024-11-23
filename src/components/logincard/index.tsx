import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";

import { Login } from "../../services/login";
import { Info, Action } from "../../services/msg";

import styles from "./logincard.module.scss";

/**
 * 登录卡组件
 */
const Comp: FC = ()=>{
    const navigateTo = useNavigate();

    // 将用户名与密码记录到 state 中
    const[user, setUser] = useState<string>("");
    const[passwd, setPasswd] = useState<string>("");

    // 更新用户名
    const recordUser = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setUser(e.target.value);
    };

    // 更新密码
    const recordPasswd = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setPasswd(e.target.value);
    };

    // 登录处理
    const toLogin = async ()=>{
        const {errno, errmsg} = await Login(user,passwd);
        if (errno != 0){
            Info(Action.error,errmsg);
            return;
        }
         // 登录成功，设置用户信息
        sessionStorage.setItem("user",user);
        Info(Action.navigate,"启程成功~");
        navigateTo("/");
    };

    return (
        <Card
            hoverable
            className={styles.logincard}
        >
            <form>
                <h2>英雄帖</h2>
                <p>相逢意气为君饮，系马高楼垂柳边</p>
                <input type="text" placeholder="输入姓名" onChange={recordUser}/>
                <input type="password" placeholder="输入暗号" onChange={recordPasswd}/>
                <input type="button" value="启程" onClick={toLogin}/>
            </form>
        </Card>
    )


};

export default Comp;