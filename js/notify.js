export const nofitifcation = (text, time = 1600, color = "#721c24", background = "#f8d7da") => {
    Toastify({
        text: text,
        duration: time,
        close: false,
        className: "info",
        position: "center",
        style: {
            fontSize: "1.6em",
            color: color,
            background: background,
            borderRadius: "8px",
            borderColor: "#f5c6cb"
        },
        offset: {
            y: 10,
        }
    }).showToast();
};