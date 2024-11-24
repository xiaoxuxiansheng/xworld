// FC——react 函数式组件  useEffect——组件生命周期回调函数  useState——组件 state 属性
import { FC, useState, useEffect } from "react";
// antd 卡片、图片组件
import { Card, Image } from "antd";
// react-spring 动画组件
import { useSpring, animated } from "@react-spring/web";
// 模块专属样式
import styles from "./viewflip.module.scss";

/**
 * 思过崖四季风景图
 */
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
 * 思过崖风景动图组件
 * 1）实现四级风景动态轮换
 * 2）实现图片平滑切换效果
 */
const Comp: FC = ()=>{
    // state 记录当前展示图片 index
    const [page, setPage] = useState<number>(0);

    /**
     * 组件渲染、更新、卸载环节执行的回调钩子函数
     * 1）创建定时器，控制每 6 秒切换一次 page index，实现图片切换
     * 2）组件卸载前，回收定时器
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
                    // 根据 state 记录的 index 控制应该渲染的风景图
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