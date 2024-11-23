import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";

import UserCard from "../../components/usercard";
import MusicCard from "../../components/musiccard";
import MapCard from "../../components/mapcard";
import PracticeHeat from "../../components/practiceheat";
import ViewFlips from "../../components/viewflip";
import FootPrints from "../../components/footprint";

import styles from "./siguoya.module.scss"

const Page: FC = ()=>{
    const location = useLocation();
    return (
    <div>
        <UserCard/>
        <MusicCard src="/audio/siguoya.mp3"/>
        <MapCard/>
        <Outlet/>
        {
            location.pathname == "/" && 
            <div className={styles.page}>
                <PracticeHeat/>
                <ViewFlips/>
                <FootPrints/>
            </div>
        }
    </div>)
};

export default Page;