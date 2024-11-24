// FC——react 函数式组件
import { FC } from "react";
// 组件一
import TitleCard from "../../components/kaiwupotitle";
// 组件二
import BookBag from "../../components/bookbag";
// 模块专属样式
import styles from "./kaiwupo.module.scss";

/**
 * 开悟坡视图
 */
const Page: FC = ()=>{
    return (
        <div className={styles.page}>
            {/** 组件一 */}
            <TitleCard/>
            {/** 组件二 */}
            <BookBag 
                name1="六脉神剑"
                name2="九阴真经"
                name3="计算广告"
                name4="经济学原理"
            />
        </div>
    )
};

export default Page;