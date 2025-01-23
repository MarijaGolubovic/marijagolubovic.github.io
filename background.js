class BackgroundCanvas extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        this.canvas = document.createElement('canvas');
        this.canvas.width = 3500;
        this.canvas.height = 500;
        this.canvas.style.width = '100%';
        this.shadowRoot.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.dots = [];
        this.numDots = 120;
        this.velocity = 0.1;

        this.createDots();
        this.animate = this.animate.bind(this);
        this.animate();
    }

    connectedCallback() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.animate();

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }

    createDots() {
        for (let i = 0; i < this.numDots; i++) {
            this.dots.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.velocity,
                vy: (Math.random() - 0.5) * this.velocity,
                radius: 3
            });
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#ddd';
        this.ctx.strokeStyle = '#ddd';

        this.dots.forEach(dot => {
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });

        for (let i = 0; i < this.dots.length; i++) {
            for (let j = i + 1; j < this.dots.length; j++) {
                const dx = this.dots[i].x - this.dots[j].x;
                const dy = this.dots[i].y - this.dots[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.dots[i].x, this.dots[i].y);
                    this.ctx.lineTo(this.dots[j].x, this.dots[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    update() {
        this.dots.forEach(dot => {
            dot.x += dot.vx;
            dot.y += dot.vy;

            if (dot.x < 0 || dot.x > this.canvas.width) dot.vx *= -1;
            if (dot.y < 0 || dot.y > this.canvas.height) dot.vy *= -1;
        });
    }

    animate() {
        this.draw();
        this.update();
        requestAnimationFrame(this.animate);
    }
}

customElements.define('background-canvas', BackgroundCanvas);