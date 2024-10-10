import { useState } from "react";
import Grid from "./components/Grid";
import Total from "./components/Total";
import { Student } from "./components/types";


const initialStudents = [
  { id: "1", name: "Mathilde Olesen" },
  { id: "2", name: "Kari Nordmann" },
  { id: "3", name: "Ola Nordmann" }
]



function App() {

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

  return (
    <main>
      <Grid students={students} onAddStudent={onAddStudent} onRemoveStudent={onRemoveStudent}/>
      <Total total={students.length}/>
    </main>
  );
}

export default App;