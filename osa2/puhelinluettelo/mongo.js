const mongoose = require('mongoose')

const pw = process.argv[2]
const dbName = 'puhelinluettelo'
const url = `mongodb+srv://ana:${ pw }@cluster0.zzw3l.mongodb.net/${ dbName }?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false,
  useCreateIndex: true
})


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length == 3) {
  console.log('phonebook:')

  Person.find({}).then(res => {
    res.forEach(person => {
      console.log(`${ person.name } ${ person.number }`)
    })

    mongoose.connection.close()
  })
} else if (process.argv.length == 5) {
  person.save().then(res => {
    console.log(`added ${ person.name } number ${ person.number } to phonebook`)
    mongoose.connection.close()
  })
}


