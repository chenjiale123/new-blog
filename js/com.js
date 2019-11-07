$(function(){

    var mbid = getQueryString("uid");

	$.ajax({
		type: "POST",
        url: "/api/api2/getcomment.php",
        data:{
           uid:mbid
        },
		
		dataType: "json",
		success: function(data){
                 console.log(data)
                 for(let i=0;i<=data.length-1;i++){
                    $('.comm').append(`
                    <li>
                    <img src="./images/icon.png">
                    <h2>${data[i].name}</h2>
                     <p>${data[i].content}</p>
                    </li>
                    
                    `)
                 }
                
				
					}
				 
	});
})
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}