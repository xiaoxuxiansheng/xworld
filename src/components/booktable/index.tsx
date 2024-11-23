import { FC, useState, useEffect } from "react";
import { Table, Tag, Popconfirm, Select } from "antd";

import { Info, Action } from "../../services/msg";
import { GetBooks, Book, BookCategory } from "../../services/book";

import styles from "./booktable.module.scss";

const { Column } = Table;

const categoryOpts = [
    {
        value: "all", label: "全部", key:"0"
    },
    {
        value: "wuxue", label: "武学",key:"1"
    },
    {
        value: "yingxiao", label: "营销学",key:"2"
    },
    {
        value: "xinli", label: "心理学",key:"3"
    },
    {
        value: "jingji", label: "经济学",key:"4"
    },
    {
        value: "cs", label: "计算机科学",key:"5"
    }
];

/**
 * 秘籍列表组件
 */
const Comp: FC = ()=>{
    const [books, setBooks] = useState<Book[]>([]);
    const [category, setCategory] = useState<BookCategory>(BookCategory.all);
    const [name, setName] = useState<string>("");

    useEffect(()=>{
        getBooks();
    },[]);

    const getBooks = async()=>{
        const {errno, errmsg, data} = await GetBooks({name,category});
        if (errno != 0){
            Info(Action.error, errmsg);
            return;
        }
        setBooks(data);
    };

    const recordName = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setName(e.target.value);
    };

    const changeCategory = (value: string)=>{
        switch (value){
            case "wuxue":
                setCategory(BookCategory.wuxue);
                break;
            case "yingxiao":
                setCategory(BookCategory.yingxiao);
                break;
            case "xinli":
                setCategory(BookCategory.xinli);
                break;
            case "jingji":
                setCategory(BookCategory.jingji);
                break; 
            case "cs":
                setCategory(BookCategory.cs);
                break;
            default:
                setCategory(BookCategory.all);
                break;
        }
    };

    const getTagColor = (bookType: string)=>{
        let color: string = "gray";
        if (bookType.includes("心理")){
            color = "purple";
        }else if (bookType.includes("经济")){
            color = "red";
        }else if (bookType.includes("武学")){
            color = "geekblue";
        }else if (bookType.includes("营销")){
            color = "orange"
        }else if (bookType.includes("科学")){
            color = "green";
        }

        return color;
    }

    const subscribeBook = (book: Book)=>{
        Info(Action.jieyue,"借阅「"+book.name+"」失败，借阅数量已达上限！");
    };

    return (
        <div>
            <p className={styles.bookname}>书名</p>
                <input 
                    type="text" 
                    onChange={recordName}
                    className={styles.input}
                />
                <p className={styles.category}>品类</p>
                <Select
                    className={styles.bookCategory}
                    options={categoryOpts}
                    defaultValue="all"
                    popupClassName={styles.bookCategoryDropDown}
                    onSelect={changeCategory}
                />
                <button className={styles.searchButton} onClick={getBooks}>检索</button>
            <div className={styles.booktable}>
                <Table<Book>
                    scroll={{ x: 720, y: 500 }}
                    dataSource={books}
                    pagination={{
                        pageSize:4,
                        showSizeChanger:false,
                        className: "ant-table-pager",
                        showLessItems:true
                    }}
                    locale={{ emptyText: '目标书籍不存在' }}
                >
                    <Column
                        title="书籍"
                        dataIndex="name"
                        key="name"
                        width={188}
                        render={(name: string)=>{
                            return <p className={styles.bookFont}>「{name}」</p>
                        }}
                    />
                    <Column
                        title="作者"
                        dataIndex="author"
                        key="author"
                        width={170}
                    />
                    <Column
                        title="位置"
                        dataIndex="location"
                        key="location"
                        width={140}
                    />
                    <Column
                        title="品类"
                        dataIndex="bookTypes"
                        key="bookTypes"
                        width={140}
                        render={(bookTypes: string[])=>{
                            return (
                                <div>
                                    {
                                        bookTypes.map((bookType: string)=>{
                                            return (
                                                <Tag
                                                    color={getTagColor(bookType)}
                                                    key={bookType}
                                                    className={styles.tagFont}
                                                >
                                                    {bookType}
                                                </Tag>
                                            );
                                        })
                                    }
                                </div>
                            );
                        }}
                    />
                    <Column
                        title="操作"
                        key="action"
                        width={100}
                        render={(_: any, book: Book)=>{
                            return (
                                <Popconfirm
                                    className={styles.popconfirm}
                                    overlayClassName={styles.popconfirmOverlay}
                                    placement="leftTop"
                                    title={"确认借阅「"+ book.name + "」吗？"}
                                    onConfirm={()=>{subscribeBook(book)}}
                                    okText="是"
                                    cancelText="否"
                                >
                                    <button className={styles.button}>借阅</button>
                                </Popconfirm>
                            );
                        }}
                    />
                </Table>
            </div>
        </div>
    );
};

export default Comp;