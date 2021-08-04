interface PromptAnswers {
    seed: string,
    address: string,
    script: "Bip39" | "Typo" | "Spacing" | 'Uppercases',
    max_depth?: number
}

const prompts = [
    {
    "type": "input",
    "name": "seed",
    "message": "Saved seed phrase"
    },
    {
        "type": "input",
        "name": "address",
        "message": "Public address"
    },
    {
        "type": "list",
        "name": "script",
        "choices": [
            "Bip39",
            "Typo",
            "Spacing",
            "Uppercases"
        ]
    },
    {
        "type": "number",
        "name": "max_depth",
        "message": "Number of typos",
        "default": 1,
        "when": (answers: any) => answers.script === "Typo"
    }
];

export { prompts, PromptAnswers }
