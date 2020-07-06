$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="chat-data" data-message-id="${message.id}">
                    <div class="chat-data__user-data">
                      <div class="chat-data__user-data--name">
                        ${message.user_name}
                      </div>
                      <div class="chat-data__user-data--day">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="chat-data__message">
                      <p class="chat-data__message--content">
                        ${message.content}
                      </p>
                    </div>
                    <img src= ${message.image} >
                  </div>`
        return html;
    } else {
      var html = `<div class="chat-data" data-message-id="${message.id}">
                    <div class="chat-data__user-data">
                      <div class="chat-data__user-data--name">
                        ${message.user_name}
                      </div>
                      <div class="chat-data__user-data--day">
                        ${message.created_at}
                      </div>
                    </div>
                      <div class="chat-data__message">
                        <p class="chat-data__message--content">
                          ${message.content}
                        </p>
                      </div>
                  </div>`
        return html;
    }
  }
  $('#new_message').on('submit', function(e){
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
      $(".messages").append(html);
      $('.main-chat__chat-list').animate({ scrollTop: $('.main-chat__chat-list')[0].scrollHeight}, 'fast');
      $("form")[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.form__submit').prop('disabled', false);
    })
  })
  var reloadMessages = function() {
    var last_message_id = $('.messages:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !==0){
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.main-chat__chat-list').animate({ scrollTop: $('.main-chat__chat-list')[0].scrollHeight}, 'fast');
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
})