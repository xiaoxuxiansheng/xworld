import { FC, useState, useEffect } from "react";
import { Card } from "antd";

import styles from "./musiccard.module.scss";

const { Meta } = Card;

interface Props{
    src: string;
}

/**
 * @brief 音乐播放器组件
 * @param src——音乐资源所在路径
 */
const Comp: FC<Props> = ({src}: Props) =>{

    // 设置播放器
    const [player, setPlayer] = useState<HTMLAudioElement | null>(null);
    // 设置播放状态. true——播放 false——停止
    const [playing, setPlaying] = useState<boolean>(false);

    // 生命周期钩子函数
    useEffect(()=>{
        // 创建播放器
        const audioPlayer = new Audio(src);
        // 循环播放
        audioPlayer.loop = true; 
        // 将播放器实例设置到 state 中
        setPlayer(audioPlayer);
        // 卸载前停止音乐
        return ()=>{
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
        };
    },[]);

    // 播放音乐
    const playMusic = ()=>{
        setPlaying(true);
        player?.play();
    };

    // 停止音乐
    const pauseMusic = ()=>{
        setPlaying(false);
        player?.pause();
    };


    return (
    <Card
        hoverable
        onClick={playing ? pauseMusic : playMusic}
        cover={<img src="/img/music.jpeg"/>}
        className={styles.musiccard}
    >
        <Meta 
            title={playing ? "暂停音乐 ⏸" : "播放音乐 🎵"}
            className={styles.musicmeta}
        />
    </Card>)
};

export default Comp;

