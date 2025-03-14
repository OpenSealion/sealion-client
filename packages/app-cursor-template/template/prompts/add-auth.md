# 恢复权限功能

以下是权限相关代码，可以将其恢复到对应文件中以启用权限功能。
要求：代码缩进为 4 个空格

## src/config/auth.ts

```typescript
// 登录相关配置信息

export const { VITE_NODE } = import.meta.env;

// 开启单点登录开关
export const openOSS = true;

export const ClientIdMap = {
  development: "modjkaa3v93xnjop2weq",
  staging: "g6rlyoqq3kxgzdzoe84q",
  production: "nvnoqg6maqjaq3ldzrqb",
};

// 登录跳转链接
export const LogURLMap = {
  development: "https://sso.dev.openxlab.org.cn",
  staging: "https://sso.staging.openxlab.org.cn",
  production: "https://sso.openxlab.org.cn",
};

// 注意 Development环境的domain前面必须加 . 因为，本地开发环境和线上开发环境域名不同
// 如果发生反复跳转，请在浏览器中查看后端返回的cookie的domain是否有问题
export const TokenCookieDomainMap = {
  development: ".opencompass.org.cn",
  staging: "staging.opencompass.org.cn",
  production: "opencompass.org.cn",
};

export const clientId = ClientIdMap[VITE_NODE];
export const logURL = LogURLMap[VITE_NODE];
export const TokenCookieDomain = TokenCookieDomainMap[VITE_NODE];

// 针对权限更细化的配置信息

// 需要权限验证的页面可以把对应的pathname放到这里
export const AuthPages: string[] = [
  "/mmbench-submission",
  "/evaluate-submit",
  "/evaluate-list",
];

// 有些接口不需要token
export const NoTokenApiPaths: string[] = ["/account/oauth"];
```

## src/components/auth/auth.tsx

```typescript
import { FC, useEffect, useState, ReactNode } from "react";
import JSCookie from "js-cookie";
import Mlog from "@utils/mlog";
import {
  formatQuery,
  Token,
  jumpLogin,
  isNeedAuth,
  UserInfo,
} from "@utils/utils";
import { fetchOauthCode } from "@services/user";
import { openOSS, AuthPages } from "@config/auth";
import { AuthContext, initAuth, IAuth } from "./auth-context";

const getToken = async (code: string) => {
  if (Token.get()) return Token.get();
  // 这个请求会让后端把token放到cookie上
  const resp = await fetchOauthCode(code, window.location.href);
  const tokenFromCookie = JSCookie.get("token");

  return resp.token || tokenFromCookie;
};

export interface AuthProps {
  children: ReactNode;
}

const { oauthCode, realPath } = formatQuery((window as any).routerBase);

const Auth: FC<AuthProps> = ({ children }) => {
  const [authInfo, setAuthInfo] = useState<IAuth>(initAuth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initToken = async (code: string) => {
      setLoading(true);
      // 如果反复跳转，需要找相关接口确认，是否在response 中返回token
      const token = await getToken(code);
      return token;
    };

    const setUserInfo = async (t) => {
      const userInfo = await UserInfo.get(t);
      setAuthInfo({
        isLoading: false,
        userInfo: {
          token: t,
          avatar: userInfo.avatar,
          email: userInfo.email,
          username: userInfo.username,
          userId: userInfo.ssoUid,
          roleIds: userInfo.roleIds,
          ssoUid: userInfo.ssoUid,
          nickname: userInfo.nickname,
          githubAccount: userInfo.githubAccount,
        },
        clearUserInfo: () => {
          setAuthInfo(initAuth);
        },
      });
      Mlog.configUserId(userInfo.ssoUid);
    };

    const init = async () => {
      // code变化并且code存在就走完整流程，code -> token -> userInfo
      if (oauthCode) {
        const token = await initToken(oauthCode);
        Token.storage(token);
        await setUserInfo(token);
        window.history.replaceState(null, null, realPath);
      } else if (Token.get()) {
        await setUserInfo(Token.get());
      } else if (isNeedAuth(AuthPages)) {
        window.location.href = jumpLogin();
      }
      setLoading(false);
    };

    init();
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

const NoAuth: FC<AuthProps> = ({ children }) => {
  return (
    <AuthContext.Provider value={initAuth}>{children}</AuthContext.Provider>
  );
};

export default openOSS ? Auth : NoAuth;
```

## src/utils/utils.ts

```typescript
import { useIntl } from "react-intl";
import qs from "query-string";
import jsCookie from "js-cookie";
import { clientId, logURL, TokenCookieDomain } from "@config/auth";
import { fetchCurrentUser as queryCurrentUser } from "@services/user";

export type Language = "zh-CN" | "en-US";
export const LanguageKey = "locale";

export const loadLang = () => {
  const storeLang = window.localStorage.getItem(LanguageKey);
  if (storeLang) {
    return storeLang === "en-US" ? "en-US" : "zh-CN";
  }
  // default lang: English
  localStorage.setItem(LanguageKey, "en-US");
  return "en-US";
};

let currentLang: Language = loadLang();
const saveLang = (lang: Language) => {
  window.localStorage.setItem(LanguageKey, lang);
  return lang;
};

export const getLang = () => currentLang;
export const setLang = (lang: Language) => {
  currentLang = saveLang(lang);
};

export const Intl = (id: string) => {
  return useIntl().formatMessage({ id });
};

// 用javascript删除某一个cookie的方法，该方法传入要删除cookie的名称
export const removeCookie = (cookieName: string) => {
  const cookies = document.cookie.split(";"); // 将所有cookie键值对通过分号分割为数组
  // 循环遍历所有cookie键值对
  for (let i = 0; i < cookies.length; i++) {
    // 有些cookie键值对前面会莫名其妙产生一个空格，将空格去掉
    const _cookieName = cookies[i].split("=")[0].trim();
    // 比较每个cookie的名称，找到要删除的那个cookie键值对
    if (_cookieName === cookieName) {
      const exp = new Date(); // 获取客户端本地当前系统时间

      // 将exp设置为客户端本地时间1分钟以前，将exp赋值给cookie作为过期时间后，就表示该cookie已经过期了, 那么浏览器就会将其立刻删除掉
      exp.setTime(exp.getTime() - 60);

      // 设置要删除的cookie的过期时间，即在该cookie的键值对后面再添加一个expires键值对
      // 并将上面的exp赋给expires作为值(注意expires的值必须为UTC或者GMT时间，不能用本地时间）
      // 那么浏览器就会将该cookie立刻删除掉
      document.cookie = `${
        cookies[i]
      };expires=${exp.toUTCString()};path=/;domain=${TokenCookieDomain}`;

      // 注意document.cookie的用法很巧妙，在对其进行赋值的时候是设置单个cookie的信息，但是获取document.cookie的值的时候是返回所有cookie的信息
      break; // 要删除的cookie已经在客户端被删除掉，跳出循环
    }
  }
};

export const formatQuery = (basename = "") => {
  const { search, pathname } = window.location;
  const url: string = pathname + search;
  let oauthCode;
  let realPath = "";
  const query = qs.parse(search) || {};
  const code = query.code || "";
  const lang = query.lang || "";
  if (url.startsWith(basename)) {
    // 判断 pathname 是否是以 basename 开头
    realPath = url.slice(basename?.length);
    realPath = realPath.startsWith("/") ? realPath : `/${realPath}`;
  }
  // 从 uaa 鉴权成功后，会把 code 拼在 url 最后
  // 兼容 子平台中用 code 作为业务参数
  if (Array.isArray(code)) {
    oauthCode = code[code.length - 1] || "";
  } else {
    oauthCode = code;
  }
  // 除了 code 外 url 还有其他的 query ，或者 有多个 code 的情况下
  // 鉴权 code 一定在 url 最后
  if (Object.keys(query).length > 1 || Array.isArray(code)) {
    realPath = realPath.replace(`&code=${oauthCode}`, "");
  } else {
    // url 只有 code 一个 query
    realPath = realPath.replace(`?code=${oauthCode}`, "");
  }

  realPath = realPath.replace(`?lang=${lang}&`, "?");
  realPath = realPath.replace(`?lang=${lang}`, "");
  realPath = realPath.replace(`&lang=${lang}`, "");

  return {
    realPath,
    oauthCode,
    lang,
  };
};

export const Token = {
  tokenKey: "x_token",
  cookieTokenKey: "uaa-token",
  getFromCookie() {
    return jsCookie.get(this.cookieTokenKey);
  },

  storage(token: string | null | undefined) {
    if (token === undefined || token === null) {
      // localStorage.removeItem(this.tokenKey);
      console.log(`[Token]: ${token} is invalidate`);
      return false;
    }
    localStorage.setItem(this.tokenKey, token);
    return true;
  },

  update(token: string | null) {
    const oldToken = localStorage.getItem(this.tokenKey);
    if (oldToken !== token) {
      this.storage(token);
    }
  },

  get() {
    const currentToken = this.getFromCookie() as string | null;

    this.update(currentToken);
    return currentToken || localStorage.getItem(this.tokenKey);
  },

  has() {
    return !!this.get();
  },

  removeAll() {
    removeCookie(this.cookieTokenKey);
    removeCookie("ssouid");
    localStorage.removeItem(this.tokenKey);
  },
};

export const UserInfo = {
  key: "_$_userinfo_key_$_",

  async get(token: string) {
    const userInfo = localStorage.getItem(this.key);
    if (userInfo) return JSON.parse(userInfo);

    if (token && !userInfo) {
      const resp = await queryCurrentUser(token);
      localStorage.setItem(this.key, JSON.stringify(resp));
      return resp;
    }

    return null;
  },

  del() {
    localStorage.removeItem(this.key);
  },
};

// Function which concat all functions together
export const callFnsInSequence =
  (...fns: any[]) =>
  (...args: any) =>
    fns.forEach((fn) => fn && fn(...args));

export const jumpLogin = () => {
  let { href } = window.location;
  const url = new URL(href);

  if (url.searchParams.has("code")) {
    url.searchParams.delete("code");

    if (url.searchParams.has("lang")) url.searchParams.delete("lang");

    href = url.toString();
  }

  return `${logURL}/authentication?redirect=${href}&clientId=${clientId}&lang=${getLang()}`;
};

export const isNeedAuth = (authPages): boolean => {
  const pathname = window.location.pathname.endsWith("/")
    ? window.location.pathname.slice(0, -1)
    : window.location.pathname;
  const matchPage = authPages.find((page) => new RegExp(page).test(pathname));
  return !!matchPage;
};
```

## src/interceptors/request.ts

```typescript
import { NoTokenApiPaths, openOSS } from "@config/auth";
import { getLang, Token } from "@utils/utils";
import { AxiosRequestHeaders } from "axios";

// *Interceptor函数：主要用来在请求发出前处理config，config由axios的请求拦截器提供
// *Interceptor函数运行规则：函数会依次从左到右执行，每个*Interceptor函数必须返回config，供下一个*Interceptor函数处理
// 好处：代码结构更清晰，每个函数专注做自己的事情，拿到config处理后return，达到逻辑解耦的目的

interface IAuth extends AxiosRequestHeaders {
  Authorization?: string;
}

const validateAuthInterceptor = (config) => {
  const token = Token.get();
  const headers: IAuth = {
    lang: getLang(),
    ...config.headers,
  };

  if (
    !NoTokenApiPaths.find((p) => (config.url || "").endsWith(p)) &&
    openOSS &&
    !!token
  ) {
    headers.Authorization = `Bearer ${token}`;
  }

  return {
    ...config,
    headers,
  };
};

const customConfigInterceptor = (config) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      "Client-Type": "app",
      type: 0,
    },
  };
};

export const requestInterceptors = [
  validateAuthInterceptor,
  customConfigInterceptor,
];
```

## src/interceptors/response.ts

```typescript
import { message } from "sea-lion-ui";
import { Token, jumpLogin, getLang } from "@utils/utils";
import { AxiosError } from "axios";
import { detector } from "@easycode/client-detector";
import { Meta } from "@utils/ajax";
import { openOSS } from "@config/auth";

export const handleUnauth = () => {
  if (!openOSS) return;
  // 处理一些用户权限验证
  Token.removeAll();
  window.location.href = jumpLogin();
};

const formatResponseData = (response) => {
  const resp = response.data;
  const meta = response.__meta;
  const { isAllResponseBody } = meta; // isAllResponseBody是否需要返回完整数组结构
  if (isAllResponseBody) {
    return resp;
  }
  return resp.data;
};

const handleErrorAlert = (response) => {
  const resp = response.data;
  const meta = response.__meta;
  const notIgnoreError = !meta.isIgnoreError;
  if (resp.success === false && notIgnoreError) {
    message.error(resp.msg);
  }
  return response;
};

const validateAuth = (response) => {
  const resp = response.data;
  // 应用拦截到鉴权错误
  if (resp && resp.msgCode === "A0202") {
    handleUnauth();
  }
  return response;
};

const validateInvitation = (response) => {
  const resp = response.data;
  // 应用拦截到鉴权错误
  if (resp && resp.msgCode === "C1600") {
    window.location.href = jumpLogin();
  }
  return response;
};

const showErrorMessage = (text, ignore = false) => {
  if (!ignore) {
    message.error(text);
  }
};

const sendErrorLog = (response) => {
  try {
    const resp = response.data;
    if (resp && resp.msgCode !== "10000") {
      const err = new Error(JSON.stringify(resp));
      detector.sendError2(err, response.request.responseURL);
    }
  } catch (error) {
    detector.sendError2(error, response.request.responseURL);
  }
  return response;
};

const handleErrorData = (error) => {
  // 如果没有用户则不显示弹窗
  if (error.response) {
    const meta = error.__meta;
    const ignore = meta.isIgnoreGatewayError;

    const code = error.response.status;
    console.log(error.code, "error.....");
    try {
      const err = new Error(JSON.stringify(error.response.data));
      detector.sendError2(err, error.request.responseURL);
    } catch (err) {
      detector.sendError2(err, error.request.responseURL);
    }
    switch (code) {
      case 401:
      case 403:
        handleUnauth();
        break;
      case 500:
        showErrorMessage(
          getLang() === "zh-CN"
            ? "服务器没有响应，请稍后再试"
            : "Sever error, please try again later.",
          ignore
        );
        break;
      default:
        if (error.code === "ERR_NETWORK") {
          showErrorMessage(
            getLang() === "zh-CN"
              ? "网络出错了，请稍后再试"
              : "Network error, please try again later.",
            ignore
          );
        } else {
          showErrorMessage(
            `${code}: ${error.message || "unknown error"}`,
            ignore
          );
        }
    }
  }
  // 可能是取消接口请求
  return Promise.reject(error);
};

export const responsetInterceptors = [
  sendErrorLog,
  validateAuth,
  validateInvitation,
  handleErrorAlert,
  formatResponseData,
];

type ResponsetErrorInterceptorsError = (AxiosError & { __meta: Meta }) | Error;

export const responsetErrorInterceptors: [
  ...Array<
    <T extends ResponsetErrorInterceptorsError>(
      error: T
    ) => ResponsetErrorInterceptorsError
  >,
  (error: ResponsetErrorInterceptorsError) => Promise<AxiosError>
] = [handleErrorData];
```

## src/services/user.ts

```typescript
import { request } from "@utils/ajax";

const userServicePrefix = "/gw/user-service";
const uaaServicePrefix = "/gw/uaa-be";

export interface fetchCurrentUserReqDto {
  avatar?: string;
  email?: string;
  expiration?: string;
  roleIds?: string[];
  nickname?: string;
  jwt?: string;
  ssoUid: string;
  username?: string;
  wechat?: string;
  wechatName?: string;
  [key: string]: any;
}

// 获取用户信息
export async function fetchCurrentUser(token: string) {
  return request<fetchCurrentUserReqDto>(
    "/api/v1/login/getUserInfo",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    uaaServicePrefix
  );
}

export async function logout() {
  return request(
    "/api/v1/logout/all",
    {
      method: "POST",
      meta: {
        isAllResponseBody: true,
      },
    },
    uaaServicePrefix
  );
}

export interface fetchOauthCodeReqDto {
  token: string;
}

// sso第三方登录验证后，拿取用户信息
export const fetchOauthCode = (code: string | string[], redirect: string) => {
  return request<fetchOauthCodeReqDto>(
    "/api/v1/account/oauth",
    {
      method: "POST",
      data: {
        code,
        redirect,
      },
    },
    userServicePrefix
  );
};
```

要启用权限功能，只需将上述代码复制回对应位置，并将 `src/config/auth.ts` 中的 `openOSS` 设置为 `true`。
