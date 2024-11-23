import { FC, useState, useEffect } from "react";
import { Card, Image } from "antd";
import { useSpring, animated } from "@react-spring/web";

import styles from "./viewflip.module.scss";

// 思过崖四季风景
const views: JSX.Element[] = [
    (<div key="0">
        <h2>思过崖 · 春</h2>
        <p>天下英雄出我辈，一入江湖岁月催<br/>——令狐冲 · 江湖行</p>
        <Image
            width={310}
            src="/img/chun.jpg"
            preview={false}
        />
    </div>),
    (<div key="1">
        <h2>思过崖 · 夏</h2>
        <p>三十六峰长剑在，星斗气，郁峥嵘<br/>——元好问 · 江城子</p>
        <Image
            width={310}
            src="/img/xia.jpg"
            preview={false}
        />
    </div>),
    (<div key="2">
        <h2>思过崖 · 秋</h2>
        <p>满堂花醉三千客，一剑霜寒十四州<br/>——贯休 · 献钱尚父</p>
        <Image
            width={310}
            src="/img/qiu.jpg"
            preview={false}
        />
    </div>),
    (<div key="3">
        <h2>思过崖 · 冬</h2>
        <p>寒鸦踏雪枝头笑，孤影衣单舞剑人<br/>——七绝 · 冬至练剑</p>
        <Image
            width={310}
            src="/img/dong.jpg"
            preview={false}
        />
    </div>)
]

/**
 * 思过崖四级风景展示组件
 */
const Comp: FC = ()=>{
    const [page, setPage] = useState<number>(0);

    /**
     * 生命周期钩子函数
     * 通过定时器控制每 6 秒切换一次风景图
     */
    useEffect(()=>{
        const interval = setInterval(()=>{
            setPage((prev)=>(prev + 1)%4);
        },6000);
        // 退出前清理定时器
        return ()=>{
            clearInterval(interval);
        };
    },[]);

    // 设置动画平滑过渡效果
    const animation = useSpring({
        to: { opacity: 1},
        from: { opacity: 0},
        config: { duration: 3500 }, // 平滑过渡时长 3.5s
        reset: true // 重复执行
    });

    return (
        <Card
            className={styles.card}
        >
            {
                views.map((view: JSX.Element)=>(
                    view.key == page.toString() && 
                    <animated.div 
                        key={view.key}
                        style={animation}
                    >
                        {view}
                    </animated.div>
                ))}
        </Card>
    );
};

export default Comp;