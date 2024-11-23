import { FC } from "react";

import MusicCard from "../../components/musiccard";
import LoginCard from "../../components/logincard";

import styles from "./yingxiongtie.module.scss";

const Page: FC = ()=>{
    return (
    <div className={styles.page}>
        <LoginCard />
        <MusicCard src="/audio/yingxiongtie.mp3"/>
    </div>)
};

export default Page;