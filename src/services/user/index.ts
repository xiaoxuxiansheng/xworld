import Request from "..";

/**
 * 获取用户信息响应参数
 */
export interface UserResp{
    // 错误码 0——成功 其他——失败
    errno: number
    // 错误信息
    errmsg: string
    // 用户信息
    data: User
};

/**
 * 用户信息
 */
export interface User{
    // 姓名
    name: string
    // 门派
    menpai: string 
    // 绝招
    juezhao: string
    // 头像  
    avatar: string
};

/**
 * @brief 向服务端发送请求查询用户信息
 * @param user ——用户名
 * @returns UserResp
 */
export const GetUser = async(user: string):Promise<UserResp>=>{
    return Request.get("/xworld/user",{method:"get",params:{"user":user}});
};

/**
 * 获取用户修行热点图
 */
export interface PracticeHeatsResp{
    // 错误码 0——成功 其他——失败
    errno: number
    // 错误信息
    errmsg: string
    // 修行热点记录
    data: PracticeHeat[]
};

/**
 * 一条修行热点记录
 */
export interface PracticeHeat{
    // 日期. 格式 YYYY/MM/DD
    date: string 
    // 热点值
    count: number
}

/**
 * @brief 向服务端发送请求查询用户修行热点记录
 * @param user ——用户名
 * @returns PracticeHeatResp
 */
export const GetPracticeHeats = async(user: string):Promise<PracticeHeatsResp>=>{
    return Request.get("/xworld/practiceheats",{method:"get",params:{"user":user}});
};

/**
 * 获取用户足迹
 */
export interface FootPrintsResp{
    // 错误码 0——成功 其他——失败
    errno: number
    // 错误信息
    errmsg: string
    // 足迹记录
    data: FootPrint[]
};

/**
 * 一条足迹
 */
export interface FootPrint{
    // 日期. 格式 X月Y日
    date: string 
    // 内容
    value: string
    // 是否突出强调
    highlight: boolean
}

/**
 * @brief 向服务端发送请求查询用户足迹记录
 * @param user ——用户名
 * @returns FootPrintsResp
 */
export const GetFootPrints = async(user: string):Promise<FootPrintsResp>=>{
    return Request.get("/xworld/footprints",{method:"get",params:{"user":user}});
};