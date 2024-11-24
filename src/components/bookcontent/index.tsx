import { FC } from "react";
import { Card } from "antd";
// 代码编辑器
import MonacoEditor from "react-monaco-editor";
import styles from "./bookcontent.module.scss";

// bookcontent properties
export interface Props{
    // 书籍内容
    content: string 
    // 是否可见
    visible: boolean
    // 语言
    language: string 
    // 用户点击关闭时的回调函数
    onClose: ()=>void 
};

const { Meta } = Card;

/**
 * 正在阅读的书籍内容组件
 */
const Comp: FC<Props> = ({content, visible,language, onClose} : Props) =>{
    const options = {
        readOnly: true,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        scrollBeyondLastColumn: 0,
        fontFamily: "Consolas",
        fontSize: 12,
        fontWeight: "bold",
        fontStyle: "oblique 15deg",
        minimap:{
            enabled: false
        }
    };
    return (
        // 根据 visible 控制该组件是否可见
        visible && 
        <Card
            className={styles.card}
        >
            <MonacoEditor
                width="620px"
                height="720px"
                // 根据传入的 props.language 设置书籍语言
                language={language}
                // 根据传入的 props.content 设置书籍内容
                value={content}
                options={options}
            />
            <Card
                hoverable
                className={styles.closecard}
                cover={<img src="/img/close-book.jpeg"/>}
                onClick={onClose}
            >
                <Meta className={styles.closemeta} title="❌ 合上书籍"/>
            </Card>
        </Card>
    );
};

export default Comp;



