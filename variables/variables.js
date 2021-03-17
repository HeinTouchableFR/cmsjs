export function structures() {
    const structures = [];
    for (let i = 1; i < 7; i++) {
        const structure = {};
        structure.id = new Date().getTime() + i;
        structure.nbColumns = i;
        structures.push(structure);
    }
    return structures
}
