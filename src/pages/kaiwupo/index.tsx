import { FC } from "react";
import TitleCard from "../../components/kaiwupotitle";
import BookBag from "../../components/bookbag";
import styles from "./kaiwupo.module.scss";

const Page: FC = ()=>{
    return (
        <div className={styles.page}>
            <TitleCard/>
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