import Request from "..";

// 登录响应参数
export interface LoginResp{
    // 错误码 0——成功 其他——失败
    errno: number
    // 错误信息
    errmsg: string
};

/**
 * @brief 向服务端发送登录请求
 * @param user ——用户名
 * @param passwd ——密码
 * @returns LoginResp
 */
export const Login = async(user: string, passwd: string):Promise<LoginResp>=>{
    return Request.post("/xworld/login",{"user": user, "passwd": passwd});
};