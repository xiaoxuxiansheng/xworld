import { FC } from "react";
import { Card } from "antd";
import { useSpring, animated } from "@react-spring/web";

import styles from "./titlecard.module.scss";

/**
 * 藏经阁标题组件
 */
const Comp: FC = ()=>{
    // 设置动画平滑过渡效果
    const animation = useSpring({
        to: { opacity: 1},
        from: { opacity: 0},
        config: { duration: 3500 }, // 平滑过渡时长 3.5s
        reset: true // 重复执行
    });

    return (
        <animated.div style={animation}>
            <Card 
                className={styles.card}
            >
                <h2>藏经阁</h2>
                <p>大藏五千卷，万法还归一 ——藏经阁</p>
            </Card>
        </animated.div>
    )
};

export default Comp;