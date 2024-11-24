// FC——react 函数式组件  useEffect——组件生命周期回调函数  useState——组件 state 属性
import { FC, useState, useEffect } from "react";
// Table——表格组件 Tag——标签组件 Popconfirm——确认弹窗组件 Select——选择器组件
import { Table, Tag, Popconfirm, Select } from "antd";
// 项目内实现的提示组件
import { Info, Action } from "../../services/msg";
// 向服务端请求获取书籍列表的业务方法
import { GetBooks, Book, BookCategory } from "../../services/book";
// 模块专属样式
import styles from "./booktable.module.scss";

// 表格中的列
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
 * 书籍表格组件
 */
const Comp: FC = ()=>{
    // state 数据：books——查询得到的书籍列表
    const [books, setBooks] = useState<Book[]>([]);
    // state 数据：用户检索前设置的书籍品类查询条件
    const [category, setCategory] = useState<BookCategory>(BookCategory.all);
    // state 数据：用户检索前输入的书籍名称查询条件
    const [name, setName] = useState<string>("");

    // 组件渲染、更新、卸载环节执行的回调钩子函数
    useEffect(()=>{
        getBooks();
    },[]);

    // 请求服务端获取到书籍列表，并设置到 state 中
    const getBooks: ()=>void = async()=>{
        const {errno, errmsg, data} = await GetBooks({name,category});
        if (errno != 0){
            Info(Action.error, errmsg);
            return;
        }
        setBooks(data);
    };

    // 响应用户输入书籍名称的回调函数
    const recordName = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setName(e.target.value);
    };

    // 响应用户设置书籍品类的回调函数
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

    // 响应用户借阅操作的回调函数
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
                    // 分页设置
                    pagination={{
                        pageSize:4,
                        showSizeChanger:false,
                        className: "ant-table-pager",
                        showLessItems:true
                    }}
                    locale={{ emptyText: '目标书籍不存在' }}
                >
                    {/** 表格中的列
                     * 默认以 dataIndex 获取字段进行展示
                     * 可以通过 render 方法改写渲染逻辑 
                    */}
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