import { FC } from "react";
import { Card } from "antd";
import MonacoEditor from "react-monaco-editor";

import styles from "./bookcontent.module.scss";

export interface Props{
    content: string 
    visible: boolean
    language: string 
    onClose: ()=>void 
};

const { Meta } = Card;

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
        visible && 
        <Card
            className={styles.card}
        >
            <MonacoEditor
                width="620px"
                height="720px"
                language={language}
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



