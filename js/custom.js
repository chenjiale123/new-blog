$(document).ready(function(){

	////////////////	
	//VARIABLES
	////////////////
	var view = $(window),
		html = $('html'),
		body = $('body');

		$("#qqIconn").click(function(){
			window.location.href="tencent://message/?uin=1756692091&Menu=yes& Service=300&sigT=42a1e5347953b64c5ff3980f8a6e644d4b31456cb0b6ac6b27663a3c4dd0f4aa14a543b1716f9d45"
		})
		$("#wechatIcon").click(function(){
			window.location.href="tencent://message/?uin=1756692091&Menu=yes& Service=300&sigT=42a1e5347953b64c5ff3980f8a6e644d4b31456cb0b6ac6b27663a3c4dd0f4aa14a543b1716f9d45"
		})
		$("#githubIcon").click(function(){
			window.location.href="https://github.com/chenjiale123"
		})
	
		
		
	////////////////
	//SKILLS ANIMATION
	////////////////
	$('ul#skills').addClass("ready");
	$('ul#skills li').each(function(){
		var i = $(this).index();
		$(this).delay(100 * i).animate({right:"0%"},1000,function(){
			$(this).children('span').fadeIn(600);
		});	
	});
		
	////////////////
	//PRETTYPHOTO
	////////////////
	$('a[data-rel]').each(function() {
    	$(this).attr('rel', $(this).data('rel'));
	});
	$("a[rel^='prettyPhoto']").prettyPhoto({
		overlay_gallery: false,
		social_tools: '',
		deeplinking: false,
		default_width: 500,
		opacity:"1"
	});
	
	////////////////
	//FORM STUFF...
	////////////////
	$("#contactform ").click(function() {  
	  
	    $("#contactform .input, #contactform textarea").removeClass('error');
	    		
		var name = $("#contactform input#name");
		if (name.val() == "") {
			name.addClass('error').focus();
			return false;
		}
		var email = $("#contactform input#email");
		if (email.val() == "") {
	      	email.addClass('error').focus();
	     	return false;
		}		
		var message = $("#contactform textarea#message");
		if (message.val() == "") {
	      	message.addClass('error').focus();
	     	return false;
		}
	});
	
	////////////////
	//SUCCESSFUL MESSAGE ALERT
	////////////////
	if(window.location.hash == "#contact") {
  		$('#contactform').slideUp(800,function(){
  			$('#messageSent').fadeIn(800);
  		});	
  	}
	
	////////////////
	//CLONE NAME AND SOCIAL BUTTONS
	////////////////
	$('#titleName, #socialIcons').clone().appendTo('#sticker');
	
	////////////////
	//RESPONSIVE CHECK
	///////////////
	function responsive(){
		if(view.width() < 820){
			body.addClass('respond');
		} else {
			body.removeClass('respond');
		}
	}
	responsive();
	
	////////////////
	//WINDOW SCROLL
	////////////////
	view.scroll(function(){
		//SHOW/HIDE TOP PANEL
		if(view.scrollTop() > 140){
			$('#sticker').stop().animate({top:"0"},500);
		} else {
			$('#sticker').stop().animate({top:"-60px"},500);
		}
		
		//PARALLAX BACKGROUND STUFF
		var scrollPosition = $(window).scrollTop() * .25;
		body.css({backgroundPosition:'0px -'+scrollPosition+'px'});
	});
		
	////////////////
	//WINDOW RESIZE
	///////////////
	view.resize(function(){ responsive(); });
	
	////////////////	
	//WINDOW LOAD
	////////////////
	view.load(function(){ responsive(); });
	
	   
	// $.get('/api/api2/gotcomm.php',function(data){
    //               console.log(data)
	// })


$("#submit_btn").click(function(){
	
	$.ajax({
		type:"POST",
		url:'/api/api2/messageAdd.php',
		data:{
			name:$("#name").val(),
			phone:$("#phone").val(),
			email:$("#email").val(),
			text:$("#message").val(),
		},
		dataType: "json",
		success: function(data){
			console.log(data)
			alert(data.message)
			window.location.reload()
		}
	})
})





	$.ajax({
		type: "GET",
		url: "/api/api2/gotcomm.php",
		// data: "",
		dataType: "json",
		success: function(data){
		         console.log(data)
					for(let i=0;i<=data.length-1;i++){
						$("#recommends").append(`<li>
						<div class="details">
							<h3>${data[i].name}</h3>
							<h4>Professional Position</h4>
						</div>
						<p>${data[i].text}</p>
					</li>`)
					}
				 }
	});


	$.ajax({
		type: "GET",
		url: "/api/api2/getnews.php",
		// data: "",
		dataType: "json",
		success: function(data){
		         console.log(data)
					for(let i=0;i<=data.length-1;i++){
						$(".blogList").append(`<li>
						<p>博客</p>
						<h3>${data[i].title}</h3>
						 <p>${data[i].content}</p>
		
						 <button>阅读全文</button>
						 <div class="xiu">
							   <ul>
								   <li>
									   <img src="./images/1.png" alt="">
									   <span>${data[i].com}</span>
								   </li>
								   <li>
										<img src="./images/2.png" alt="" class="etc" >
										<span>${data[i].zan}</span>
									</li>
									<li>
											<img src="./images/3.png" alt="">
											<span>收藏</span>
										</li>
							   </ul>
		
						 </div>
					</li>`)

				
					}

					$('.blogList').on('click','li>.xiu>ul>li:nth-child(1)',function () {
						console.log('666')
						var index1=data[$(this).parent().parent().parent().index()].id
						console.log(index1)
						window.location.href="./comment.html?uid="+index1
					
					})
				

				 }
	});



	$('.blogList').on('click','li>.xiu>ul>li:nth-child(2)',function () {
		console.log('666')
		var index1=$(this).parent().parent().parent().index()+2
		console.log()
		$.ajax({
			type: "POST",
			url: "/api/api2/addzan.php",
			data: {
				id:index1
			},
			dataType: "json",
			success: function(data){
					 console.log(data)
					 alert(data.message)
					
						}
					 
		});
    })



	


     




});

