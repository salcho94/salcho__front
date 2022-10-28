window.addEventListener('load', function() {
    let path = window.location.pathname.split("/").pop()
    if (!localStorage.getItem("x-access-token") && path == "boardWrite.html") {
        alert('글등록은 회원만 가능합니다.');
        window.location.href = "../signUp.html"
    }
    let allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function(el) {
        let includePath = el.dataset.includePath;
        if (includePath) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
            header();
        }
    });
});


/*
토큰 검증 API 연동

1. 로컬스토리지에서 x-access-token 확인
2. 토큰 검증 API 요청
3. 유효한 토큰이 아니라면, 로그아웃
4. 유효한 토큰이라면 로그인 상태 확인. 헤더 로그인/회원가입 -> 안녕하세요 (닉네임)님으로 수정


---
로그아웃 버튼 이벤트 연결

*/
function  header(){
    // 1. 로컬스토리지에서 x-access-token 확인
    const jwt = localStorage.getItem("x-access-token");
    setHeader(jwt);
    async function setHeader(jwt) {
        if (!jwt) {
            return false;
        }

        // 2. 토큰 검증 API 요청
        const jwtReturn = await axios({
            method: "get", // http method
            url: url + "/member/jwt",
            headers: { "x-access-token": jwt }, // packet header
            data: {}, // packet body
        });

        const isValidJwt = jwtReturn.data.code == 200;
        let path = window.location.pathname.split("/").pop()
        if (path == "boardWrite.html") {
            const writer =  document.getElementById('writer');
            writer.value = jwtReturn.data.result.userId;
        }
        if(isValidJwt){
            const userIdx =jwtReturn.data.result.userIdx;
            const nickname = jwtReturn.data.result.nickname;
            const login =  document.getElementById('login');
            const logout =  document.getElementById('logOut');
            const myInfo = document.getElementById('myInfo');
            login.classList.add('done');
            logout.className = '';
            myInfo.className = '';
            myInfo.innerHTML = `<a href="javascript:alert('MyPage ready')"><h5>${userIdx}번째 가입자 ${nickname}님</h5></a>`;
        }

        // 3. 유효한 토큰이 아니라면, 로그아웃
        if (!isValidJwt) {
            signOut();
            alert("유효한 토큰이 아닙니다");
            return false;
        }
        return true;

    }

}

function signOut(event) {
    if(confirm('logout 하시겠습니까?😏'))
    localStorage.removeItem("x-access-token"); // 토큰 삭제하고
    location.reload(); // 새로고침
}

async function login(){
    const userId = document.getElementById("loginId").value;
    const password = document.getElementById("password").value;
    // 2. #email, #password 값 확인 (두 값이 모두 입력 되어 있지 않으면 return)
    if (!userId) {
        document.getElementById("loginId").focus();
        return alert("아이디를 입력해주세요.");
    }else if(!password){
        document.getElementById("password").focus();
        return alert("비밀번호를 입력해주세요.");
    }

    // 3. 로그인 API 요청
    const signInReturn = await axios({
        method: "post", // http method
        url: url + "/member/sign-in",
        headers: {}, // packet header
        data: { userId: userId, password: password }, // packet body
    });

    // 4. 요청이 성공적이지 않다면, alert message
    const isValidSignIn = signInReturn.data.code == 200;

    if (!isValidSignIn) {
        return alert(signInReturn.data.message);
    }

    // 5. 요청이 성공하면, jwt를 localstorage에 저장하고 main page 이동
    const jwt = signInReturn.data.result.jwt;
    localStorage.setItem("x-access-token", jwt);

    return location.replace("./index.html");
}
