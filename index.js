const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const port = process.env.PORT || 2000

app.use(bodyParser.json());
app.use('/api/students',router);

app.listen(port , ()=>{
    console.log('> Server is up and running on port : ' + port);
});
let students = [{
    studentId: 1,
    firstName:"Afaf",
    lastName : 'Afi',
    Gender: 'Female'
},
{
    studentId: 2,
    firstName:"Jeeva",
    lastName : 'MK',
    Gender: 'Female'
}];
    router.get('/', (req, res) => {
        res.json(students);
    }); 

    router.get("/:Id", (req, res) => {
        const id = parseInt(req.params.Id);
        const studentId = students.filter( x => x.studentId == id)[0];
        if (studentId) {
            res.json(studentId);
        }else{
            res.end(`Student with id ${id} not found`);
        }
    });

    router.post("/", (req, res) => {
        const newStudent = req.body;
        newStudent.studentId = students.length + 1;
        students.push(newStudent);
        res.status(201).json(newStudent);

    });

    router.put("/:Id", (req, res) => {
        const id = parseInt(req.params.Id);
        const updatedStudent = req.body; 
        const studentIn = students.findIndex( x => x.studentId === id);
        if (studentIn !== -1){
            students[studentIn] = {...students[studentIn], ...updatedStudent};
            res.json(students[studentIn]);
        } else {
            res.status(404).end(`Student with id ${id} not found`);
        }
    });

    router. delete("/:Id", (req, res) => {
        const id = parseInt(req.params.Id);
        const studentIn = students.findIndex(x => x.studentId === id);
        if(studentIn !== -1){
            students.splice(studentIn, 1);
            res.sendStatus(204);
        }else{
            res.status(404).end(`Student with id  ${id} not found`);
        }
    });

    


