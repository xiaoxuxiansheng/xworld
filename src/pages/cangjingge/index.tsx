// react 函数式组件
import { FC } from "react";
// 组件一
import TitleCard from "../../components/cangjinggetitle";
// 组件二
import BookTable from "../../components/booktable";
// 模块专属样式
import styles from "./cangjingge.module.scss";

/**
 * 藏经阁视图
 */
const Page: FC = ()=>{
    return (
        <div className={styles.page}>
            {/** 组件一 */}
            <TitleCard/>
            {/** 组件二 */}
            <BookTable/>
        </div>)
};

export default Page;