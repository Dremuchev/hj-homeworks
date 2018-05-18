'use strict';
let direction;
function handleTableClick(event) {
    if(event.target.tagName === 'TH') {
        const title = event.target.dataset.propName;
        if(!direction) {
            direction = 1;
            event.target.dataset.dir = direction;
            event.currentTarget.dataset.sortBy = title;
            sortTable(title, direction);
        } else if (direction === 1) {
            direction = -1;
            event.target.dataset.dir = direction;
            event.currentTarget.dataset.sortBy = title;
            sortTable(title, direction);
        } else {
            direction = 1;
            event.target.dataset.dir = direction;
            event.currentTarget.dataset.sortBy = title;
            sortTable(title, direction);
        }
    }
}