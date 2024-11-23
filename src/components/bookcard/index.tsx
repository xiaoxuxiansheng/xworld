import { FC, useEffect, useState } from "react";
import { Card, Image } from 'antd';

import { GetBook, BookContent as Book } from "../../services/book";
import { Info, Action } from "../../services/msg";

import styles from "./book.module.scss";

export interface Props{
    // 书籍名称
    name: string 
    // 打开书籍时执行的回调函数
    onClick: (book: Book)=>void
};

/**
 * 秘籍组件
 */
const Comp: FC<Props> = ({name, onClick}: Props)=>{
    const [book, setBook] = useState<Book|null>(null);

    useEffect(()=>{
        const getBook = async()=>{
            const {errno, errmsg, data} = await GetBook(name);
            if (errno != 0){
                Info(Action.error,errmsg);
                return;
            }
            setBook(data);
        };
        getBook();
    },[]);

    return (
        book && (
            <Card
                hoverable
                className={styles.card}
                onClick={()=>onClick(book)}
            >  
                <Image className={styles.image} src={book.img} preview={false}/>
                <h3>{name}</h3>
                <p>{book.description}</p>
                <button>开始修习</button>
            </Card>
        )
    );
};

export default Comp;