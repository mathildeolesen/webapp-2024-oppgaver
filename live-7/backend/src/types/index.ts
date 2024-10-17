
export type Student = {
    id: string,
    name: string
  }


export type Result<T> = 
    | {
        success: true,
        data: T
      } 
    | {
        success: false,
        error: {
            code: string;
            message: string;
        };
      };

/*
* <T> ---> Generic. Når typen brukes, vil T settes.
* f.eks:
* Promise<Result<Student[]>>
* 
* Hvis success == true, så er data en liste med Student-er
* 
* Vi sier også at hvis success == true, så MÅ det være en data key med data av typen T.
* 
* ELLER |
* success == false,
* Og det følger da med en error i stede, med en kode og en melding.
*/
