import { fetch, post } from '../assets/js/http'
const actions = {
  //
  // async getRqCode({ commit }, data) {
  //   try {
  //     return await fetch('agentGetSmsCode', data)

  //   } catch (e) {
  //     window.console.error(e);
  //     return {"status":{"code":4002,"message":"操作失败"},"data":null}
  //   }
  // },
  // 
  // async handleRegister({ commit }, data) {
  //   try {
  //     const res = await post('/agentReg', data)
  //     if(res.status.code===0){
  //       commit('USERINFO', res.data)
  //      }
  //     return res

  //   } catch (e) {
  //     window.console.error(e);
  //     return {"status":{"code":4002,"message":"操作失败"},"data":null}
  //   }
  // },

  //
  // async loginRequest({ commit }, data) {
  //   try {
  //     let  res= await fetch('/agentLogin', data)
  //     if(res.status.code===0){
  //       commit('USERINFO', res.data)
  //      }
  //     return res

  //   } catch (e) {
  //     window.console.error(e);
  //     return {"status":{"code":4002,"message":"操作失败"},"data":null}
  //   }

  // },
  // 
  // async  getShopById({ commit }, data) {
  //   try {
  //     let res= await fetch('/agentFindInfo', data)
  //     if(res.status.code===0){
  //       commit('SHOP_INFO', res.data)
  //      }
  //      return res
       
  //   } catch (e) {
  //     return {"status":{"code":4002,"message":"操作失败"},"data":null}
  //   }

  // },
  //
  // async   getMyRecord({ commit }, data) {
  //   try {
  //     return await post('/agentQueryRecord', data)
  //   } catch (e) {
      
  //     return {"status":{"code":4002,"message":"操作失败"},"data":null}
  //   }

  // },
  //
  // async  getCodeRequest({ commit }, data) {
  //   try {
  //     return await post('/userReg', data)
     

  //   } catch (e) {
  //     return {"status":{"code":4002,"message":"操作失败"},"data":null}
  //   }

  // }

}
export default actions


