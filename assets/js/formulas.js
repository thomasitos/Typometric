export const formulaPresets = [
    { 
        name: "Linear", 
        fontSize: "(24 - (var(--char-index) / var(--char-total)) * 24) * 1pt",
        axis: "MAX_VAL - (var(--char-index) / var(--char-total)) * MAX_VAL"
    },
    { 
        name: "Waves", 
        fontSize: "(sin(var(--char-index) * 6deg) + 1) * 12pt",
        axis: "(sin(var(--char-index) * 6deg) + 1) * MAX_VAL / 2"
    },
    { 
        name: "Steps", 
        fontSize: "mod(var(--char-index), 12) * 2pt",
        axis: "mod(var(--char-index), 12) * MAX_VAL / 12"
    }
];