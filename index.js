function clock(n) {
  var clock;
  if(n < 10) {
    clock = '0' + n;
  } else {
    clock = n;
  } return clock;
}

$('#start').on('click', function(){
  // inputから取得
  var min = parseInt($('#set-min').val());
  var sec = parseInt($('#set-sec').val());
  var time = min * 60 + sec; // secに変換
  var mtime = (min * 60 + sec) * 1000; // msecに変換
  var style = 'r ' + time + 's linear infinite'; // ロゴを回すCSS
  $('#home').removeClass('active');
  $('#timer').addClass('active');
  $('.timer-logo').css('animation', style); // styleを適用
  // 二桁の形式
  var time_sec = clock($('#set-sec').val());
  $('#r-min').text(min);
  $('#r-sec').text(time_sec);
  // 終了時
  setTimeout(function(){
    $('.timer-logo').css('animation', '');
    $('#message, #close').addClass('eat');
    $('#remaining, #wait').addClass('cant-eat');
  }, time * 1000);
  // timer
  const pushtime = Date.now();
  const endtime = pushtime - mtime; // 終了時の時間
  const timer = setInterval(function(){
    time--;
    var r_min = Math.floor(time / 60); // 分
    var r_sec = time - r_min * 60; // 秒
    $('#r-min').text(r_min);
    $('#r-sec').text(clock(r_sec));
    mtime = mtime - 1000;
    var diff = endtime - mtime;
    // 終了したらタイマー解除
    if (mtime == 0) {
      clearInterval(timer)
    }
  }, 1000)
});

$('#wait').on('click', function(){
  $('.timer-logo').css('animation', '');
  $('#message, #close').addClass('eat');
  $('#remaining, #wait').addClass('cant-eat');
});

$('#close').on('click', function(){
  $('#message, #close').removeClass('eat');
  $('#remaining, #wait').removeClass('cant-eat');
  $('#timer').removeClass('active');
  $('#home').addClass('active')
});
