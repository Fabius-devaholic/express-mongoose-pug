$(function() {
  console.log('main.js');
  // create new book
  $('.book-new').submit((e) => {
    // e.preventDefault()
    // let thumbnail = $(e.target).find('input[name="thumbnail"]')
    // let title = $(e.target).find('input[name="title"]')
    // let author = $(e.target).find('input[name="author"]')
    // let file = $(e.target).find('input[name="file"]')
    // let formData = new FormData()
    //
    //   // Add the uploaded image content to the form data collection
    // if (thumbnail.length > 0) {
    //   console.log(thumbnail[0].files)
    //   formData.append('thumbnail', thumbnail[0].files, thumbnail[0].files.name)
    // } else {
    //   formData.append('thumbnail', null)
    // }
    // formData.append('title', title.val())
    // formData.append('author', author.val())
    // formData.append('file', file[0])
    //
    // $.ajax({
    //   url: '/book/new',
    //   method: 'POST',
    //   crossDomain: true,
    //   async: true,
    //   data: formData,
    //   cache: false,
    //   contentType: false,
    //   processData: false,
    //   dataType: 'json'
    // }).done((data, textStatus, xhr) => {
    //   console.log('response data', data)
    // }).fail(err => {
    //   console.log('err', err)
    // })
  })
})
