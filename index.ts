import inquirer from 'inquirer';
import fs from 'fs';

import { prompts, PromptAnswers } from './prompt';
import { badSpacing } from "./scripts/spacing";
import { findTypo } from "./scripts/typo";
import { badUppercases } from './scripts/uppercase';

inquirer.prompt(prompts).then(run)

function run (anwsers: PromptAnswers) {
    if (anwsers.script === "Typo" && anwsers.max_depth) {
        promptResult(findTypo(anwsers.seed, anwsers.address, anwsers.max_depth));
    }
    else if (anwsers.script === "Spacing") {
        promptResult(badSpacing(anwsers.seed, anwsers.address));
    }
    else if (anwsers.script === "Uppercases") {
        promptResult(badUppercases(anwsers.seed, anwsers.address));
    }
}

function promptResult (seed: string | null) {
    if (seed) {
        console.log('-'.repeat(20) + ' Seed found !! ' + '-'.repeat(20) + '\n'
        + seed + '\n' +
        '-'.repeat(55));
        fs.writeFile('seed.out', seed, () => {});
    } else {
        console.log('Seed not found :(');
    }
}
