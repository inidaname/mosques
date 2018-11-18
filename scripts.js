const xhr = new XMLHttpRequest();
const fd = new FormData();

function upLoad() {
    if ($('#customFile')[0].value) {
        let url = 'https://api.cloudinary.com/v1_1/dysani/upload';
        $('#progressbar').css('width', 0);
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.upload.addEventListener('progress', function(e) {
            let progress = Math.round((e.loaded * 100.0) / e.total);
            $('#progressbar').css('width', progress + '%');
        });
    
        xhr.onreadystatechange = function(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = JSON.parse(xhr.responseText);
                console.log(response);
                let picUrl = response.secure_url;
                let thumbNail = picUrl.split('/');
                thumbNail.splice(-2, 0, 'w_150,c_scale');
                $('#previewImg').attr('src', thumbNail.join('/'));
                $('#previewImg').attr('alt', response.public_id);
            }
        }
    
        fd.append('upload_preset', 'mosques');
        fd.append('file', $('#customFile')[0].files[0])
        xhr.send(fd)
    }
}

