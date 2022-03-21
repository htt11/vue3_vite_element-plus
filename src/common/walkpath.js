

export default {
    /**
    * 对象重置为空
    * @obj 原对象
    * */
    clearObj(obj) {
        for (let k in obj) {
            obj[k] = ''
        }
    },

    /**
    *
    * 获取最近某个时间段
    * @last 最近天数
    * 返回值为GMT时间
    * */
    getRangeDay(last) {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24 * last);
        return [date, new Date()]
    },
    /*
    * 时间格式化
    * @dateTime GMT时间
    * */
    dateTimeFormat(dateTime) {
        return dateTime.format('Y-m-d H:i:s');
    },
    debounce(fn, wait) {
        let timeout = null;
        return function () {
            if (timeout !== null) clearTimeout(timeout);
            timeout = setTimeout(fn, wait);
        }
    },
    /*
            * 打开新标签展示新路由页
            * @vm vue实例
            * @name 路由name
            * @param 携参
            * */
    turnTo(vm,name,param){
        let resolve = {};
        if(name.indexOf('/')>=0){
            resolve = vm.$router.resolve(name);
        }else{
            resolve = vm.$router.resolve({name})
        }
        if(param){
            resolve.href +='?'+param
        }
        window.open(resolve.href,'_blank')
    },

    /*
    * 在arr中找到相同value的元素，并返回name
    * @arr 数组
    * @key 目标值
    * */

    diff(arr, key) {
        let name = '';

        if (!key) {
            return ''
        }
        try {
            name = arr.find((item) => {
                return item.value == key
            }).name || '';
        } catch (e) {
            // console.log(arr,key)
        }


        return name
    },
    /*
    * 判断类型是否正确
    * @data:Obj/Arr 源数据
    * @type:string 要判断的类型
    * return {Boolean}
    * */
    isType(data, type) {
        return Object.prototype.toString.call(data) === '[object ' + type + ']'
    },
    extendSuper() {
        let arg = arguments
        for (let i = 1; i < arg.length; i++) {
            arg[0] = this.extendEasy(arg[0], arg[i])
        }
        return arg[0]
    },
    /*
    * 拷贝新数组或对象到源数组对象
    *
    * */
    extendEasy(source, obj) {
        for (let key in obj) {
            if (this.isType(obj[key],'Object')) {
                source[key] = {}
                source[key] = this.extendEasy(source[key], obj[key])
            }
            if (this.isType(obj[key],'Array')) {
                source[key] = []
                source[key] = this.extendEasy(source[key], obj[key])
            }
            source[key] = obj[key]
        }
        return source
    },
    normalExtend(data){
        return JSON.parse(JSON.stringify(data))
    },
    /*
    * 获取url中的参数，返回参数集合
    * */
    getUrlQuery(){
        let url = document.location.href;
        let result = {}
        if(url.indexOf('?')>=0){
            let queryStr = url.split('?').pop();
            let frMap = queryStr.split('&');
            frMap.forEach(d=>{
                let [key,value] = d.split('=');
                result[key] = value;
            })
        }else {}

        return result
    },
    /*
    * 按照key属性数组去重
    * */
    removeSame(arr,key){
        let diff = {};
        let result = [];
        arr.forEach(d=>{
            if(diff[d[key]]){
                //has
                diff[d[key]]++;
            }else{
                result.push(d);
                diff[d[key]] = 1;
            }
        })
        return result
    },

    /*
    * ioc类型检查
    *简单校验
    * */
    iocTypeValidate:{
        1:{
            name:'IP',
            foo(str){
                return str.split('.').length === 4
            }
        },
        2:{
            name:'DOMAIN',
            foo(str){
                return str.split('.').length <= 3 && str.split('.').length > 1
            }
        },
        3:{
            name:'URL',
            foo(str){
                return str.indexOf('/')>=0
            }
        },
        4:{
            name:'MD5',
            foo(str){
                return str.indexOf('/')<0 && str.indexOf('.')<0 && str.length === 32
            }
        },
        5:{
            name:'SHA-1',
            foo(str){
                return str.indexOf('/')<0 && str.indexOf('.')<0 && str.length === 40
            }
        },
        // 6:{
        //     name:'EMAIL',
        //     foo(str){
        //         return str.indexOf('@')>=0 && str.indexOf('.')>=0
        //     }
        // },
        7:{
            name:'SHA-256',
            foo(str){
                return str.indexOf('/')<0 && str.indexOf('.')<0 && str.length === 64
            }
        },
    }
}