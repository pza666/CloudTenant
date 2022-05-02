<template>
    <div class="login-container">
        <div class="login-box">
            <h1>登录</h1>
            <div class="item">
                <input type="text" v-model="phone" required>
                <label for="">用户名</label>
            </div>
            <div class="item">
                <input type="password" v-model="password" required>
                <label for="">密码</label>
            </div>
            <button class="btn" @click="submitForm(111)">登录
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Login',
        data() {
            return {
                phone: '',
                password: ''
            }
        },
        methods: {
            // 点击登录回调
            async submitForm() {
                let uReg = /[a-zA-Z0-9]{6,10}/
                let pReg = /[0-9]{6,10}/
                let { phone, password } = this
                if (!uReg.test(phone) || !pReg.test(password)) {
                    return this.$message({ type: 'error', message: '请输入正确的用户名或密码' });
                }
                // 登录发请求的操作都在Vuex里面进行操作
                this.$store.dispatch('login/submitForm', { phone, password })
                // 发请求并且跳转到首页
                this.$router.replace('/home')
            }
        },
    }
</script>
<style lang="less" scoped>
    /* 登录整屏的定位、宽高、背景渐变色 */
    .login-container {
        position: relative;
        width: 100vw;
        height: 100vh;
        background-image: linear-gradient(to right, #2295ff, #22daff);
    }

    /* 登录信息区域 */
    .login-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 390px;
        height: 390px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 10px;
        padding: 40px;
        box-sizing: border-box;
    }

    /* 文本和按钮填充为白色、去除边框、轮廓线 */
    input,
    button {
        background: transparent;
        border: 0;
        outline: none;
    }

    /* 登录标题的居中、颜色、字体加粗、底部外边距 */
    h1 {
        text-align: center;
        color: #fdbd09;
        margin-bottom: 30px;
    }

    /* 输入框样式 */
    .item {
        height: 60px;
        border-bottom: 2px solid #fdbd09;
        margin-bottom: 25px;
        position: relative;
    }

    /* 将文字都加粗 */
    h1,
    input+label,
    .item>input,
    .btn {
        font-weight: 700;
    }

    /* 输入框内容样式 */
    .item input {
        width: 100%;
        height: 100%;
        font-size: 18px;
        color: #fdbd09;
        padding-top: 20px;
        box-sizing: border-box;
    }

    /* 字体向上浮动时的字体样式 */
    .item input:focus+label,
    .item input:valid+label {
        top: 0px;
        font-size: 15px;
        color: #fdbd09;
    }

    /* 字体浮动时的过度效果 */
    .item label {
        position: absolute;
        left: 0;
        top: 12px;
        transition: all 0.5s linear;
    }

    /* 登录按钮的样式 */
    .btn {
        padding: 10px 20px;
        margin-top: 26px;
        color: #fdbd09;
        position: relative;
        overflow: hidden;
        text-transform: uppercase;
        letter-spacing: 2px;
        left: 35%;
    }

    /* 悬停在登录按钮时的样式 */
    .btn:hover {
        border-radius: 5px;
        color: #eee;
        background: #fdbd09;
        box-shadow: 0 0 5px 0 #fdbd09,
            0 0 25px 0 #fdbd09,
            0 0 50px 0 #fdbd09,
            0 0 100px 0 #fdbd09;
        transition: all 1s linear;
    }

    /* 登录按钮旁几条浮动线的定位 */
    .btn>span {
        position: absolute;
    }

    /* 下面四个帧动画是对登录按钮几条线的样式做动画 */
    .btn>span:nth-child(1) {
        width: 100%;
        height: 2px;
        background: -webkit-linear-gradient(left, transparent, #fdbd09);
        left: -100%;
        top: 0px;
        animation: line1 1s linear infinite;
    }

    @keyframes line1 {

        50%,
        100% {
            left: 100%;
        }
    }

    .btn>span:nth-child(2) {
        width: 2px;
        height: 100%;
        background: -webkit-linear-gradient(top, transparent, #fdbd09);
        right: 0px;
        top: -100%;
        animation: line2 1s 0.25s linear infinite;
    }

    @keyframes line2 {

        50%,
        100% {
            top: 100%;
        }
    }

    .btn>span:nth-child(3) {
        width: 100%;
        height: 2px;
        background: -webkit-linear-gradient(left, #fdbd09, transparent);
        left: 100%;
        bottom: 0px;
        animation: line3 1s 0.75s linear infinite;
    }

    @keyframes line3 {

        50%,
        100% {
            left: -100%;
        }
    }

    .btn>span:nth-child(4) {
        width: 2px;
        height: 100%;
        background: -webkit-linear-gradient(top, transparent, #fdbd09);
        left: 0px;
        top: 100%;
        animation: line4 1s 1s linear infinite;
    }

    @keyframes line4 {

        50%,
        100% {
            top: -100%;
        }
    }
</style>