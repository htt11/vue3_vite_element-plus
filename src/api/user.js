import http from '/src/common/http'

export default {
  login(params) {
    return http.statusPost("ws/user/login", params);
  },
  logout() {
    http.get("ws/user/logout").then(res => {
      if (res.status == 200 && res.loginPage) {
        window.location.href = res.loginPage
      } else {
        window.location.href = '#/'
      }
    });
  },
  changePassword(params) {
    return http.statusPost("ws/user/changePassword", params);
  },
  userInfo() {
    return http.get("ws/user/checkUserLogin");
  }
}