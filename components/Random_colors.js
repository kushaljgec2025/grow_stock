const Random_colors = () => {
    const colors = ["#ef4444", "#fb923c", "#fbbf24", "#ec4899", "#8b5cf6", "#06b6d4"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
};

export default Random_colors;