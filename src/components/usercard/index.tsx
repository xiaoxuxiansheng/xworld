import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Popconfirm } from "antd";

import { Info, Action } from "../../services/msg";
import { GetUser, User } from "../../services/user";

import styles from "./usercard.module.scss";

/**
 * 用户身份组件
 */
const Comp: FC = ()=>{
    const navigateTo = useNavigate();

    const [user,setUser] = useState<User | null>(null);

    // 生命周期钩子函数
    useEffect(()=>{
        const getAndSetUser = async()=>{
            const {errno, errmsg, data} = await GetUser( sessionStorage.getItem("user") as string );
            if (errno != 0){
                Info(Action.error,errmsg);
                return;
            }
            setUser(data);
        };
        getAndSetUser();
    },[]);

    // 注销
    const logout = ()=>{
        Info(Action.guiyin,"归隐成功~");
        sessionStorage.removeItem("user");
        setUser(null);
        navigateTo('/yingxiongtie');
    };



    return (
    <Card
        hoverable
        className={styles.usercard}
        cover={<img src={user?.avatar}/>}
    >
        <h3>姓名：{user?.name}</h3>
        <h3>门派: {user?.menpai}</h3>
        <h3>绝招: {user?.juezhao}</h3>
        <Popconfirm
            className={styles.popconfirm}
            overlayClassName={styles.popconfirmOverlay}
            placement="leftTop"
            title="确认归隐吗？"
            onConfirm={logout}
            okText="是"
            cancelText="否"
        >
            <button>归隐</button>
        </Popconfirm>

    </Card>
    )
};

export default Comp;