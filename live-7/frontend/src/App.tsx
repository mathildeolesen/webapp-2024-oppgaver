import { useEffect, useState } from "react";
import Grid from "./components/Grid";
import Total from "./components/Total";
import { Student } from "./components/types";
import AddStudentForm from "./components/AddStudentForm";
import Filter from "./components/Filter";


const initialStudents = [
  { id: "1", name: "Mathilde Olesen" },
  { id: "2", name: "Kari Nordmann" },
  { id: "3", name: "Ola Nordmann" }
]



function App() {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [students, setStudents] = useState<Student[]>(initialStudents ?? [])
  // React hjelper  å holde kontroll på tilstanden
    // I dette tilfellet ønsker jeg å ha kontroll på studenter
    // useState krever en initial state -> initialStudents ?? [] -> initialStudents ELLER en tom liste
    // to variabler ut fra useState -> [students, setStudents]
    // useState returnerer dette --> return [tilstandenDin, funksjonenDuKanBrukeForÅOppdatereTilstanden]
    // Hva inneholder listen nå -> students
    // Denne funksjonen kan du bruke for å oppdatere listen din -> setStudents
    // (setStudents er basert på en intern funksjon i useState)

  const onAddStudent = (student: Omit<Student, "id"> ) => {
    setStudents((prev) => [...prev, {id: crypto.randomUUID(), ...student }]);
    // (prev) -> staten sånn som den *var*
    // ...prev -> sprer dem som var der allerede ut
    // , {id: crypto.randomUUID(), ...student } -> og legger til det nye på slutten
    
    // Vi ønsker ikke å mutere ved bruk av .push(), det kan gi bieffekter andre steder i applikasjonen
    // som vi ikke har kontroll på
  }

  const onRemoveStudent = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id))
  }

  const [filter, setFilter] = useState("-");

  const onFilterChange = (filter: string) => {
    setFilter(filter);
  }

  // const options = Array.from(
  //   new Set(
  //     students.map((student) => student.name.trim().split(" ")[0].toLowerCase())
  //   )
  // );

  const options = Array.from(
    students
      .reduce((acc, student: Student) => {
        const name = student.name.trim().split(" ")[0];
        if (acc.has(name)) return acc;

        return acc.set(name, {
          ...student,
          value: name.toLowerCase(),
          label: name,
        });
      }, new Map())
      .values()
  );

  const filteredStudents = students.filter(student => 
    filter !== '-' ? student.name.toLowerCase().includes(filter) : true
  )

  useEffect(() => {
    // Her skjer det noe
    const fetchStudents = async () => {
      try {
        setLoading(true) // Kan fortelle at noe skjer, noe er på vei... kan trigge loading hjul f.eks
        // TODO: No hardcoded url. Move to config in config/index.ts
        const response = await fetch("http://localhost:3999/api/students")
        const data = await response.json()
        setStudents(data); 
        // Forventer her at data er en ren liste [] og ikke f.eks {data: studentList} (Da må vi data.data)
      } catch (error) {
        console.error(error); // Tar ikke med i produksjon, men i utvikling så er det fint.
        // TODO: No hardcoded Strings. Have them in a config. What if we want to change language?
        setError("Feilet ved henting av studenter")
      } finally {
        // Skjer alltid
        setLoading(false) // Nå skjer det ikke noe lenger -> stoppe loading hjul
      }
    }; 

    fetchStudents();

  }, [/* Hva skal trigge useEffecten */])
  // useEffect bruksområder: 
  // Laste inn data når komponenten lastes inn for første gang


  return (
    <main>
      <Filter 
        filter={filter} 
        onFilterChange={onFilterChange} 
        options={Object.values(options)}
        /* options gir oss => [[key, {}], [key, {}] (en Array med Map-par)]
            Object.values(options gir oss -> [{}, {}, {}]*/
        />
      <Grid 
        students={filteredStudents} 
        // onAddStudent={onAddStudent} 
        onRemoveStudent={onRemoveStudent}
      >
        <AddStudentForm onAddStudent={onAddStudent}/>
      </Grid>
      <Total total={students.length}/>
    </main>
  );
}

export default App;