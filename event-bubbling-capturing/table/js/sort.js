'use strict';
function handleTableClick(event) {
    if(event.target.tagName === 'TH') {
        const title = event.target.dataset.propName;
        const dir = parseInt(event.target.dataset.dir);
        event.target.dataset.dir = (isNaN(dir)) ? 1 : (dir === 1) ? -1 : 1;
        event.currentTarget.dataset.sortBy = title;
        sortTable(title, event.target.dataset.dir);
    }
}