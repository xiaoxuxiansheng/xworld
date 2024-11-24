// FC——react 函数式组件
import { FC } from "react";

// 音乐播放器组件
import MusicCard from "../../components/musiccard";
// 登录盒子组件
import LoginCard from "../../components/logincard";
// 英雄帖模块的专属样式
import styles from "./yingxiongtie.module.scss";

/**
 * 登录页面——英雄帖
 */
const Page: FC = ()=>{
    return (
    <div className={styles.page}>
        {/* 组件一：登录盒子 */}
        <LoginCard />
        {/* 组件二：音乐播放器 */}
        <MusicCard src="/audio/yingxiongtie.mp3"/>
    </div>)
};

export default Page;