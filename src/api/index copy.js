//import axios from './axios';
import axios from './axios_redux';

/*==============登陆页面=========================*/
//登陆接口
export  const reqLogin=(data)=>axios('/userLogin',data,'POST')

//验证码接口
export  const reqVerifyCode=(data)=>axios('/getVerifyCode',data,'POST')


/*==============角色页面=========================*/

//角色列表
export const reqRoleList=(data)=>axios('/role/list',data);

export const reqAddRole=(data)=>axios('/role/add',data,'POST');

export const reqUpdateRole=(data)=>axios('/role/update',data,'POST');

export const reqDelRole=(data)=>axios('/role/delete',data,'POST');

export const reqRoleAll=(data)=>axios('/role/listAll',);


/*==============用户页面=========================*/
export const reqUserList=(data)=>axios('/user/list',data);

export const reqDelUser=(data)=>axios('/user/delete',data,'POST');

export const reqUpdateRwd=(data)=>axios('/user/updatePassword',data,'POST');

export const reqChangeLock=(data)=>axios('/user/changeLock',data,'POST');

export const reqUpdateUser=(data)=>axios('/user/update',data,'POST');

export const reqAddUser=(data)=>axios('/user/add',data,'POST');

export const reqCheckName=(data)=>axios('/user/checkUsername',data);

//角色下拉列表
export const reqRole=(data)=>axios('/role/listAll');

//资源树
export const reqOrgan=(data)=>axios('/organ/jsTree');





/*==============资源页面=========================*/
//获得菜单接口
export const reqMenuList=(data)=>axios('/resource/menusList',data,'POST');

export const reqResourceList=(data)=>axios('/resource/list',data);

export const reqResourceTreeList=(data)=>axios('/resource/jsTree',{},'POST');

export const reqDelResource=(data)=>axios('/resource/delete',data,'POST');

export const reqAddResource=(data)=>axios('/resource/add',data,'POST');

export const reqUpdateResource=(data)=>axios('/resource/update',data,'POST');

/*==============机构页面=========================*/

export const reqOrganList=(data)=>axios('/organ/list',data);

export const reqAddOrgan=(data)=>axios('/organ/add',data,'POST');

export const reqDelOrgan=(data)=>axios('/organ/delete',data,'POST');

export const reqUpdateOrgan=(data)=>axios('/organ/update',data,'POST');

export const reqOrganTreeList=(data)=>axios('/organ/jsTree');




//统计接口
export const reqStatistic=()=>axios('/statistic/base_count.do','GET');

//请求分类
export const reqCategory=(categoryId=0)=>axios('/category/get_category.do','GET',{categoryId:categoryId})

//添加分类
export const addCategory=data=>axios('/category/add_category.do','GET',data);

//修改分类名称
export const updateCategoryName=data=>axios('/category/set_category_name.do','GET',data)


//获得商品列表
export const reqProductList=pageNum=>axios('/product/list.do','GET',{pageNum});

//更改上下架状态
export const updateStatus=data=>axios('/product/set_sale_status.do','GET',data);

//天气
export const reqWeather=(location)=>axios('/?s=App.Common_Weather.LiveWeather','POST',location)

