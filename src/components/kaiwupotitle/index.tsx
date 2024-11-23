import { FC } from "react";
import { Card } from "antd";
import { useSpring, animated } from "@react-spring/web";

import styles from "./titlecard.module.scss";

/**
 * 开悟坡标题组件
 */
const Comp: FC = ()=>{
    const animation = useSpring({
        to: {opacity: 1},
        from: {opacity: 0},
        config: {duration: 4500}
    });
    return (
        <animated.div style={animation}>
            <Card
                className={styles.card}
            >
                <p>攀登 · 愚昧之山</p>
                <p>跨越 · 绝望之谷</p>
                <h2>驻足 · 开悟之坡</h2>
            </Card>
        </animated.div>
    );
};

export default Comp; 