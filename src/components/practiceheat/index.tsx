import { FC, useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import { Card } from "antd";

import styles from "./practiceheat.module.scss";

import { Info, Action } from "../../services/msg";
import { GetPracticeHeats, PracticeHeat } from "../../services/user";

/**
 * 用户修行热点图组件
 */
const Comp: FC = ()=>{
    const [practiceHeats, setPracticeHeats] = useState<PracticeHeat[]>([]);
    
    useEffect(()=>{
        const getPracticeHeats = async()=>{
            const {errno, errmsg, data} = await GetPracticeHeats(sessionStorage.getItem("user") as string);
            if (errno != 0){
                Info(Action.error, errmsg);
                return;
            }
            setPracticeHeats(data);
        }  
        getPracticeHeats();
    },[]);

    return (
        <Card
            className={styles.card}
        >
            <h2>修行热点图</h2>
            <HeatMap
                className={styles.heatmap}
                value={practiceHeats}
                weekLabels={['日曜','月曜','火曜','水曜','木曜','金曜','土曜']}
                monthLabels={['小寒','立春','惊蛰','清明','立夏','芒种','小暑','立秋','白露','寒霜','立冬','大雪']}
                startDate={new Date('2024/01/01')}
            />
        </Card>
    );
};

export default Comp;
