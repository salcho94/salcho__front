const btnProgressElem = document.querySelector('.btn-progress');
const btnInitiateElem = document.querySelector('.btn-initiate');
const progressBarElem = document.querySelector('.progress-bar__bar');


function validateForm(){
  let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  if($('#name').val() == ''){alert('제목을 입력해 주세요');return false }
  else if($('#email').val() == ''){alert('메일을 입력해 주세요');return false }
  else if(regEmail.test($('#email').val()) === false){alert('올바른 메일을 입력해 주세요');return false }
  else if($('#comment').val() == ''){alert('내용을 입력해 주세요');return false }
  else return true;
}

function sendMail(){
    let form = $('#contactform').serialize();
    axios
      .post(`https://script.google.com/macros/s/AKfycbxnUddp2p0467_DwYu65HswMGS2oFC1qsBCPs5Uyg/exec`, form)
      .then(res => {
        if(res.data.result == 'success'){alert('메일전송이 성공하였습니다.')}
        console.log(res)
      })
  }
  
  
  $('#submit').click(function(){
    if(validateForm()){
       sendMail();
       $('.progress-bar').show()
       progressBarElem.classList.add('active');
       setTimeout(function() {
        $('.progress-bar').hide()
        progressBarElem.classList.remove('active');
      }, 2500);
    }
    
  });
  

