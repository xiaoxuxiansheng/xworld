// FC——react 函数式组件  useEffect——组件生命周期回调函数  useState——组件 state 属性
import { FC, useEffect, useState } from "react";
// 热点图第三方组件
import HeatMap from "@uiw/react-heat-map";
// antd 卡片组件
import { Card } from "antd";

// 通用信息提示方法
import { Info, Action } from "../../services/msg";
// 向服务端请求获取热点记录方法
import { GetPracticeHeats, PracticeHeat } from "../../services/user";

// 组件专属样式
import styles from "./practiceheat.module.scss";

/**
 * 用户修行热点图组件
 */
const Comp: FC = ()=>{
    // state属性：practiceHeats——热点记录
    const [practiceHeats, setPracticeHeats] = useState<PracticeHeat[]>([]);
    
    // 组件渲染、更新、卸载环节执行的回调钩子函数
    useEffect(()=>{
        // 请求服务端获取到该用户对应的热点记录，并设置到 state 中
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
            {/** 读取 state：practiceHeats 渲染到热力图中*/}
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
