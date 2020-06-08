const changeColorTheme = (...url) => {
    let ele = document.getElementById('theme-color');
    let current = ele.getAttribute('href');
    let next = current;
    url.forEach((val, index, list) => {
        if (current === val) {
            if (index + 1 === list.length) {
                next = list[0];
            } else {
                next = list[index + 1];
            }
            console.log('changed theme to', index);
        }
    });
    ele.setAttribute('href', next);
};
