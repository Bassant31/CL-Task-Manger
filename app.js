const { boolean } = require("yargs")
const yargs = require("yargs")
const {addNote,removeNote,editNote,listNotes,checkNote,uncheckNote}=require("./CRUD.js")

// initialize add command
yargs.command({
    command:"add",
    describe:"add note...",
    builder:{
        title:{
            describe:"note title...",
            demandOption:true,
            type:'string'

        },
        body:{
            describe:"note body...",
            demandOption:true,
            type:'string'

        },
        checked:{
            describe:"checked or not checked",
            demandOption:false,
            type:'boolean'
        }
    },
    handler:(argv)=>{
        addNote(argv.title,argv.body,argv.checked)
    }
})

// initialize edit command
yargs.command({
    command:"edit",
    describe:"edit note...",
    builder:{
        id:{
            describe:"note id...",
            demandOption:true,
            type:'number'

        },
        title:{
            describe:"note title...",
            demandOption:false,
            type:'string'

        },
        body:{
            describe:"note body...",
            demandOption:false,
            type:'string'

        },
        checked:{
            describe:"checked or not checked",
            demandOption:false,
            type:'boolean'
        }
    },
    handler:(argv)=>{
        editNote(argv.id,argv.title,argv.body,argv.checked)
    }
})

// initialize remove command
yargs.command({
    command:"remove",
    describe:"remove note...",
    builder:{
        id:{
            describe:"note id...",
            demandOption:true,
            type:'number'

        }
    },
    handler:(argv)=>{
        console.log(removeNote(argv.id))
    }
})

// initialize list command
yargs.command({
    command:"list",
    describe:"lis notes...",
    builder:{
        type:{
            describe:"note type...",
            demandOption:true,
            type:'string'

        }
    },
    handler:(argv)=>{
        listNotes(argv.type)
    }
})

// initialize check command
yargs.command({
    command:"check",
    describe:"check note...",
    builder:{
         id:{
            describe:"note id...",
            demandOption:true,
            type:'number'

        }
    },
    handler:(argv)=>{
        checkNote(argv.id)
    }
})

// initialize uncheck command
yargs.command({
    command:"uncheck",
    describe:"uncheck note...",
    builder:{
         id:{
            describe:"note id...",
            demandOption:true,
            type:'number'

        }
    },
    handler:(argv)=>{
        uncheckNote(argv.id)
    }
})

// to parsing arguments with all configration
// ya3ny ba2ol khod balk el yargs command eki ana ma3rfhm 2sta5dmhm
yargs.parse()