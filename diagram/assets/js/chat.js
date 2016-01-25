$("#submitmsg").click(function(){
		var clientmsg = $("#usermsg").val();
        console.log(clientmsg);
        newsentmessage($("#usermsg").val());
		$("#usermsg").val('');

	});


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
