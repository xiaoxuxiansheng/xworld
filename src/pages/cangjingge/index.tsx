import { FC } from "react";
import TitleCard from "../../components/cangjinggetitle";

import BookTable from "../../components/booktable";

import styles from "./cangjingge.module.scss";

const Page: FC = ()=>{
    return (
        <div className={styles.page}>
            <TitleCard/>
            <BookTable/>
        </div>)
};

export default Page;