import { Hono } from "hono";
import { cors } from "hono/cors";
import { isNameValid } from "./lib/validators";
import { Result, Student } from "./types";

const app = new Hono();

app.use("/*", cors());


export let students = [
  { id: "1", name: "Ola Normann" },
  { id: "2", name: "Kari Normann" },
];



/*
  ** HENTE ALLE STUDENTER **
  ** Forespørsel / kall fra frontend kan se f.eks slik ut: **
  fetch('https://server-url/api/students', {method: 'GET'})

  Også svarer server med dette under
*/
app.get('/api/students', (c) => {
  return c.json(students);
})


/*
  ** HENTE SPESIFIKK STUDENT **
  ** Forespørsel / kall fra frontend kan se f.eks slik ut: **
  fetch('https://server-url/api/students/${id}', {method: 'GET'})

  Også svarer server med dette under
*/
app.get('/api/students/:id', (c) => {
  const id = c.req.param('id');
  const student = students.filter(student => student.id === id);
  return c.json(student);

  // Her er det nok viktig å validere f.eks at student med id faktisk finnes.
  // hvis ikke, sende tilbake 404 Not Found - for eksempel
})


/*
  ** LEGGER TIL STUDENT **
  ** Forespørsel / kall fra frontend kan se f.eks slik ut: **
  fetch('https://server-url/api/students', {method: 'POST, body: JSON.stringify(data)})

  Også svarer server med dette under
*/
app.post('/api/students', async (c) => {
  const data = await c.req.json();
  const { name } = data;
  
  if (!isNameValid(name)) 
    //return c.json({ success: false, error: "Invalid name" }, { status: 400 });
    return c.json<Result<null>>(
      {
        success: false,
        error: {
          code: "INVALID_NAME",
          message: "Invalid name",
        },
      },
      { status: 400 }
    );

  students.push({ id: crypto.randomUUID(), name });
  
  //return c.json({ success: true, data: students }, {status: 201 });
  return c.json<Result<Student[]>>(
    {
      success: true,
      data: students
    }
  )

})


/*
  ** SLETTE STUDENT **
  ** Forespørsel / kall fra frontend kan se f.eks slik ut: **
  fetch('https://server-url/api/students/${id}', {method: 'DELETE'})

  Mulig implementasjon:
  const handleDelete = async (id: string) => { 
    const response = await fetch('https://server-url/api/students/${id}', {method: 'DELETE'})
    const result = await response.json() // HVIS vi returnerer data og ikke bare { status: 204 }
    // Ellers må vi også kalle GET api-et på nytt:
    // const students = await getStudentsFromApi()
    setStudentList(result) // (students)
  }

  Også svarer server med dette under (response) som vi så (kan gjøre) gjør om til json med .json()
*/
app.delete('/api/students/:id', (c) => {
  const id = c.req.param('id');

  // Filtrerer listen - ingen studenter hvor student.id er lik id
  students = students.filter((student) => student.id !== id);
  return c.json(students);
  // Vanlig å bare returnere "No content" (ingenting), men her returnerer vi listen
  // med oppdatert data -> slipper dermed å gjøre ny GET fetch for å få oppdatert liste
})

/*
  ** OPPDATERE STUDENT **
  ** Forespørsel / kall fra frontend kan se f.eks slik ut: **
  fetch('https://server-url/api/students/${id}', {method: 'PATCH', body: JSON.stringify(data)})

  Også svarer server med dette under
*/
app.patch('/api/students/:id', async (c) => {
  const id = c.req.param('id');
  const { name } = await c.req.json()
  // Filtrerer listen - ingen studenter hvor student.id er lik id
  students = students.map(student => 
    student.id === id ? { ...student, name } : student
  );
  return c.json(students);
})


app.onError((err, c) => {
  console.error(err);

  return c.json(
    {
      error: {
        message: err.message,
      },
    },
    { status: 500 }
  );
});

export default app;
