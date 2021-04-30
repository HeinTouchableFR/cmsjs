export function presets() {
    const presettings = [];
    for (let i = 1; i < 7; i += 1) {
        const preset = {
        };
        preset.id = new Date().getTime() + i;
        preset.nbColumns = i;
        presettings.push(preset);
    }
    return presettings;
}
