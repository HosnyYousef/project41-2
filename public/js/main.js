const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteDevice)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteDevice(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[5].innerText

    try{
        const response = await fetch('deleteDevice', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'titleS': sName,
              'deviceS': bName
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike() {
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    const genre = this.parentNode.childNodes[5].innerText
    const tLikes = Number(this.parentNode.childNodes[7].innerText)

    try {
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                titleS: sName,
                deviceS: bName,
                genreS: genre,
                likesS: tLikes
            })
        })

        const data = await response.json()
        console.log(data)
        location.reload()
        
    } catch (err) {
        console.log(err)
    }
}

