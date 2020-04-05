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
                  <div class="Message" data-message-id=${message.id}>
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
                  <div class="Message" data-message-id=${message.id}>
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

  var reloadMessages = function() {
    var last_message_id = $('.Message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.MessageList').append(insertHTML);
        $('.MessageList').animate({ scrollTop: $('.MessageList')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }

});