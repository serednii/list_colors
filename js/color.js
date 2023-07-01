
async function getColorsData(url = '/data.json') {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


// *****************************************************************************
class Colors {

    static nameColor = {
        Red_tones: "Красные тона:",
        Blue_tones: "Синие тона:",
        Brown_tones: "Коричневые тона:",
        Gellow_tones: "Жёлтые тона:",
        Gray_tones: "Серые тона:",
        Green_tones: "Зелёные тона:",
        Orang_tones: "Оранжевые тона:",
        Pink_tones: "Розовые тона:",
        Primary_colors: "Основные цвета:",
        Purple_tones: "Фиолетовые тона:",
        White_tones: "Белые тона:",
    }

    static textColor = {
        Red_tones: "black",
        Blue_tones: "red",
        Brown_tones: "black",
        Gellow_tones: "black",
        Gray_tones: "red",
        Green_tones: "black",
        Orang_tones: "black",
        Pink_tones: "black",
        Primary_colors: "red",
        Purple_tones: "black",
        White_tones: "black",
    }

    constructor([data] = data, container = "", palitra = 'Red_tones') {
        this.data = data[palitra];
        this.container = document.querySelector(container);
        this.palitra = palitra;
        this.createHtml();
    }

    createHtml() {

        document.querySelector('.h3-palitra').innerText = Colors.nameColor[this.palitra]

        this.data.forEach(el_col => {
            // console.log(el_col);
            const [colorName, colorHex, colorDec] = el_col;
            this.container.insertAdjacentHTML('beforeend', `
            <tr style="background-color: #${colorHex.substr(1)}; color: ${Colors.textColor[this.palitra]}" >
                    <td class="td-color td-color-name" >${colorName}</td>
                    <td class="td-color td-color-hex" >${colorHex}</td>
                    <td class="td-color td-color=dec" >${colorDec}</td>
                  </tr>
            `)
        });

    }

    chengePalitrs([data] = data, palitra) {
        this.data = data[palitra];
        this.palitra = palitra;
        this.container.innerHTML = '';
        this.createHtml();
    }

}
// *****************************************************************************


// *****************************************************************************
class ColorLinks {
    constructor([data] = data, container = "", palitra) {
        // console.log(data);
        this.container = document.querySelector(container);
        this.palitra = palitra;
        this.createHtml();
    }

    createHtml() {
        this.container.insertAdjacentHTML('beforeend', `
       <button class="btn" data-palitra="${this.palitra}" >${Colors.nameColor[this.palitra]}</button>
        `)
    }

}
// *****************************************************************************


document.addEventListener('DOMContentLoaded', () => {
    const DEFAULT_COLOR = "Red_tones";
    // getColorsData('https://635d74d2ea764497f0dd237e.mockapi.io/orders')
    getColorsData('https://635d74d2ea764497f0dd237e.mockapi.io/favorites')
        .then(data => {
            console.log(...data);
            const colorsObj = new Colors(data, '.color-table', DEFAULT_COLOR);
            const listPalitra = Object.keys(...data);
            // console.log(listPalitra);
            listPalitra.forEach(e => new ColorLinks(data, '.select-color', e));
            // setTimeout(() => {
            const btns = document.querySelectorAll('.select-color .btn');
            // console.log(btns);
            btns.forEach(e => {
                e.addEventListener('click', (elClick) => {
                    btns.forEach((el) => el.classList.remove('btn__active'))
                    elClick.target.classList.add('btn__active');
                    console.log(elClick.target.dataset.palitra)
                    colorsObj.chengePalitrs(data, elClick.target.dataset.palitra);
                })
            })
            // }, 500);

        });

});

