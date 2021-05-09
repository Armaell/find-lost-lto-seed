import { LTO } from "lto-api";
import cliProgress from "cli-progress";

const lto = new LTO();
const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

export function findTypo (seed: string, target_address: string, max_depth: number, current_depth: number = 1, min_seed_pos = 0): string | null {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ \t\n";

    if (current_depth === 1)
        progressBar.start(seed.length, 0);

    for (let seed_pos = min_seed_pos; seed_pos < seed.length; seed_pos++) {

        if (current_depth === 1)
            progressBar.update(seed_pos);

        for (let typo_type = 0; typo_type < letters.length + 1; typo_type++) {
            let modified_seed = setCharAt(seed, seed_pos, letters[typo_type] ?? '');
            const address = lto.createAccountFromExistingPhrase(modified_seed).address;

            if (address === target_address) {
                progressBar.stop();
                return modified_seed;
            }
            else if (current_depth < max_depth) {
                const result = findTypo(modified_seed, target_address, max_depth, current_depth + 1, seed_pos + 1);
                if (result) {
                    progressBar.stop();
                    return result;
                }
            }
        }
    }

    if (current_depth === 1)
        progressBar.stop();
    return null;
}

function setCharAt(str: string, index: number, chr: string) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}
