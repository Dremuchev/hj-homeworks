const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');
window.editor.addEventListener('update', sendMyCanvas);

function sendMyCanvas(){
    canvas.toBlob(snap => ws.send(snap));
}