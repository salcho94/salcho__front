var ponyoArr = [];
var finshNum = 0;
var startNmCheck = true;
//var ponyoNameArr = [];
$('#racing').hide()
countPonyo();
function changeLabel(mode){
  let nameVal = false;

  $('.ponyo-nm-input').each(function(i,n){
    if(n.value != ''){
      nameVal = true;
    }
  });

  if(nameVal){
    if(!confirm('기존의 값이 존재합니다 !! 값을 변경할경우 초기화 됩니다 진행할까요')){
      return false;
    }
  }

  if(!startNmCheck){
    alert("리셋버튼을 누른후 사용해 주세요");
    return false;
  }
  let nowValue = Number($("#inputPonyoCnt").val());

  if(mode == 'add' && nowValue == 30){
    alert("뽀뇨가 너무 많아졌어요");
    return false;
  }
  if(mode == 'remove' && nowValue == 1){
    alert("하나는 존재해야지 !!!!");
    return false;
  }

  if(mode == 'add'){
    $("#inputPonyoCnt").val(nowValue+1)
    countPonyo();
  }else{
    $("#inputPonyoCnt").val(nowValue-1)
    countPonyo();
  }

}



function countPonyo(){
  ponyoNameArr = [];
  ponyoArr = [];
  finshNum = 0;
  var ponyoCnt = $("#inputPonyoCnt").val();

  var trackLen =  $("#trackLength").val();


  if(trackLen > 100){
    alert("최대 바다의 길이는 100 입니다.");
    return false;
  }else if(trackLen == 0 || trackLen ==""){
    alert("바다의 공백 혹은 0은 실행 할 수 없습니다.");
    return false;
  }



  var trackCon = $("#trackContainer");

  trackCon.empty();
  $("#finshBox").empty();
  $("#ponyoNameContainer").empty();
  for(trackCnt=0; trackCnt < ponyoCnt; trackCnt++){
    var track = $("<div class='track'></div>");
    track.append($("<div id='name"+trackCnt+"' class='ponyo-label'>"+(trackCnt+1)+"번: </div>"));

    for(cellCnt = 0; cellCnt < trackLen; cellCnt++){
      track.append($("<div class='cell'></div>"));
    }

    trackCon.append(track);
    $("#ponyoNameContainer").append($("<div class='input-group'><label class='input-group-addon' style='width: 50%' ><img src='./img/race/running2.png' style='width: 35px; height: 20px;'>   <strong>"+ (trackCnt +1) +"</strong> </label><input  class='ponyo-nm-input form-control w-50' placeholder='이름을 변경하세요' type='text' onkeyup='applyPonyoName();'/></div>"));
    var ponyoObj = {};
    ponyoObj.num = trackCnt+1;
    ponyoObj.name ="";
    ponyoObj.move = 0;
    ponyoObj.track = track;
    ponyoObj.finshNum =0;
    ponyoArr.push(ponyoObj);
  }
}

function applyPonyoName(){
  var ponyoNames = $(".ponyo-nm-input");
  $.each(ponyoArr, function(index, item) {
    item.name = ponyoNames.eq(index).val();

    if(item.name != ""){
      $("#name"+index).html("<strong>"+item.name+"</strong>"+" ");
    }

  });


}


function reset(){
  startNmCheck = true;
  countPonyo();
}

function startRace(){
  $('#reset').hide();

  if(startNmCheck == true){
    $('#racing').show();
    startNmCheck = false;
  }else{
    alert("리셋버튼을 누른후 이용해 주세요");
    $('#reset').show();
    return false;
  }

  var raceSpd =  $("#raceSpeed").val();

  if(raceSpd==""){
    alert("속도에 값을 입력 하여 주십시오");
    return false;
  }



  moveAction();
}


function moveAction(){
  var finsh = true;

  $.each(ponyoArr, function(index, item) {
    var moveVal = Math.round( Math.random()*10 );
    console.log(moveVal);
    if(moveVal > 4){
      item.move++;
      var trackCell = item.track.find(".cell");
      trackCell.eq(0).attr("class","move");
    }

    console.log(item)

    if(item.finshNum==0){
      var trackLen =  $("#trackLength").val();
      if(item.move==trackLen){
        finshNum++;
        item.finshNum = finshNum;
        $("#finshBox").append($("<div>"+finshNum+"등: "+"<strong>"+item.name+"</strong>("+item.num+" 번)</div>"));
        $('#reset').show();
        setTimeout(() =>  $('#racing').hide(), 1000);

      }
      finsh = false;
    }


  });


  if(!finsh){
    setTimeout(function() {
      moveAction();

    }, $("#raceSpeed").val());
  }else{

  }

}