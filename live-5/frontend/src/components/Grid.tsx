import { useState } from "react";
import Student from "./Student"
import { Student as StudentProps } from "./types";
import AddStudentForm from "./AddStudentForm";

type GridProps = {
    students: StudentProps[]
}

export default function Grid(props: GridProps) {

    //const { students } = props;
    const [students, setStudents] = useState<StudentProps[]>(props.students ?? [])

    // React hjelper  å holde kontroll på tilstanden
    // I dette tilfellet ønsker jeg å ha kontroll på studenter
    // useState krever en initial state -> props.students ?? [] -> props.students ELLER en tom liste
    // to variabler ut fra useState -> [students, setStudents]
    // useState returnerer dette --> return [tilstandenDin, funksjonenDuKanBrukeForÅOppdatereTilstanden]
    // Hva inneholder listen nå -> students
    // Denne funksjonen kan du bruke for å oppdatere listen din -> setStudents
    // (setStudents er basert på en intern funksjon i useState)


    const onAddStudent = (student: {name: string} ) => {
        setStudents((prev) => [...prev, {id: crypto.randomUUID(), ...student }]);
        // (prev) -> staten sånn som den *var*
        // ...prev -> sprer dem som var der allerede ut
        // , {id: crypto.randomUUID(), ...student } -> og legger til det nye på slutten

    }

    return (
        <section>
            <article className="grid">
                {students.map((student) => (
                    <Student key={student.id} name={student.name} id={student.id}/>
                    // <Student key={student.id} [...student]}/> 
                    // <-- Vet ikke hva vi sender videre, men slipper å forandre navn mange steder
                ))}
            </article>
            <AddStudentForm onAddStudent={onAddStudent}/>
        </section>
    )
}