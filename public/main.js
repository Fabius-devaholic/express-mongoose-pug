$(function() {
  console.log('main.js')
  // create new book
  $('.book-new').submit(e => {
    e.preventDefault()
    let thumbnail = $(e.target).find('input[name="thumbnail"]')
    let title = $(e.target).find('input[name="title"]')
    let author = $(e.target).find('input[name="author"]')
    let file = $(e.target).find('input[name="file"]')
    let formData = new FormData()

      // Add the uploaded image content to the form data collection
    if (thumbnail.length > 0) {
      formData.append('thumbnail', thumbnail.get(0).files[0])
    } else {
      formData.append('thumbnail', null)
    }
    formData.append('title', title.val())
    formData.append('author', author.val())
    formData.append('file', file.get(0).files[0])

    $.ajax({
      url: '/book/new',
      method: 'POST',
      crossDomain: true,
      async: true,
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'json'
    }).done((data, textStatus, xhr) => {
      window.location.href = '/books'
    }).fail(err => {
      console.log('fail', err)
    })
  })
})
