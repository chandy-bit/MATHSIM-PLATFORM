
let geometryCanvas, ctx;
let currentTool = null;

function openGeometry(type) {
    document.getElementById('geometryTool').style.display = 'block';
    currentTool = type;
    
    geometryCanvas = document.getElementById('geometryCanvas');
    ctx = geometryCanvas.getContext('2d');
    
    const titles = {
        'triangle': 'Triangle Explorer',
        'circle': 'Circle Explorer',
        'angles': 'Angle Explorer',
        'area': 'Area & Perimeter',
        'volume': 'Volume Visualizer',
        'transform': 'Transformations'
    };
    
    document.getElementById('toolTitle').textContent = titles[type] || 'Geometry Tool';
    
    // Draw based on type
    drawGeometry(type);
}

function drawGeometry(type) {
    ctx.clearRect(0, 0, geometryCanvas.width, geometryCanvas.height);
    
    switch(type) {
        case 'triangle':
            drawTriangle();
            break;
        case 'circle':
            drawCircle();
            break;
        case 'angles':
            drawAngles();
            break;
        case 'area':
            drawArea();
            break;
        case 'volume':
            drawVolume();
            break;
        case 'transform':
            drawTransform();
            break;
    }
}

function drawTriangle() {
    ctx.beginPath();
    ctx.moveTo(100, 250);
    ctx.lineTo(300, 250);
    ctx.lineTo(200, 100);
    ctx.closePath();
    
    ctx.fillStyle = 'rgba(76, 175, 80, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Labels
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';
    ctx.fillText('a', 180, 200);
    ctx.fillText('b', 250, 180);
    ctx.fillText('c', 140, 180);
    
    // Right angle indicator
    ctx.beginPath();
    ctx.moveTo(190, 240);
    ctx.lineTo(190, 220);
    ctx.lineTo(210, 220);
    ctx.strokeStyle = '#f44336';
    ctx.stroke();
}

function drawCircle() {
    ctx.beginPath();
    ctx.arc(300, 150, 100, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(33, 150, 243, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#2196F3';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Radius line
    ctx.beginPath();
    ctx.moveTo(300, 150);
    ctx.lineTo(360, 190);
    ctx.strokeStyle = '#f44336';
    ctx.setLineDash([5, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
    
    ctx.fillStyle = '#333';
    ctx.fillText('r = 100', 320, 170);
}

function drawAngles() {
    // Draw intersecting lines
    ctx.beginPath();
    ctx.moveTo(100, 150);
    ctx.lineTo(500, 150);
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(300, 50);
    ctx.lineTo(300, 250);
    ctx.strokeStyle = '#2196F3';
    ctx.stroke();
    
    // Angle arc
    ctx.beginPath();
    ctx.arc(300, 150, 50, 0, Math.PI / 2);
    ctx.strokeStyle = '#f44336';
    ctx.stroke();
    
    ctx.fillStyle = '#333';
    ctx.fillText('90°', 320, 120);
    ctx.fillText('Parallel lines', 400, 130);
}

function drawArea() {
    // Rectangle
    ctx.fillStyle = 'rgba(76, 175, 80, 0.3)';
    ctx.fillRect(100, 100, 150, 100);
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 2;
    ctx.strokeRect(100, 100, 150, 100);
    ctx.fillStyle = '#333';
    ctx.fillText('Area = 150 × 100 = 15,000', 120, 80);
    
    // Triangle
    ctx.beginPath();
    ctx.moveTo(350, 200);
    ctx.lineTo(450, 200);
    ctx.lineTo(400, 100);
    ctx.closePath();
    ctx.fillStyle = 'rgba(33, 150, 243, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#2196F3';
    ctx.stroke();
    ctx.fillText('Area = ½ × 100 × 100 = 5,000', 350, 80);
}

function drawVolume() {
    // 3D cube effect
    ctx.fillStyle = 'rgba(76, 175, 80, 0.3)';
    ctx.fillRect(200, 100, 150, 150);
    ctx.strokeStyle = '#4CAF50';
    ctx.strokeRect(200, 100, 150, 150);
    
    // Top face
    ctx.beginPath();
    ctx.moveTo(200, 100);
    ctx.lineTo(250, 50);
    ctx.lineTo(400, 50);
    ctx.lineTo(350, 100);
    ctx.closePath();
    ctx.fillStyle = 'rgba(33, 150, 243, 0.2)';
    ctx.fill();
    ctx.strokeStyle = '#2196F3';
    ctx.stroke();
    
    // Side face
    ctx.beginPath();
    ctx.moveTo(350, 100);
    ctx.lineTo(400, 50);
    ctx.lineTo(400, 200);
    ctx.lineTo(350, 250);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 193, 7, 0.2)';
    ctx.fill();
    ctx.strokeStyle = '#FFC107';
    ctx.stroke();
    
    ctx.fillStyle = '#333';
    ctx.fillText('Volume = length × width × height', 200, 280);
}

function drawTransform() {
    // Original shape
    ctx.fillStyle = 'rgba(76, 175, 80, 0.3)';
    ctx.fillRect(100, 100, 100, 100);
    ctx.strokeStyle = '#4CAF50';
    ctx.strokeRect(100, 100, 100, 100);
    ctx.fillStyle = '#333';
    ctx.fillText('Original', 120, 90);
    
    // Rotated (simplified)
    ctx.save();
    ctx.translate(300, 150);
    ctx.rotate(0.3);
    ctx.fillStyle = 'rgba(33, 150, 243, 0.3)';
    ctx.fillRect(-50, -50, 100, 100);
    ctx.strokeStyle = '#2196F3';
    ctx.strokeRect(-50, -50, 100, 100);
    ctx.restore();
    ctx.fillText('Rotated', 280, 70);
    
    // Translated
    ctx.fillStyle = 'rgba(255, 193, 7, 0.3)';
    ctx.fillRect(400, 150, 100, 100);
    ctx.strokeStyle = '#FFC107';
    ctx.strokeRect(400, 150, 100, 100);
    ctx.fillText('Translated', 410, 140);
}