// FC——react 函数式组件
import { FC } from "react";
// outlet——渲染工具：路由->组件  useLocation——编程式路由导航组件
import { Outlet, useLocation } from "react-router-dom";

// 组件一
import UserCard from "../../components/usercard";
// 组件二
import MusicCard from "../../components/musiccard";
// 组件三
import MapCard from "../../components/mapcard";
// 组件四
import PracticeHeat from "../../components/practiceheat";
// 组件五
import ViewFlips from "../../components/viewflip";
// 组件六
import FootPrints from "../../components/footprint";
// 专属样式
import styles from "./siguoya.module.scss"

/**
 * 思过崖视图
 */
const Page: FC = ()=>{
    const location = useLocation();
    return (
    <div>
        {/** 组件一 */}
        <UserCard/>
        {/** 组件二 */}
        <MusicCard src="/audio/siguoya.mp3"/>
        {/** 组件三 */}
        <MapCard/>
        <Outlet/>
        {
            location.pathname == "/" && 
            <div className={styles.page}>
                {/** 组件四 */}
                <PracticeHeat/>
                {/** 组件五 */}
                <ViewFlips/>
                {/** 组件六 */}
                <FootPrints/>
            </div>
        }
    </div>)
};

export default Page;