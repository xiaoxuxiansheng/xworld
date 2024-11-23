import { FC, useState, useEffect } from "react";
import { Card, Timeline } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

import { Info, Action } from "../../services/msg";
import { GetFootPrints, FootPrint } from "../../services/user";

import styles from "./footprint.module.scss";

// 用户访问足迹组件
const Comp: FC = ()=>{
    const [footprints, setFootPrints] = useState<FootPrint[]>([]);

    useEffect(()=>{
        const getFootPrints = async()=>{
            const {errno, errmsg, data} = await GetFootPrints(sessionStorage.getItem("user") as string);
            if (errno != 0){
                Info(Action.error, errmsg);
                return;
            }
            setFootPrints(data);
        };
        getFootPrints();
    },[]);  

    return (
    <Card
        className={styles.card}
    >
        <h2>近期足迹</h2>
        <Timeline
            mode="left"
            items={footprints.map((footprint:FootPrint)=>{
                if (footprint.highlight){
                    return {
                        label: footprint.date,
                        children: footprint.value,
                        color: "red",
                        dot: <ClockCircleOutlined/>
                    };                
                }
                return {
                    label: footprint.date,
                    children: footprint.value
                };
            })}
            className={styles.timeline}
        />
    </Card>
    )

};

export default Comp;