import { LTO } from "lto-api";
import cliProgress from "cli-progress";

const lto = new LTO();
const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

export function badSpacing (seed: string, target_address: string) {
    const separators_types = [' ', '  ', '', '\t', '\n'];
    const seed_words = seed.split(' ');
    const separators_count = seed_words.length - 1;

    const permutations_count = (separators_types.length + 1) ** separators_count;
    progressBar.start(permutations_count, 0);

    for (let index = 0; index < permutations_count; index++) {
        progressBar.update(index);
        const separators_mask = index.toString(separators_types.length + 1).split('');
        separators_mask.reverse();

        let seed = seed_words[0];
        for (let word_index = 1; word_index < seed_words.length; word_index++) {
            let separator = separators_types[parseInt(separators_mask[word_index - 1] ?? 0)]
            seed += separator + seed_words[word_index];
        }

        const address = lto.createAccountFromExistingPhrase(seed).address;
        if (address === target_address) {
            progressBar.stop();
            return seed;
        }

    }

    progressBar.stop();
    return null;
}
