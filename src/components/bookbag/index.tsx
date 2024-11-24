/**
 * FC——react 函数式组件  
 * useState——创建 state 属性
 */
import { FC, useState } from "react";

import { BookContent as Book } from "../../services/book";
// 书籍悬浮卡组件
import BookCard from "../bookcard";
// 点击书籍悬浮卡后，展开进行阅读的书籍内容组件
import BookContent from "../bookcontent";
// 模块专属样式
import styles from "./bookbag.module.scss";

// bookbag 的 properties
interface Props{
    // 四本书籍名称
    name1: string
    name2: string 
    name3: string 
    name4: string
}

/**
 * 书籍行囊组件
 */
const Comp: FC<Props> = ({name1, name2, name3, name4}:Props)=>{
    // state：记录当前打开阅读的书籍
    const [openBook, setOpenBook] = useState<Book | null>(null);
    return (
        <div>
            {/** 依次排列四个书籍悬浮卡组件 */}
            <div className={styles.book1}>
                <BookCard 
                    // 设置书籍名称
                    name={name1}
                    // 设置点击动作回调函数
                    onClick={(book: Book)=>{setOpenBook(book)}}
                />
            </div>
            <div className={styles.book2}>
                <BookCard 
                    // 设置书籍名称
                    name={name2}
                    // 设置点击动作回调函数
                    onClick={(book: Book)=>{setOpenBook(book)}}
                />
            </div>
            <div className={styles.book3}>
                <BookCard
                    // 设置书籍名称
                    name={name3}
                    // 设置点击动作回调函数
                    onClick={(book: Book)=>{setOpenBook(book)}}
                />
            </div>
            <div className={styles.book4}>
                <BookCard 
                    // 设置书籍名称
                    name={name4}
                    // 设置点击动作回调函数
                    onClick={(book: Book)=>{setOpenBook(book)}}
                />
            </div>
            {/** 正在阅读的书籍内容组件 */}
            <div className={styles.bookcontent}>
                {openBook && (
                    <BookContent
                        // 设置书籍内容
                        content={openBook.content}
                        // 设置书籍语言
                        language={openBook.language}
                        // 设置可见性
                        visible={openBook!=null}
                        // 设置关闭动作回调函数
                        onClose={()=>{setOpenBook(null)}}
                    />
                )}
            </div>
        </div>
    );
};

export default Comp;