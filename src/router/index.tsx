import { FC, useEffect } from "react";
import { Navigate, RouteObject, useRoutes, useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";

import YingXiongTie from "../pages/yingxiongtie";
import SiGuoYa from "../pages/siguoya";
import CangJingGe from "../pages/cangjingge";
import KaiWuPo from "../pages/kaiwupo";

import { Info, Action } from "../services/msg";

/**
 * 路由器声明
 * - /yingxiongtie -> 英雄帖
 * - / -> 思过崖
 *   - /cangjingge -> 藏经阁
 *   - /kaiwupo -> 开悟坡
 * - * 重定向到 /
 * 
 */
const routes : RouteObject[] = [
    {
        path: "*",
        element: <Navigate to="/"/>
    },
    {
        path: "/yingxiongtie",
        element: <YingXiongTie/>
    },
    {
        path: "/",
        element: <SiGuoYa/>,
        children: [
            {
                path: "/cangjingge",
                element: <CangJingGe/>
            },
            {
                path: "/kaiwupo",
                element: <KaiWuPo/>
            }
        ]
    }
];

/**
 * 路由组件
 */
const Router: FC = ()=>{
    // 依据路由关系，基于 path 映射到对应组件
    const outlet = useRoutes(routes);
    const location = useLocation();

    // 获取登录用户信息
    const user = sessionStorage.getItem("user");
    // 已登录则跳转至正式页面 - 思过崖
    if (user && location.pathname == "/yingxiongtie"){
        return (<ToSiGuoYa/>);
    }

    // 未登录则跳转至登录页面 - 英雄帖
    if (!user && location.pathname != "/yingxiongtie"){
        return (<ToYingXiongTie/>);
    }

    return outlet;
};

// 跳转到登录页面 - 英雄帖
const ToYingXiongTie: FC = ()=>{
    const navigateTo = useNavigate();
    useEffect(()=>{
        navigateTo("/yingxiongtie");
        Info(Action.navigate, "请先递交英雄帖");
    },[]);
    return (<div/>);
};

// 跳转到正式页面 - 思过崖
const ToSiGuoYa: FC = ()=>{
    const navigateTo = useNavigate();
    useEffect(()=>{
        navigateTo("/siguoya");
        Info(Action.navigate, "如需归隐，请在左上角完成操作~");
    },[]);
    return (<div/>);
};

export default Router;

