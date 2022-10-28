
$('#ponyoModal').modal({ keyboard: false, backdrop: 'static' })


async function getPonyo() {
  const pass = $('#pass').val();

  if(pass){
    const ponyoData = await axios({
      method: 'post',
      url : url +'/passCheck',
      headers:{},
      data:{pass :pass}
    });

    if(ponyoData.data.isSuccess){
      $('#ponyoModal').modal('hide');
      $('#ponyoTitle').html(ponyoData.data.result[0].title);
      $('#ponyoBefore').html(`<li class="list-group-item" >message : ${ponyoData.data.result[0].coment}</li>
                              <li class="list-group-item">hidden message : ${ponyoData.data.result[0].hidden}</li>`);
    }else{
      alert(ponyoData.data.message)
    }
  }else{
    alert('비밀번호를 입력해 주세요');
  }  
}

  async function update() {
    let coment = $('#coment').val();
    let hidden = $('#hidden').val();
    let title = $('#title').val();

    const dataSet = await axios({
      method: "patch", // http method
      url: url + "/update",
      headers: {}, // packet header
      data: {title:title ,coment : coment , hidden :hidden}, // body
    });
   
    if(dataSet.data.isSuccess){
      alert('변경되었습니다 !!');
    }else{
      alert('변경 실패');
    }
  }