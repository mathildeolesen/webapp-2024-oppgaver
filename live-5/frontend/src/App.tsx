import Grid from "./components/Grid";
import Student from "./components/Student";


const students = [
  { id: "1", name: "Mathilde Olesen" },
  { id: "2", name: "Kari Nordmann" },
  { id: "2", name: "Ola Nordmann" }
]

function App() {
  return (
    <main>
      <Grid students={students}/>
    </main>
  );
}

export default App;