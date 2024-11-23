import { FC, useState } from "react";

import { BookContent as Book } from "../../services/book";
import BookCard from "../bookcard";
import BookContent from "../bookcontent";

import styles from "./bookbag.module.scss";

interface Props{
    // 四本书籍名称
    name1: string
    name2: string 
    name3: string 
    name4: string
}

const Comp: FC<Props> = ({name1, name2, name3, name4}:Props)=>{
    // 设置正在打开的书籍
    const [openBook, setOpenBook] = useState<Book | null>(null);
    return (
        <div>
            <div className={styles.book1}>
                <BookCard 
                    name={name1}
                    onClick={(book: Book)=>{setOpenBook(book)}}
                />
            </div>
            <div className={styles.book2}>
                <BookCard 
                    name={name2}
                    onClick={(book: Book)=>{setOpenBook(book)}}
                />
            </div>
            <div className={styles.book3}>
                <BookCard 
                    name={name3}
                    onClick={(book: Book)=>{setOpenBook(book)}}
                />
            </div>
            <div className={styles.book4}>
                <BookCard 
                    name={name4}
                    onClick={(book: Book)=>{setOpenBook(book)}}
                />
            </div>
            <div className={styles.bookcontent}>
                {openBook && (
                    <BookContent
                        content={openBook.content}
                        language={openBook.language}
                        visible={openBook!=null}
                        onClose={()=>{setOpenBook(null)}}
                    />
                )}
            </div>
        </div>
    );
};

export default Comp;