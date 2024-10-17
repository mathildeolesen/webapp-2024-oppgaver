import { Result } from "@/types";


// Hvis vi ønsker at ALLE repositoriene våres skal returnere samme struktur osv, 
// så kunne vi kalt den IRepository, for generalitet.
// Nå gjelder den bare for Student repositoriet vårt (features/students)
type StudentRepository = {
    list : (query?: Record<string, string>) => Promise<Result<string[]>>;
    create: (data: Record<string, string>) => Promise<Result<string>>;
}

// Factory funksjon - en funksjon som tar i mot dependencies
// Dependency : Hva er inni denne funksjonen avhengig av, som jeg ønsker å kunne bytte ut der jeg kaller funksjonen.
export const createStudentRepository = (db: unknown): StudentRepository => {
    return {
        list: () => {},
        create: () => {}
    };
}


// Singleton -> trenger ikke kalle createStudentRepository overalt
export const StudentRepository = createStudentRepository({});