
let textchange = true;

async function save(){
    const title = document.getElementById('title').value;
    const writer = document.getElementById('writer').value;
    const boardId = document.getElementById('boardId').value;
    const pass = document.getElementById('pass').value;
    const editorData = editor.getData();

    if(!title){
        document.getElementById('title').focus();
        return alert("제목을 입력해 주세요");
    }else if(!writer){
        window.location.reload();
    }else if(!editorData){
        editor.focus();
        return alert("내용을 입력해 주세요");
    }else if(!pass && !textchange){
        return alert("비밀글 등록시 비밀번호를 입력해 주세요")
    }

    if(confirm("작성하시겠습니까??")){
    const boardReturn = await axios({
        method: "post", // http method
        url: url + "/board/insert",
        headers: {}, // packet header
        data: { title: title, writer: writer, content: editorData ,boardId: boardId,pass: pass}, // packet body
    });

    // 4. 요청이 성공적이지 않다면, alert message
    const isValidSignUp = boardReturn.data.code == 200;

    if (!isValidSignUp) {
        return alert(boardReturn.data.message);
    }
    function goPage(){
        let content = editorData.replace(/<[^>]*>?/g, '');
        let send = `cate=board&content=${content}&title=${title}&writer=${writer}`
        let encodeValue = encodeURIComponent(send);
        axios.post(`https://script.google.com/macros/s/AKfycbxnUddp2p0467_DwYu65HswMGS2oFC1qsBCPs5Uyg/exec`,encodeValue);
        alert(boardReturn.data.message);
        window.location.href = "../board.html"
    }
    return goPage();
    }
}


$(document).ready(function(){

    $('#passShow').val('비밀글 🙆🏻‍');
    $('.passModal').toggle('500',function(){

    });
    $('#passShow').click(function(){
        if(textchange){
            textchange = false;
            $('#passShow').val('비밀글 🙅‍');
        }else{
            textchange = true;
            $('#passShow').val('비밀글 🙆🏻‍');
        }
        $('.passModal').toggle('500',function(){

        });
    })
})