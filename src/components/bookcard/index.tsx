// FC——react 函数式组件  useEffect——组件生命周期回调函数  useState——组件 state 属性
import { FC, useEffect, useState } from "react";
import { Card, Image } from 'antd';

import { GetBook, BookContent as Book } from "../../services/book";
import { Info, Action } from "../../services/msg";

import styles from "./book.module.scss";

// bookcard 的 properties
export interface Props{
    // 书籍名称
    name: string 
    // 点击书籍时执行的回调函数
    onClick: (book: Book)=>void
}

/**
 * 秘籍组件
 */
const Comp: FC<Props> = ({name, onClick}: Props)=>{
    // state 缓存查询得到的书籍
    const [book, setBook] = useState<Book|null>(null);

    /** 生命周期 hook 函数
     * 根据传入的 props.name 查询得到书籍信息，并设置到 state：book 中
     */
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
                // 用户点击卡片时，执行 props.onClick 函数，并将缓存的 state：book 传入
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