
// Helping color functions

// Changing alpha chanel of rgb format
export const changeAlfaRgba = (rgba, newAlpha) => {
    const rgbaComponents = rgba.match(/\d+(\.\d+)?/g);
    const [red, green, blue, _] = rgbaComponents;

    // Створюємо нове RGBA зі зміненим альфа-каналом
    const newColor = `rgba(${red}, ${green}, ${blue}, ${newAlpha})`

    return newColor
}

// Transform color hex format to rgb
export const hexToRgb = (hex) => {
    // Видалення символу # (якщо він є)
    hex = hex.replace('#', '');

    // Розділення на складові R, G, B
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Повернення результату у форматі RGB
    return `rgb(${r}, ${g}, ${b})`;
}