import db from './db'
import {setup} from './setup'

// Dette kalles en IIFE (Immediately Invoked Function Expression)
(async () => {
    await setup(db);
})();

/*
    Nå kan vi i package.json legge under "script":
    "db:setup": "tsx src/db/index.ts"

    Da kan vi skrive "pnpm run db:setup" i terminalen,
    som kaller denne iife, som kjører setup() fra setupen vår,
    som igjen setter opp tabellene våre.

    Med det gjort, skal vi nå få opp en dev.db fil i "backend" mappen
*/