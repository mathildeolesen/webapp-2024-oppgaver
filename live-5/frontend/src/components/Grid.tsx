import Student from "./Student"

type Student = {
    name: string
    id: string
}
type GridProps = {
    students: Student[]
}


export default function Grid(props: GridProps) {

    const { students } = props;

    return (
        <article className="grid">
            {students.map((student) => (
                <Student key={student.id} name={student.name} id={student.id}/>
                // <Student key={student.id} [...student]}/> 
                // <-- Vet ikke hva vi sender videre, men slipper å forandre navn mange steder
            ))}
        </article>
    )
}