
import Student from "./Student"
import { Student as StudentProps } from "./types";
import AddStudentForm from "./AddStudentForm";

type GridProps = {
    students: StudentProps[];
    onAddStudent: ({ name } : { name: string }) => void; 
    onRemoveStudent: (id: string) => void;
}

export default function Grid(props: GridProps) {

   const { students, onAddStudent, onRemoveStudent } = props;

    return (
        <section>
            <article className="grid">
                {students.map((student) => (
                    <Student key={student.id} name={student.name} id={student.id} 
                        onRemoveStudent={onRemoveStudent}/>
                    // <Student key={student.id} [...student]}/> 
                    // <-- Vet ikke hva vi sender videre, men slipper å forandre navn mange steder
                ))}
            </article>
            <AddStudentForm onAddStudent={onAddStudent}/>
        </section>
    )
}