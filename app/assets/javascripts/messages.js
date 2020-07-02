$(function(){

  function buildHTML(message){
    if (message.image) {
      var html = `<div class="chat-data">
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
      var html = `<div class="chat-data">
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
      $('.main-chat__chat-list').animate({ scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $("form")[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.form__submit').prop('disabled', false);
    })
  })
})