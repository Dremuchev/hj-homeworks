'use strict';
const acSelect = document.getElementById('acSelect');
const btnSeatMap = document.getElementById('btnSeatMap');
const btnSetFull = document.getElementById('btnSetFull');
const btnSetEmpty = document.getElementById('btnSetEmpty');
const seatMapTitle = document.getElementById('seatMapTitle');
const seatMapDiv = document.getElementById('seatMapDiv');
btnSetFull.disabled = true;
btnSetEmpty.disabled = true;

btnSeatMap.addEventListener('click', event => {
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://neto-api.herokuapp.com/plane/${acSelect.value}`);
    xhr.send('');
    xhr.addEventListener('load', () => {
        const plane = JSON.parse(xhr.responseText);
        console.log(plane)
        const seats = document.getElementsByClassName('seat');
        const totalPax = document.getElementById('totalPax');
        const totalAdult = document.getElementById('totalAdult');
        const totalHalf = document.getElementById('totalHalf');
        seatMapTitle.innerText = `${plane.title} (${plane.passengers} пассажиров)`;

        Array.from(seatMapDiv.children)
            .forEach(el => seatMapDiv.removeChild(el));

        seatMapDiv
            .appendChild(createSchemeEngine(plane.scheme.map(((row, index) => createScheme(row, index)))))

        btnSetFull.disabled = false;
        btnSetFull.addEventListener('click', event => {
            event.preventDefault();
            for (const seat of seats) {
                seat.className = 'col-xs-4 seat adult';
            }
            totalAdult.innerText = document.getElementsByClassName('adult').length;
            totalHalf.innerText = document.getElementsByClassName('half').length;
        })

        btnSetEmpty.disabled = false;
        btnSetEmpty.addEventListener('click', event => {
            event.preventDefault();
            for (const seat of seats) {
                seat.className = 'col-xs-4 seat';
            }
            totalAdult.innerText = document.getElementsByClassName('adult').length;
            totalHalf.innerText = document.getElementsByClassName('half').length;
        })

        for (const seat of seats) {
            seat.addEventListener('click', event => {
                const currentSeat = event.currentTarget;
                if(currentSeat.classList.contains('seat') || currentSeat.classList.contains('seat-label')) {
                    if (!event.altKey) {
                        if (currentSeat.classList.contains('adult') || currentSeat.classList.contains('half')) {
                            currentSeat.className = 'col-xs-4 seat';
                        } else {
                            currentSeat.classList.toggle('adult');
                        }
                        totalAdult.innerText = document.getElementsByClassName('adult').length;
                        totalHalf.innerText = document.getElementsByClassName('half').length;
                        return;
                    }
                    switch (event.type) {
                        case 'click' :
                            currentSeat.classList.toggle('half');
                            totalHalf.innerText = document.getElementsByClassName('half').length;
                            break;
                    }
                }
            })
        }
        totalPax.innerText = seats.length;
        totalAdult.innerText = document.getElementsByClassName('adult').length;
        totalHalf.innerText = document.getElementsByClassName('half').length;
    })
})

function createScheme(seatingRow, index) {
    const array = [];
    if (parseInt(seatingRow) === 0) {
        array.push(
            {
                tag: 'div',
                cls: ['row', 'seating-row', 'text-center'],
                content:
                    [
                        {
                            tag: 'div', cls: ['col-xs-1', 'row-number'], content:
                            {tag: 'h2', content: index}
                        },
                        {
                            tag: 'div',
                            cls: ['col-xs-4', 'no-seat'],
                        }
                    ]
            }
        )
    } else if (parseInt(seatingRow) === 4) {
        array.push(
            {
                tag: 'div',
                cls: ['row', 'seating-row', 'text-center'],
                content:
                    [
                        {
                            tag: 'div', cls: ['col-xs-1', 'row-number'], content:
                            {tag: 'h2', content: index}
                        },
                        {
                            tag: 'div', cls: 'col-xs-5', content:
                            [
                                {
                                    tag: 'div', cls: ['col-xs-4', 'seat'], content:
                                    {tag: 'span', cls: 'seat-label', content: 'A'}
                                },
                                {
                                    tag: 'div', cls: ['col-xs-4', 'seat'], content:
                                    {tag: 'span', cls: 'seat-label', content: 'B'}
                                },
                                {
                                    tag: 'div',
                                    cls: ['col-xs-4', 'no-seat'],
                                }
                            ]
                        },
                        {
                            tag: 'div', cls: 'col-xs-5', content:
                            [

                                {
                                    tag: 'div',
                                    cls: ['col-xs-4', 'no-seat'],
                                },
                                {
                                    tag: 'div', cls: ['col-xs-4', 'seat'], content:
                                    {tag: 'span', cls: 'seat-label', content: 'C'}
                                },
                                {
                                    tag: 'div', cls: ['col-xs-4', 'seat'], content:
                                    {tag: 'span', cls: 'seat-label', content: 'D'}
                                }
                            ]
                        }
                    ]
            }
        )
    } else {
        array.push(
            {
                tag: 'div',
                cls: ['row', 'seating-row', 'text-center'],
                content:
                    [
                        {
                            tag: 'div', cls: ['col-xs-1', 'row-number'], content:
                            {tag: 'h2', content: index}
                        },
                        {
                            tag: 'div', cls: 'col-xs-5', content:
                            [
                                {
                                    tag: 'div', cls: ['col-xs-4', 'seat'], content:
                                    {tag: 'span', cls: 'seat-label', content: 'A'}
                                },
                                {
                                    tag: 'div', cls: ['col-xs-4', 'seat'], content:
                                    {tag: 'span', cls: 'seat-label', content: 'B'}
                                },
                                {
                                    tag: 'div', cls: ['col-xs-4', 'seat'], content:
                                    {tag: 'span', cls: 'seat-label', content: 'C'}
                                }
                            ]
                        },
                        {
                            tag: 'div', cls: 'col-xs-5', content:
                            [
                                {
                                    tag: 'div', cls: ['col-xs-4', 'seat'], content:
                                    {tag: 'span', cls: 'seat-label', content: 'D'}
                                },
                                {
                                    tag: 'div', cls: ['col-xs-4', 'seat'], content:
                                    {tag: 'span', cls: 'seat-label', content: 'E'}
                                },
                                {
                                    tag: 'div', cls: ['col-xs-4', 'seat'], content:
                                    {tag: 'span', cls: 'seat-label', content: 'F'}
                                }
                            ]
                        }
                    ]
            }
        ) }
    return array;
}
function createSchemeEngine(block) {
    if ((block === undefined) || (block === null) || (block === false)) {
        return document.createTextNode('');
    }

    if ((typeof block === 'string') || (typeof block === 'number') || (block === true)) {
        return document.createTextNode(block);
    }

    if(Array.isArray(block)) {
        return block.reduce((emptyElement, elem) => {
            emptyElement.appendChild(createSchemeEngine(elem));
            return emptyElement;
        }, document.createDocumentFragment())
    }

    const element = document.createElement(block.tag || 'div');
    [].concat(block.cls || []).forEach(className => element.classList.add(className));
    element.appendChild(createSchemeEngine(block.content));
    return element;
}