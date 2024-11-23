import Request from "..";

export enum BookCategory{
    all = "",
    // 武学
    wuxue = "wuxue",
    // 营销学
    yingxiao = "yingxiao",
    // 心理学
    xinli = "xinli",
    // 经济学
    jingji = "jingji",
    // 计算机科学
    cs  = "cs"
};

/**
 * 获取秘籍列表请求参数
 */
export interface BooksReq{
    // 书名
    name: string 
    // 类别
    category: BookCategory 
};

/**
 * 获取秘籍列表响应参数
 */
export interface BooksResp{
    // 错误码 0——成功 其他——失败
    errno: number
    // 错误信息
    errmsg: string
    // 秘籍列表
    data: Book[]
};

/**
 * 秘籍信息
 */
export interface Book{
    // 索引
    id: string 
    // 名称
    name: string
    // 所在位置
    location: string 
    // 作者
    author: string
    // 类别  
    bookTypes: string[]
};

/**
 * @brief 向服务端发送请求查询秘籍
 * @param BooksReq
 * @returns BooksResp
 */
export const GetBooks = async(req: BooksReq):Promise<BooksResp>=>{
    return Request.get("/xworld/books",{method:"get",params:{"name":req.name, "category": req.category }});
};

/**
 * 获取秘籍响应参数
 */
export interface BookResp{
    // 错误码 0——成功 其他——失败
    errno: number
    // 错误信息
    errmsg: string
    // 秘籍列表
    data: BookContent
};

export interface BookContent{
    title: string 
    description: string 
    content: string 
    language: string 
    img: string 
};

/**
 * @brief 向服务端发送请求查询秘籍
 * @param name——书籍名称
 * @returns BookResp
 */
export const GetBook = async(name: string):Promise<BookResp>=>{
    return Request.get("/xworld/book",{method:"get",params:{"name":name }});
};