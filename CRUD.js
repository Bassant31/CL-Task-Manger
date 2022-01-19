const { Console } = require("console")
const fs = require("fs")



function saveNotes(notes){
    const jsonData = JSON.stringify(notes)
    fs.writeFileSync("notes.json",jsonData)
}
const generateId = ()=>{
    let id = Math.floor(Math.random() * (1000000000 - 1000 + 1)) + 1000
    const notes = loadNotes()
    while(true){
        let duplicateId = notes.find((note)=>note.id == id)
        if(duplicateId){
            id = Math.floor(Math.random() * (1000000000 - 1000 + 1)) + 1000

        }
        else{
            break
        }
    }
    return id
}
const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const jsonData = dataBuffer.toString()
        return JSON.parse(jsonData)
    }catch(e){
        return[]
    }
    
}

const addNote = (title,body,checked)=>{
    const notes = loadNotes()
    const id = generateId()
    notes.push({id:id,title:title,body:body,checked:checked})
    saveNotes(notes)
    console.log("New Note Has Been Added...")  
    
}

const editNote = (id,title,body,checked)=>{
    let notes = loadNotes()
    const note = notes.find((note)=>note.id === id)
    if(note){
        removeNote(id)
        if(title){
            note.title =title
        }
        if(body){
            note.body =body
        }
        if(checked === true || checked === false){
            note.checked =checked
        }
        notes = loadNotes()
        notes.push({id:note.id,title:note.title,body:note.body,checked:note.checked})
        saveNotes(notes)
    }
    else{
        console.log("THIS NOTE IS NOT EXIST..")
    }

}

const removeNote = (id)=>{
    const notes = loadNotes()
    const remaningNotes = notes.filter((note)=>note.id !== id)
    if(remaningNotes.length < notes.length){
          saveNotes(remaningNotes)
          return "removed successfully"

    }
    else{
        console.log("no such a note ")
    }
  
}

const listNotes = (type)=>{
    const notes = loadNotes()
    if(type.toLowerCase() ==="all"){
        console.log(notes)
    }
    else if(type.toLowerCase() === "check"){
        const checked = notes.filter((note)=>note.checked === true)
        console.log(checked)

    }
    else if(type.toLowerCase() === "uncheck"){
        const unchecked = notes.filter((note)=>note.checked === false)
        console.log(unchecked)

    }
    else{
        console.log("WRONG TYPE")
    }

}
const checkNote = (id)=>{
    const notes = loadNotes()
    const note = notes.find((note)=>note.id === id)
    if(note){
        if(note.checked === true){
            console.log("alredy checked")
        }
        else{
            editNote(id,null,null,true)
            console.log("checked successfuley")
        }

    }else{
        console.log("THIS NOTE IS NOT EXIST..")

    }
    


}

const uncheckNote = (id)=>{
    const notes = loadNotes()
    const note = notes.find((note)=>note.id === id)
    if(note){
        if(note.checked === false){
            console.log("alredy unchecked")
        }
        else{
            editNote(id,null,null,false)
            console.log("unchecked successfuley")
        }

    }else{
        console.log("THIS NOTE IS NOT EXIST..")

    }

}

module.exports={
    addNote:addNote,
    removeNote:removeNote,
    editNote:editNote,
    listNotes:listNotes,
    checkNote:checkNote,
    uncheckNote:uncheckNote
}