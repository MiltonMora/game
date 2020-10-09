const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10;

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 1000);
    }

    inicializar() {
        this.elegirColor = this.elegirColor.bind(this);
        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.toogleBtnEmpelzar()
        this.nivel = 1;
        this.colores =  {
            celeste,
            violeta,
            naranja,
            verde,
        }
    }
    toogleBtnEmpelzar() {
        if(btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        }
        else {
            btnEmpezar.classList.add('hide')
        }
    }
    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }
    siguienteNivel() {
        this.subNivel = 0;
        this.iluminarSecuencia();
        this.agregarEventoClick()
    }
    transformarNumeroAcolor(num) {
        switch (num) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }

    }
    transformarColorANumero(Color) {
        switch (Color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }

    }
    iluminarColor(color) {
        this.colores[color].classList.add('light');
        setTimeout(() => this.apagarColor(color), 350)
    }
    apagarColor(color) {
        this.colores[color].classList.remove('light');
    }
    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAcolor(this.secuencia[i]);
            setTimeout(() => this.iluminarColor(color), 1000 * i);
        }
    }
    agregarEventoClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor);
        this.colores.verde.addEventListener('click', this.elegirColor);
        this.colores.violeta.addEventListener('click', this.elegirColor);
        this.colores.naranja.addEventListener('click', this.elegirColor);
    }
    eliminarEventoClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor);
        this.colores.verde.removeEventListener('click', this.elegirColor);
        this.colores.violeta.removeEventListener('click', this.elegirColor);
        this.colores.naranja.removeEventListener('click', this.elegirColor);
    }
    elegirColor(event) {
        const nombreColor = event.target.dataset.color;
        const numeroColor = this.transformarColorANumero(nombreColor);
        this.iluminarColor(nombreColor)
        if(numeroColor === this.secuencia[this.subNivel]) {
            this.subNivel++
            if(this.nivel === this.subNivel) {
                this.nivel++
                this.eliminarEventoClick()
                if(this.nivel === (ULTIMO_NIVEL +1)) {
                    this.ganoElJuego();
                } else {
                    setTimeout(this.siguienteNivel, 1000);
                }
            }
        } else {
            this.perdioElJuego()
        }
    }
    ganoElJuego() {
        swal('😃', 'Feliciataciones Ganaste', 'success').then(this.inicializar)
    }
    perdioElJuego() {
        this.eliminarEventoClick()
        swal('😱', 'perdiste', 'error').then(this.inicializar)
    }
}

function empezarJuego() {
    var juego = new Juego()
}