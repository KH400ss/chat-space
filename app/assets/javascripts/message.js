$(function(){

  function buildHTML(message){
    if (message.image) {
      var html = `<div class="MessageInfo">
                    <div class="MessageInfo__name">
                      ${message.user_name}
                    </div>
                    <div class="MessageInfo__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="Message">
                    <p class="Message__content">
                      ${message.content}
                    </p>
                    <img class="Message__image" src=${message.image}>
                  </div>`
    } else {
      var html = `<div class="MessageInfo">
                    <div class="MessageInfo__name">
                      ${message.user_name}
                    </div>
                    <div class="MessageInfo__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="Message">
                    <p class="Message__content">
                      ${message.content}
                    </p>
                  </div>`
    }
    return html
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.MessageList').append(html);
        $('.MessageList').animate({ scrollTop: $('.MessageList')[0].scrollHeight});
        $('#new_message')[0].reset();
      })
      .fail(function(){
        alert("メッセージ送信に失敗しました。");
      })
      .always(() => {
        $('.Form__sendBtn').removeAttr("disabled");
      });
  })
});