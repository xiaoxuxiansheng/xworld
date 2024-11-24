/**
 * FC——react 函数式组件  
 * useState——创建 state 属性
 */
import React, { FC, useState } from "react";
// react router 编程式路由导航组件
import { useNavigate } from "react-router-dom";
// antd 卡片组件
import { Card } from "antd";

// 向服务端发出登录请求的业务方法
import { Login } from "../../services/login";
// 自制的提示信息输出
import { Info, Action } from "../../services/msg";

// 登录盒子模块的专属样式
import styles from "./logincard.module.scss";

/**
 * 登录卡组件
 */
const Comp: FC = ()=>{
    // 基于编程方式进行路由导航
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
        // 向服务端发起登录请求
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
                {/**input 框内容变化时，执行回调函数将内容更新到 state 中 */}
                <input type="text" placeholder="输入姓名" onChange={recordUser}/>
                <input type="password" placeholder="输入暗号" onChange={recordPasswd}/>
                {/**
                 * 按钮被点击时，执行 toLogin 方法：
                 * 1）向服务端发送请求，校验用户信息合法性
                 * 2）若校验通过使用 navigate 导航到正式页面
                 */}
                <input type="button" value="启程" onClick={toLogin}/>
            </form>
        </Card>
    )


};

export default Comp;