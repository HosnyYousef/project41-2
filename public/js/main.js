const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteworkout)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteworkout(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    const aSet = this.parentNode.childNodes[5].innerText
    const aRep = this.parentNode.childNodes[7].innerText
    const aDiff = this.parentNode.childNodes[9].innerText
    try{
        const response = await fetch('deleteworkout', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'exerciseS': sName,
              'groupS': bName,
              'setsS': aSet,
              'repsS': aRep,
              'difficultyS': aDiff
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
    const aSet = this.parentNode.childNodes[5].innerText
    const aRep = this.parentNode.childNodes[7].innerText
    const aDiff = this.parentNode.childNodes[9].innerText
    const tLikes = Number(this.parentNode.childNodes[11].innerText)

    try {
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                exerciseS: sName,
                groupS: bName,
                setsS: aSet,
                repsS: aRep,
                difficultyS: aDiff,
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

