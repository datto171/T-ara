var url = "http://youtube-video-api-1608.appspot.com/youtube/api";
var youtubeId = '';
var name = '';
var description = '';
var keywords = '';
var categories = '';
var genres = '';
var authorName = '';
var authorEmail = '';
var authorBirthday = '';

var page = 1;
var limit = 5;

function next(){
	if(page == 1){
		$('#btn-previous').show(200);	
	}
	page+=1;
	loadVideo();
}

function previous(){	
	if(page > 1){
		page -= 1;
		if(page == 1){
			$('#btn-previous').hide(200);
		}
		loadVideo();	
	}
}

function deleteVideo(id){
	var conf = confirm('Bạn có chắc muốn xoá video này không?');
	if(conf){
		$.ajax(
		{
		    url: url + '?id='+ id,
		    type: 'DELETE',
		    success: function(data, status) {
				location.reload();
		    	alert('Đã xoá thành công video.');
			},
		    error: function() {
		    	alert('Lỗi không thể lưu dữ liệu!');
			}
		});
	}
}

function showVideo(videoId){
	var myHtml = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>';
	$('#iframe').html(myHtml);
	$('#myModal').show();
}

function editVideo(videoId){
	$.ajax(
	{
	    url: url + '?id=' + videoId,	    
	    type: 'GET',
	    success: function(data, status) { 		    		    	
	    	$('#youtubeId').val(data.videoId);  
	    	$('#name').val(data.name);
			$('#description').val(data.description);
	    	$('#keywords').val(data.keywords);
			$('#categories').val(data.categories);
			$('#authorName').val(data.authorName);
			$('#authorEmail').val(data.authorEmail);
			$('#authorBirthday').val(data.authorBirthday);
						
			$('#mySidenav').width('100%');
		},
	    error: function() { 
	    	alert('Lỗi không thể lưu dữ liệu!'); 	
		}

	});	
}

function loadVideo(){
	$.ajax(
	{
	    url: url + '?page=' + page + '&limit=' + limit,	    
	    type: 'GET',
	    success: function(data, status) { 		    		    	
	    	var appendHTML = '';
	    	for (var i = 0; i < data.length; i++)
			{
				appendHTML += '<div id="youtubeapi";>' + data[i].name + '<p>' + '</p>';
				appendHTML += '<img id="imgapi" onclick="showVideo(\''+ data[i].videoId + '\');" src="https://i.ytimg.com/vi/' + data[i].videoId + '/hqdefault.jpg " />'+ '<br>';
				appendHTML += '<button id="delete" onClick="deleteVideo(\''+data[i].videoId+'\');">Delete</button>' + '<button id ="edit" onClick="editVideo(\''+data[i].videoId+'\');">Edit Video</button>' + '</div>';
				appendHTML += '<p>' + '</p>';
			}
	    	$('#video-container').html(appendHTML);
		},
	    error: function() { 
	    	alert('Lỗi không thể lưu dữ liệu!'); 	
		}
	});
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function getFull() {
    var full_link = $("#fullLink").val();
    if (full_link.trim() == "") {
        alert("Nhập vào một Full Link Video!");
        return;
    }
    var videoId = getParameterByName("v", full_link);
    //alert(videoId);
    var url = "https://www.googleapis.com/youtube/v3/videos?id="+videoId+"&key=AIzaSyDppf9BzCqWQ3EZgTdfIJSedczjeXl9FXs&part=snippet,contentDetails,statistics,status";
  $.ajax(
	{
	    url: url,	    
	    type: 'GET',
	    success: function(data, status) {
        $("#youtubeId").val(data.items[0].id);
	    $("#name").val(data.items[0].snippet.title.slice(0,30));
	    $("#description").val(data.items[0].snippet.description.slice(0,149));
        $("#keywords").val("keywords");
	    $("#authorName").val(data.items[0].snippet.channelTitle);
	    $("#authorEmail").val("abc@xyz.com");
        $("#authorBirthday").val("12/12/2012");
        },
	    error: function() { 
	    	alert('Lỗi không thể sửa dữ liệu!'); 	
		}
	});
}

function closeModal(){
	$('#myModal').hide();
	$('#iframe').html('');
	$('#mySidenav').width(0);
}

function submitData() {		
	var validForm = validateForm();	
	if(validForm){
		var youtubeVideo = {
			'videoId': youtubeId, 
		    'name': name,
		    'description': description,
		    'keywords': keywords,
		    'category': categories,
		    'genre': genres,
		    'authorName': authorName,
		    'authorEmail': authorEmail,
		    'birthday': authorBirthday,
		};

		$.ajax(
		{
		    url: url,
		    data: JSON.stringify(youtubeVideo),
		    type: 'POST',
		    success: function(data, status) { 		    	
		    	alert("Lưu thành công video với tên: " + data.name); 	
		    	resetData();
			},
		    error: function() { 
		    	alert('Lỗi không thể lưu dữ liệu!'); 	
			}
		});		
	}
}

function resetData(){
	$('#youtubeId').val('');
	$('#name').val('');
	$('#description').val('');
	$('#keywords').val('');
	$('#categories').val('music');
	$('input[name="genres"]:checked').each(function(){
		$(this).prop('checked', false); 
	});	
	$('#authorName').val('');	
	$('#authorEmail').val('');	
	$('#authorBirthday').val('');	
}

// Hàm này dùng để validate dữ liệu form trước khi submit.
function validateForm(){
	// Lấy giá trị từ thẻ input.
	youtubeId = $('#youtubeId').val();
	name = $('#name').val();
	description = $('#description').val();
	keywords = $('#keywords').val();
	categories = $('#categories').val();	
	genres = '';
	$('input[name="genres"]:checked').each(function(){
		genres += $(this).val() + ', ';
	});	
	genres = genres.substring(0, genres.length-2);	
	authorName = $('#authorName').val();	
	authorEmail = $('#authorEmail').val();	
	authorBirthday = $('#authorBirthday').val();	

	// Validate youtube id. 
	if(youtubeId == '' || youtubeId.trim().length == 0){
		$('#youtubeId_msg').text('* Vui lòng nhập video Id.');
		$('#youtubeId_msg').attr('style', 'color:red;');
		$('#youtubeId').attr('style', 'border: 1px solid #f00;');
		return false;		
	}else if(youtubeId.length < 6 || youtubeId.length > 20){
		$('#youtubeId_msg').text('* Độ dài của video Id phải lớn hơn 6 và nhỏ hơn 20 ký tự.');
		$('#youtubeId_msg').attr('style', 'color:red;');
		$('#youtubeId').attr('style', 'border: 1px solid #f00;');		
		return false;	
	} else{
		$('#youtubeId_msg').text('');
		$('#youtubeId_msg').attr('style', '');
		$('#youtubeId').attr('style', 'border: 1px solid green;');		
	}

	// Validate video name. 
	if(name	 == '' || name.trim().length == 0){
		$('#name_msg').text('* Vui lòng nhập tên video.');
		$('#name_msg').attr('style', 'color:red;');
		$('#name').attr('style', 'border: 1px solid #f00;');		
		return false;	
	}else if(name.length < 10 || name.length > 30){
		$('#name_msg').text('* Độ dài của tên phải lớn hơn 10 và nhỏ hơn 30 ký tự.');
		$('#name_msg').attr('style', 'color:red;');
		$('#name').attr('style', 'border: 1px solid #f00;');		
		return false;	
	} else{
		$('#name_msg').text('');
		$('#name_msg').attr('style', '');
		$('#name').attr('style', 'border: 1px solid green;');		
	}

	// Validate video description. 
	if(description	 == '' || description.trim().length == 0){
		$('#description_msg').text('* Vui lòng nhập mô tả cho video.');
		$('#description_msg').attr('style', 'color:red;');
		$('#description').attr('style', 'border: 1px solid #f00;');		
		return false;	
	}else if(description.length < 20 || description.length > 150){
		$('#description_msg').text('* Độ dài của mô tả phải lớn hơn 20 và nhỏ hơn 150 ký tự.');
		$('#description_msg').attr('style', 'color:red;');
		$('#description').attr('style', 'border: 1px solid #f00;');		
		return false;	
	} else{
		$('#description_msg').text('');
		$('#description_msg').attr('style', '');
		$('#description').attr('style', 'border: 1px solid green;');		
	}

	// Validate video description. 
	if(keywords	 == '' || keywords.trim().length == 0){
		$('#keywords_msg').text('* Vui lòng nhập từ khoá cho video.');
		$('#keywords_msg').attr('style', 'color:red;');
		$('#keywords').attr('style', 'border: 1px solid #f00;');		
		return false;	
	} else{
		$('#keywords_msg').text('');
		$('#keywords_msg').attr('style', '');
		$('#keywords').attr('style', 'border: 1px solid green;');		
	}

	// Validate author name. 
	if(authorName	 == '' || authorName.trim().length == 0){
		$('#authorName_msg').text('* Vui lòng nhập tên tác giả.');
		$('#authorName_msg').attr('style', 'color:red;');
		$('#authorName').attr('style', 'border: 1px solid #f00;');		
		return false;	
	} else{
		$('#authorName_msg').text('');
		$('#authorName_msg').attr('style', '');
		$('#authorName').attr('style', 'border: 1px solid green;');		
	}

	// Validate author name. 
	if(authorEmail == '' || authorEmail.trim().length == 0){
		$('#authorEmail_msg').text('* Vui lòng nhập email tác giả.');
		$('#authorEmail_msg').attr('style', 'color:red;');
		$('#authorEmail').attr('style', 'border: 1px solid #f00;');		
		return false;	
	}else if(!validateEmail(authorEmail)){
		$('#authorEmail_msg').text('* Vui lòng nhập email theo định dạng: abc@xyz.com.');
		$('#authorEmail_msg').attr('style', 'color:red;');
		$('#authorEmail').attr('style', 'border: 1px solid #f00;');		
		return false;	
	} else{
		$('#authorEmail_msg').text('');
		$('#authorEmail_msg').attr('style', '');
		$('#authorEmail').attr('style', 'border: 1px solid green;');		
	}

	// Validate author birthday. 
	if(authorBirthday == '' || authorBirthday.trim().length == 0){
		$('#authorBirthday_msg').text('* Vui lòng nhập ngày tháng năm sinh tác giả.');
		$('#authorBirthday_msg').attr('style', 'color:red;');
		$('#authorBirthday').attr('style', 'border: 1px solid #f00;');		
		return false;	
	} else if(!validateBirthday(authorBirthday)){
		$('#authorBirthday_msg').text('* Vui lòng nhập ngày tháng năm sinh tác giả theo định dạng dd/mm/yyyy.');
		$('#authorBirthday_msg').attr('style', 'color:red;');
		$('#authorBirthday').attr('style', 'border: 1px solid #f00;');		
		return false;	
	} else{
		$('#authorBirthday_msg').text('');
		$('#authorBirthday_msg').attr('style', '');
		$('#authorBirthday').attr('style', 'border: 1px solid green;');		
	}
	return true;
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateBirthday(birthday) {
    var pattern =/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    return pattern.test(birthday);
}
