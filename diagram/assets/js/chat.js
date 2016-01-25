var chatlist = [];
var allChat= function(){io.socket.get('/chat/addconv');

    $.get('/chat',function(data){
        chatlist = data;
        console.log(data);
});};

function newsentmessage(texto){
    sentcont = $("<div></div>").attr("class","sent message-content col s12 m12 l12");
    userdiv = $("<div></div>").attr("class","message-user col s2 m2 l2");
    p =$("<p>Yo</p>").attr("class","grey-text");
    mess_mess = $("<div></div>").attr("class","message-message col s10 m10 l10");
    mess_text = $("<div></div>").attr("class","message-text");
    text = $("<p></p>").attr("class","text");
    text.append(texto);

    userdiv.append(p);
    sentcont.append(userdiv);

    mess_text.append(text);
    mess_mess.append(mess_text);
    sentcont.append(mess_mess);

    $("#chatbox").append(sentcont);
}

allChat();

// function makechanges(data){
//
// }

io.socket.on('/chat',function(obj){
    if(obj.verb === 'created'){
        console.log(obj);
        chatlist.push(obj.data);

        // makechanges(obj.data);
        newsentmessage(obj.data.message);
    }
});





$("#submitmsg").click(function(){
		var clientmsg = $("#usermsg").val();
        console.log(clientmsg);
        newsentmessage($("#usermsg").val());
        // $.post("/chat/addconv",{user: $("#user_name").text(), message: clientmsg, diagram_id: $('#id_diagram').val()},function(data){console.log(data);});
        io.socket.post("/chat/addconv",{user: $("#user_name").text(), message: clientmsg, diagram_id: $('#id_diagram').val()},function(resData,jwres){
            console.log(resData);
            $("#usermsg").val('');
        });



	});
