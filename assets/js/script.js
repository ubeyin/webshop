let selected = false;
let access = false;

setInterval(() => {

    var win = window,
        doc = document,
        docElem = doc.documentElement,
        body = doc.getElementsByTagName('body')[0],
        x = win.innerWidth || docElem.clientWidth || body.clientWidth,
        y = win.innerHeight || docElem.clientHeight || body.clientHeight;

    if (x <= 300) {
        document.querySelectorAll(".err0x0")[0].style.display = "block";
        document.querySelectorAll(".editor")[0].style.display = "none";
    } else {
        document.querySelectorAll(".err0x0")[0].style.display = "none";
        document.querySelectorAll(".editor")[0].style.display = "block";
        setTimeout(() => {
            document.querySelectorAll(".editor .welcome")[0].style.display = "none";
            document.querySelectorAll(".editor .main")[0].style.display = "block";
        }, 1000);
    }

    function show_err0x1(browser, show) {
        document.querySelectorAll(".err0x1 mark")[0].innerHTML = browser;
        if (show == true) {
            document.querySelectorAll(".err0x1")[0].style.display = "block";
            document.querySelectorAll(".editor")[0].style.display = "none";
        } else {
            document.querySelectorAll(".err0x1")[0].style.display = "none";
            document.querySelectorAll(".editor")[0].style.display = "block";
        }

    }

    for (let po = 0; po < document.querySelectorAll(".bx mark").length; po++) {
        document.querySelectorAll(".bx mark")[po].innerHTML = "Layer: " + (selected !== false ? selected.id : "");
    }

    if (selected != false) {
        access = true;
    } else {
        access = false;
        document.querySelectorAll(".edit_property")[0].style.display = "none";
        document.querySelectorAll(".edit_style")[0].style.display = "none";
        document.querySelectorAll(".edit_color")[0].style.display = "none";
        const i = document.querySelectorAll(".editbox .grid button");
        for (let l = 0; l < i.length; l++) {
            i[l].classList.remove("active");
            i[l].onclick = function () {
                showAlert("First create an item for edit!");
            };
        }
    }

    document.querySelectorAll("#preview")[0].value = document.querySelectorAll(".body")[0].innerHTML.replace(/\s+/g, ' ').trim();

}, 10);

document.querySelectorAll(".btg button")[0].onclick = function () {
    if (selected) {
        document.querySelectorAll(".body")[0].removeChild(selected);
        document.querySelectorAll("#ctrl-s")[0].removeChild(document.querySelectorAll("#ctrl-s option:checked")[0]);
        selected = false;
    }
};

for (let hk = 0; hk < document.querySelectorAll(".abc input").length; hk++) {
    document.querySelectorAll(".abc input")[hk].disabled = "true";
}

for (let o = 0; o < document.querySelectorAll(".main .headbar .right button").length; o++) {
    let state = false;
    document.querySelectorAll(".main .headbar .right button span")[o].onclick = function () {
        if (document.querySelectorAll(".main .headbar .right button")[o].querySelectorAll("div")[0]) {
            if (state == false) {
                document.querySelectorAll(".main .headbar .right button")[o].querySelectorAll("div")[0].style.display = "block";
                state = true;
            } else if (state == true) {
                document.querySelectorAll(".main .headbar .right button")[o].querySelectorAll("div")[0].style.display = "none";
                state = false;
            }
        }
    };
}

function bottomBarAction() {
    const i = document.querySelectorAll(".editbox .grid button");

    for (let l = 0; l < i.length; l++) {
        setInterval(() => {
            i[l].onclick = function () {
                if (access == true) {
                    activeSwitch(l);
                    eval("buttonAction" + l + "();");
                }
            };
        }, 100);
    }

    function activeSwitch(index) {
        i[index].classList.add("active");
        for (let k = 0; k < i.length; k++) {
            if (k != index) {
                i[k].classList.remove("active");
            }
        }
    }
}

bottomBarAction();

function addNewAction() {
    let id = "";
    let pde = {
        "Header": "",
        "Paragraph": "",
        "Image": "",
        "Canvas": "",
        "SVG": "",
        "Link": "",
        "List": ""
    };
    const asd = document.querySelectorAll(".addnewbox .item div");

    for (let p = 0; p < asd.length; p++) {
        asd[p].onclick = function () {
            asd[p].classList.add("select");
            for (let d = 0; d < asd.length; d++) {
                if (d != p) {
                    asd[d].classList.remove("select");
                }
            }
        }

    }

    document.querySelectorAll(".addnewbox button")[0].onclick = function () {
        let fi = document.querySelectorAll(".addnewbox .item .select p")[0];
        const fit = document.querySelectorAll(".addnewbox .item .select")[0];
        if (fi) {
            for (const u in pde) {
                if (u == fi.innerHTML) {
                    document.querySelectorAll(".idset")[0].style.display = "";
                    document.querySelectorAll(".addnewbox")[0].style.display = "none";
                    document.querySelectorAll("#idset")[0].value = u.toLowerCase() + "_";
                    checkID(u.toLowerCase(), function (a) {
                        id = a;
                        pde = {
                            "Header": "<h1 id='" + id + "'>This is header 1</h1>",
                            "Paragraph": "<p id='" + id + "'>This is a paragraph</p>",
                            "Image": "<img id='" + id +
                                "' src='assets/img/img1x1.jpg' alt='Image title' style='width:100px; height:100px; ' />",
                            "Canvas": "<canvas id='" + id +
                                "' style='width:300px; height:300px; '></canvas>",
                            "SVG": "<svg id='" + id +
                                "' xmlns='http://www.w3.org/2000/svg' style='width:16px; height:16px; ' fill='#333' viewBox='0 0 16 16'><path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/></svg>",
                            "Link": "<a href='##' target='_self' id='" + id + "'>Hyperlink</a>",
                            "List": "<ol id='" + id + "' style=''><li>List item 1</li><li>List item 2</li><li>List item 3</li></ol>"
                        };
                        document.querySelectorAll(".body")[0].innerHTML += (pde[u]);
                        selectLayerAdd(id);
                        showAlert(id + " Created!");

                        if (fit) {
                            fit.classList.remove("select");
                        }
                    });

                }
            }
        }
    }

    document.querySelectorAll(".addnew")[0].onclick = function () {
        document.querySelectorAll(".addnewbox")[0].style.display = "";
    }

    document.querySelectorAll(".addnewbox button")[1].onclick = function () {
        document.querySelectorAll(".addnewbox")[0].style.display = "none";
        let fi = document.querySelectorAll(".addnewbox .item .select")[0];
        if (fi) {
            fi.classList.remove("select");
        }
    }
}

addNewAction();

function highlight(element) {
    let defaultBG = element.style.backgroundColor;
    let defaultBorder = element.style.border;
    let defaultTransition = element.style.transition;
    let defaultScale = element.style.transform;

    element.style.transition = "background 1s";
    element.style.backgroundColor = "#FDFF47";
    element.style.border = "2px dotted #FDFF47";
    element.style.transform = "scale(.8)";

    setTimeout(function () {
        element.style.transform = defaultScale;
        setTimeout(function () {
            element.style.transition = defaultTransition;
            element.style.backgroundColor = defaultBG;
            element.style.border = defaultBorder;
        }, 1000);
    }, 100);
}

function selectLayerView() {
    const fg = document.querySelectorAll("#ctrl-s")[0];
    setInterval(() => {
        if (document.querySelector("#ctrl-s option:checked") && document.querySelectorAll(".body #" + document.querySelector("#ctrl-s option:checked").innerHTML)[0]) {
            selected = document.querySelectorAll(".body #" + document.querySelector(
                    "#ctrl-s option:checked")
                .innerHTML)[0];

            renderDataToAll(selected);
        }
    }, 10);
    fg.onchange = function () {
        highlight(document.querySelectorAll(".body #" + document.querySelector("#ctrl-s option:checked").innerHTML)[0]);
    };
}

selectLayerView();

function selectLayerAdd(x) {
    const ly = document.querySelectorAll("#ctrl-s")[0];
    ly.innerHTML += '<option value="' + x.toLowerCase() + '">' + x + '</option>';
}

function checkID(x, y) {
    document.querySelectorAll(".idset button")[0].onclick = function () {
        let flag = false;
        let oi = document.querySelectorAll("#ctrl-s option");
        for (let m = 0; m < oi.length; m++) {
            if (oi[m].innerHTML == document.querySelectorAll("#idset")[0].value) {
                flag = true;
            }
        }
        if (flag == false) {
            document.querySelectorAll(".idset")[0].style.display = "none";
            return y(document.querySelectorAll("#idset")[0].value);
        } else {
            setTimeout(() => {
                showAlert("Current ID is already available!");
            }, 1000);
        }
    }
}


function showAlert(a) {
    var x = document.getElementById("snackbar");
    x.style.display = "";
    x.className = "show";
    x.innerHTML = a;
    setTimeout(function () {
        x.style.display = "none";
    }, 1000);
}


document.querySelectorAll("#header_s")[0].onchange = function () {
    var size = ["32px", "24px", "18.72px", "16px", "13.28px", "10.72px"];
    var d = document.querySelectorAll("#header_s option:checked")[0].value;
    selected.style.fontSize = size[d];
}

/*************/

function buttonAction0() {
    document.querySelectorAll(".edit_property")[0].style.display = "";
    setInterval(() => {
        if (selected.nodeName == "H1") {
            buttonAction0_part(0);
        } else if (selected.nodeName == "IMG") {
            buttonAction0_part(1);
        } else if (selected.nodeName == "svg") {
            buttonAction0_part(2);
        } else if (selected.nodeName == "A") {
            buttonAction0_part(3);
        } else if (selected.nodeName == "OL") {
            buttonAction0_part(4);
        } else {
            document.querySelectorAll(".edit_property")[0].style.display = "none";
        }
    }, 100);

    document.querySelectorAll(".edit_style")[0].style.display = "none";
    document.querySelectorAll(".edit_color")[0].style.display = "none";
}

function buttonAction0_part(i) {
    let ii = document.querySelectorAll(".edit_property .abc")[i];
    if (ii) ii.style.display = "";
    for (let hj = 0; hj < document.querySelectorAll(".edit_property .abc").length; hj++) {
        if (hj != i) document.querySelectorAll(".edit_property .abc")[hj].style.display = "none";
    }
}

function buttonAction1() {
    document.querySelectorAll(".edit_style")[0].style.display = "";
    document.querySelectorAll(".edit_color")[0].style.display = "none";
    document.querySelectorAll(".edit_property")[0].style.display = "none";
}

function buttonAction4() {
    document.querySelectorAll(".edit_color")[0].style.display = "";
    document.querySelectorAll(".edit_style")[0].style.display = "none";
    document.querySelectorAll(".edit_property")[0].style.display = "none";
}

Coloris({
    el: '.color-plbox3',
    swatches: [
        '#264653',
        '#2a9d8f',
        '#e9c46a',
        '#f4a261',
        '#e76f51',
        '#d62828',
        '#023e8a',
        '#0077b6',
        '#0096c7',
        '#00b4d8',
        '#48cae4'
    ]
});

document.querySelectorAll("#chng1")[0].onclick = function () {
    selected.style.backgroundColor = document.querySelectorAll(".color-plbox3")[0].value;
};

document.querySelectorAll("#chng2")[0].onclick = function () {
    selected.style.color = document.querySelectorAll(".color-plbox3")[0].value;
};

/*****************************/

function renderDataToAll(a) {
    /* header */
    if (selected.nodeName == "H1") {
        if (selected.style.fontSize == "32px" || selected.style.fontSize ==
            "24px" || selected.style.fontSize == "18.72px" || selected.style
            .fontSize == "16px" || selected.style.fontSize == "13.28px" || selected
            .style.fontSize == "10.72px") {
            switch (selected.style.fontSize) {
                case "32px":
                    document.querySelectorAll("#header_s option")[0].selected =
                        "selected";
                    break;
                case "24px":
                    document.querySelectorAll("#header_s option")[1].selected =
                        "selected";
                    break;
                case "18.72px":
                    document.querySelectorAll("#header_s option")[2].selected =
                        "selected";
                    break;
                case "16px":
                    document.querySelectorAll("#header_s option")[3].selected =
                        "selected";
                    break;
                case "13.28px":
                    document.querySelectorAll("#header_s option")[4].selected =
                        "selected";
                    break;
                case "10.72px":
                    document.querySelectorAll("#header_s option")[5].selected =
                        "selected";
                    break;

                default:
                    break;
            }
        } else {
            document.querySelectorAll("#header_s option")[0].selected = "selected";
        }
    }
    /* image */
    if (selected.nodeName == "IMG") {
        if (document.querySelectorAll(".abc")[1].querySelectorAll("button")[0].style.display == "") {
            document.querySelectorAll(".abc")[1].querySelectorAll("input")[0].value = selected.src;
        }
        document.querySelectorAll(".abc")[1].querySelectorAll("button")[0].onclick = function () {
            document.querySelectorAll(".abc")[1].querySelectorAll("button")[0].style.display = "none";
            document.querySelectorAll(".abc")[1].querySelectorAll("button")[1].style.display = "";
            document.querySelectorAll(".abc")[1].querySelectorAll("input")[0].disabled = "";
            document.querySelectorAll(".abc")[1].querySelectorAll("input")[0].focus();
        };
        document.querySelectorAll(".abc")[1].querySelectorAll("button")[1].onclick = function () {
            selected.src = document.querySelectorAll(".abc")[1].querySelectorAll("input")[0].value;
            document.querySelectorAll(".abc")[1].querySelectorAll("button")[0].style.display = "";
            document.querySelectorAll(".abc")[1].querySelectorAll("button")[1].style.display = "none";
            document.querySelectorAll(".abc")[1].querySelectorAll("input")[0].disabled = "true";
        };

        if (document.querySelectorAll(".abc")[1].querySelectorAll("button")[2].style.display == "") {
            document.querySelectorAll(".abc")[1].querySelectorAll("input")[1].value = selected.alt;
        }
        document.querySelectorAll(".abc")[1].querySelectorAll("button")[2].onclick = function () {
            document.querySelectorAll(".abc")[1].querySelectorAll("button")[2].style.display = "none";
            document.querySelectorAll(".abc")[1].querySelectorAll("button")[3].style.display = "";
            document.querySelectorAll(".abc")[1].querySelectorAll("input")[1].disabled = "";
            document.querySelectorAll(".abc")[1].querySelectorAll("input")[1].focus();
        };
        document.querySelectorAll(".abc")[1].querySelectorAll("button")[3].onclick = function () {
            selected.alt = document.querySelectorAll(".abc")[1].querySelectorAll("input")[1].value;
            document.querySelectorAll(".abc")[1].querySelectorAll("button")[2].style.display = "";
            document.querySelectorAll(".abc")[1].querySelectorAll("button")[3].style.display = "none";
            document.querySelectorAll(".abc")[1].querySelectorAll("input")[1].disabled = "true";
        };
    }
    /* svg */
    if (selected.nodeName == "svg") {
        if (document.querySelectorAll(".abc")[2].querySelectorAll("button")[0].style.display == "") {
            document.querySelectorAll(".abc")[2].querySelectorAll("input")[0].value = selected.attributes.viewBox.value;
        }
        document.querySelectorAll(".abc")[2].querySelectorAll("button")[0].onclick = function () {
            document.querySelectorAll(".abc")[2].querySelectorAll("button")[0].style.display = "none";
            document.querySelectorAll(".abc")[2].querySelectorAll("button")[1].style.display = "";
            document.querySelectorAll(".abc")[2].querySelectorAll("input")[0].disabled = "";
            document.querySelectorAll(".abc")[2].querySelectorAll("input")[0].focus();
        };
        document.querySelectorAll(".abc")[2].querySelectorAll("button")[1].onclick = function () {
            selected.attributes.viewBox.value = document.querySelectorAll(".abc")[2].querySelectorAll("input")[0].value;
            document.querySelectorAll(".abc")[2].querySelectorAll("button")[0].style.display = "";
            document.querySelectorAll(".abc")[2].querySelectorAll("button")[1].style.display = "none";
            document.querySelectorAll(".abc")[2].querySelectorAll("input")[0].disabled = "true";
        };

        if (document.querySelectorAll(".abc")[2].querySelectorAll("button")[2].style.display == "") {
            document.querySelectorAll(".abc")[2].querySelectorAll("input")[1].value = selected.attributes.fill.nodeValue;
        }
        document.querySelectorAll(".abc")[2].querySelectorAll("button")[2].onclick = function () {
            document.querySelectorAll(".abc")[2].querySelectorAll("button")[2].style.display = "none";
            document.querySelectorAll(".abc")[2].querySelectorAll("button")[3].style.display = "";
            document.querySelectorAll(".abc")[2].querySelectorAll("input")[1].disabled = "";
            document.querySelectorAll(".abc")[2].querySelectorAll("input")[1].focus();
        };
        document.querySelectorAll(".abc")[2].querySelectorAll("button")[3].onclick = function () {
            selected.attributes.fill.nodeValue = document.querySelectorAll(".abc")[2].querySelectorAll("input")[1].value;
            document.querySelectorAll(".abc")[2].querySelectorAll("button")[2].style.display = "";
            document.querySelectorAll(".abc")[2].querySelectorAll("button")[3].style.display = "none";
            document.querySelectorAll(".abc")[2].querySelectorAll("input")[1].disabled = "true";
        };

        if (document.querySelectorAll(".abc")[2].querySelectorAll("button")[4].style.display == "") {
            document.querySelectorAll(".abc")[2].querySelectorAll("textarea")[0].value = selected.innerHTML;
        }
        document.querySelectorAll(".abc")[2].querySelectorAll("button")[4].onclick = function () {
            document.querySelectorAll(".abc")[2].querySelectorAll("button")[4].style.display = "none";
            document.querySelectorAll(".abc")[2].querySelectorAll("button")[5].style.display = "";
            document.querySelectorAll(".abc")[2].querySelectorAll("textarea")[0].disabled = "";
            document.querySelectorAll(".abc")[2].querySelectorAll("textarea")[0].focus();
        };
        document.querySelectorAll(".abc")[2].querySelectorAll("button")[5].onclick = function () {
            selected.innerHTML = document.querySelectorAll(".abc")[2].querySelectorAll("textarea")[0].value;
            document.querySelectorAll(".abc")[2].querySelectorAll("button")[4].style.display = "";
            document.querySelectorAll(".abc")[2].querySelectorAll("button")[5].style.display = "none";
            document.querySelectorAll(".abc")[2].querySelectorAll("textarea")[0].disabled = "true";
        };
    }
    /* link */
    if (selected.nodeName == "A") {
        if (document.querySelectorAll(".abc")[3].querySelectorAll("button")[0].style.display == "") {
            document.querySelectorAll(".abc")[3].querySelectorAll("input")[0].value = selected.href;
        }
        document.querySelectorAll(".abc")[3].querySelectorAll("button")[0].onclick = function () {
            document.querySelectorAll(".abc")[3].querySelectorAll("button")[0].style.display = "none";
            document.querySelectorAll(".abc")[3].querySelectorAll("button")[1].style.display = "";
            document.querySelectorAll(".abc")[3].querySelectorAll("input")[0].disabled = "";
            document.querySelectorAll(".abc")[3].querySelectorAll("input")[0].focus();
        };
        document.querySelectorAll(".abc")[3].querySelectorAll("button")[1].onclick = function () {
            selected.href = document.querySelectorAll(".abc")[3].querySelectorAll("input")[0].value;
            document.querySelectorAll(".abc")[3].querySelectorAll("button")[0].style.display = "";
            document.querySelectorAll(".abc")[3].querySelectorAll("button")[1].style.display = "none";
            document.querySelectorAll(".abc")[3].querySelectorAll("input")[0].disabled = "true";
        };

        if (document.querySelectorAll(".abc")[3].querySelectorAll("button")[2].style.display == "") {
            document.querySelectorAll(".abc")[3].querySelectorAll("input")[1].value = selected.target;
        }
        document.querySelectorAll(".abc")[3].querySelectorAll("button")[2].onclick = function () {
            document.querySelectorAll(".abc")[3].querySelectorAll("button")[2].style.display = "none";
            document.querySelectorAll(".abc")[3].querySelectorAll("button")[3].style.display = "";
            document.querySelectorAll(".abc")[3].querySelectorAll("input")[1].disabled = "";
            document.querySelectorAll(".abc")[3].querySelectorAll("input")[1].focus();
        };
        document.querySelectorAll(".abc")[3].querySelectorAll("button")[3].onclick = function () {
            selected.target = document.querySelectorAll(".abc")[3].querySelectorAll("input")[1].value;
            document.querySelectorAll(".abc")[3].querySelectorAll("button")[2].style.display = "";
            document.querySelectorAll(".abc")[3].querySelectorAll("button")[3].style.display = "none";
            document.querySelectorAll(".abc")[3].querySelectorAll("input")[1].disabled = "true";
        };
    }
    /* list */
    if (selected.nodeName == "OL") {
        if (document.querySelectorAll(".abc")[4].querySelectorAll("button")[0].style.display == "") {
            document.querySelectorAll(".abc")[4].querySelectorAll("select option")[(selected.style.listStyleType != "circle" ? "0" : "1")].selected;
        }
        document.querySelectorAll(".abc")[4].querySelectorAll("button")[0].onclick = function () {
            document.querySelectorAll(".abc")[4].querySelectorAll("button")[0].style.display = "none";
            document.querySelectorAll(".abc")[4].querySelectorAll("button")[1].style.display = "";
            document.querySelectorAll(".abc")[4].querySelectorAll("select")[0].disabled = "";
            document.querySelectorAll(".abc")[4].querySelectorAll("select")[0].focus();
        };
        document.querySelectorAll(".abc")[4].querySelectorAll("button")[1].onclick = function () {
            if (document.querySelectorAll(".abc")[4].querySelectorAll("select option")[1].selected) {
                selected.style.listStyleType = "circle";
            } else {
                selected.style.removeProperty('list-style-type');
            }
            document.querySelectorAll(".abc")[4].querySelectorAll("button")[0].style.display = "";
            document.querySelectorAll(".abc")[4].querySelectorAll("button")[1].style.display = "none";
            document.querySelectorAll(".abc")[4].querySelectorAll("select")[0].disabled = "true";
        };

        if (document.querySelectorAll(".abc")[4].querySelectorAll("button")[2].style.display == "") {
            for (let gh = 0; gh < document.querySelectorAll(".abc")[4].querySelectorAll("select option").length; gh++) {
                if (document.querySelectorAll(".abc")[4].querySelectorAll("select option")[gh].value == (typeof selected.type !== "undefined" ? selected.type : "1")) {
                    document.querySelectorAll(".abc")[4].querySelectorAll("select option")[gh].selected;
                }
            }
            document.querySelectorAll(".abc")[4].querySelectorAll("select option:checked")[1].value = selected.type;
        }
        document.querySelectorAll(".abc")[4].querySelectorAll("button")[2].onclick = function () {
            document.querySelectorAll(".abc")[4].querySelectorAll("button")[2].style.display = "none";
            document.querySelectorAll(".abc")[4].querySelectorAll("button")[3].style.display = "";
            document.querySelectorAll(".abc")[4].querySelectorAll("select")[1].disabled = "";
            document.querySelectorAll(".abc")[4].querySelectorAll("select")[1].focus();
        };
        document.querySelectorAll(".abc")[4].querySelectorAll("button")[3].onclick = function () {
            selected.type = document.querySelectorAll(".abc")[4].querySelectorAll("select option:checked")[1].innerHTML;
            document.querySelectorAll(".abc")[4].querySelectorAll("button")[2].style.display = "";
            document.querySelectorAll(".abc")[4].querySelectorAll("button")[3].style.display = "none";
            document.querySelectorAll(".abc")[4].querySelectorAll("select")[1].disabled = "true";
        };
    }
    /***********/
    if (selected) {
        if (document.querySelectorAll(".abc .styles")[0].querySelectorAll("button")[0].style.display == "") {

            document.querySelectorAll(".abc .styles")[0].querySelectorAll("input")[0].value = (selected.style.width != "" ? selected.style.width : "0");

            document.querySelectorAll(".abc .styles")[0].querySelectorAll("pre")[0].innerHTML = document.querySelectorAll(".abc .styles")[0].querySelectorAll("input")[0].value;

        }

        document.querySelectorAll(".abc .styles")[0].querySelectorAll("section")[0].onclick = function () {
            selected.style.removeProperty('width');
        };

        document.querySelectorAll(".abc .styles")[0].querySelectorAll("input")[0].oninput = function () {
            document.querySelectorAll(".abc .styles")[0].querySelectorAll("pre")[0].innerHTML = document.querySelectorAll(".abc .styles")[0].querySelectorAll("input")[0].value;
            selected.style.width = document.querySelectorAll(".abc .styles")[0].querySelectorAll("input")[0].value;
        }

        document.querySelectorAll(".abc .styles")[0].querySelectorAll("button")[0].onclick = function () {
            document.querySelectorAll(".abc .styles")[0].querySelectorAll("button")[0].style.display = "none";
            document.querySelectorAll(".abc .styles")[0].querySelectorAll("button")[1].style.display = "";
            document.querySelectorAll(".abc .styles")[0].querySelectorAll("input")[0].disabled = "";
            document.querySelectorAll(".abc .styles")[0].querySelectorAll("input")[0].focus();
        };
        document.querySelectorAll(".abc .styles")[0].querySelectorAll("button")[1].onclick = function () {
            selected.style.width = document.querySelectorAll(".abc .styles")[0].querySelectorAll("input")[0].value;
            document.querySelectorAll(".abc .styles")[0].querySelectorAll("button")[0].style.display = "";
            document.querySelectorAll(".abc .styles")[0].querySelectorAll("button")[1].style.display = "none";
            document.querySelectorAll(".abc .styles")[0].querySelectorAll("input")[0].disabled = "true";
        };

        if (document.querySelectorAll(".abc .styles")[1].querySelectorAll("button")[0].style.display == "") {

            document.querySelectorAll(".abc .styles")[1].querySelectorAll("input")[0].value = (selected.style.height != "" ? selected.style.height : "0");

            document.querySelectorAll(".abc .styles")[1].querySelectorAll("pre")[0].innerHTML = document.querySelectorAll(".abc .styles")[1].querySelectorAll("input")[0].value;

        }

        document.querySelectorAll(".abc .styles")[1].querySelectorAll("section")[0].onclick = function () {
            selected.style.removeProperty('height');
        };

        document.querySelectorAll(".abc .styles")[1].querySelectorAll("input")[0].oninput = function () {
            document.querySelectorAll(".abc .styles")[1].querySelectorAll("pre")[0].innerHTML = document.querySelectorAll(".abc .styles")[1].querySelectorAll("input")[0].value;
            selected.style.height = document.querySelectorAll(".abc .styles")[1].querySelectorAll("input")[0].value;
        }

        document.querySelectorAll(".abc .styles")[1].querySelectorAll("button")[0].onclick = function () {
            document.querySelectorAll(".abc .styles")[1].querySelectorAll("button")[0].style.display = "none";
            document.querySelectorAll(".abc .styles")[1].querySelectorAll("button")[1].style.display = "";
            document.querySelectorAll(".abc .styles")[1].querySelectorAll("input")[0].disabled = "";
            document.querySelectorAll(".abc .styles")[1].querySelectorAll("input")[0].focus();
        };
        document.querySelectorAll(".abc .styles")[1].querySelectorAll("button")[1].onclick = function () {
            selected.style.height = document.querySelectorAll(".abc .styles")[1].querySelectorAll("input")[0].value;
            document.querySelectorAll(".abc .styles")[1].querySelectorAll("button")[0].style.display = "";
            document.querySelectorAll(".abc .styles")[1].querySelectorAll("button")[1].style.display = "none";
            document.querySelectorAll(".abc .styles")[1].querySelectorAll("input")[0].disabled = "true";
        };
        /***/
        if (document.querySelectorAll(".abc .styles")[2].querySelectorAll("button")[0].style.display == "") {

            document.querySelectorAll(".abc .styles")[2].querySelectorAll("input")[0].value = (selected.style.margin != "" ? selected.style.margin : "0");

            document.querySelectorAll(".abc .styles")[2].querySelectorAll("pre")[0].innerHTML = document.querySelectorAll(".abc .styles")[2].querySelectorAll("input")[0].value;

        }

        document.querySelectorAll(".abc .styles")[2].querySelectorAll("section")[0].onclick = function () {
            selected.style.removeProperty('margin');
        };

        document.querySelectorAll(".abc .styles")[2].querySelectorAll("input")[0].oninput = function () {
            document.querySelectorAll(".abc .styles")[2].querySelectorAll("pre")[0].innerHTML = document.querySelectorAll(".abc .styles")[2].querySelectorAll("input")[0].value;
            selected.style.margin = document.querySelectorAll(".abc .styles")[2].querySelectorAll("input")[0].value;
        }

        document.querySelectorAll(".abc .styles")[2].querySelectorAll("button")[0].onclick = function () {
            document.querySelectorAll(".abc .styles")[2].querySelectorAll("button")[0].style.display = "none";
            document.querySelectorAll(".abc .styles")[2].querySelectorAll("button")[1].style.display = "";
            document.querySelectorAll(".abc .styles")[2].querySelectorAll("input")[0].disabled = "";
            document.querySelectorAll(".abc .styles")[2].querySelectorAll("input")[0].focus();
        };
        document.querySelectorAll(".abc .styles")[2].querySelectorAll("button")[1].onclick = function () {
            selected.style.margin = document.querySelectorAll(".abc .styles")[2].querySelectorAll("input")[0].value;
            document.querySelectorAll(".abc .styles")[2].querySelectorAll("button")[0].style.display = "";
            document.querySelectorAll(".abc .styles")[2].querySelectorAll("button")[1].style.display = "none";
            document.querySelectorAll(".abc .styles")[2].querySelectorAll("input")[0].disabled = "true";
        };

        if (document.querySelectorAll(".abc .styles")[3].querySelectorAll("button")[0].style.display == "") {

            document.querySelectorAll(".abc .styles")[3].querySelectorAll("input")[0].value = (selected.style.padding != "" ? selected.style.padding : "0");

            document.querySelectorAll(".abc .styles")[3].querySelectorAll("pre")[0].innerHTML = document.querySelectorAll(".abc .styles")[3].querySelectorAll("input")[0].value;

        }

        document.querySelectorAll(".abc .styles")[3].querySelectorAll("section")[0].onclick = function () {
            selected.style.removeProperty('padding');
        };

        document.querySelectorAll(".abc .styles")[3].querySelectorAll("input")[0].oninput = function () {
            document.querySelectorAll(".abc .styles")[3].querySelectorAll("pre")[0].innerHTML = document.querySelectorAll(".abc .styles")[3].querySelectorAll("input")[0].value;
            selected.style.padding = document.querySelectorAll(".abc .styles")[3].querySelectorAll("input")[0].value;
        }

        document.querySelectorAll(".abc .styles")[3].querySelectorAll("button")[0].onclick = function () {
            document.querySelectorAll(".abc .styles")[3].querySelectorAll("button")[0].style.display = "none";
            document.querySelectorAll(".abc .styles")[3].querySelectorAll("button")[1].style.display = "";
            document.querySelectorAll(".abc .styles")[3].querySelectorAll("input")[0].disabled = "";
            document.querySelectorAll(".abc .styles")[3].querySelectorAll("input")[0].focus();
        };
        document.querySelectorAll(".abc .styles")[3].querySelectorAll("button")[1].onclick = function () {
            selected.style.padding = document.querySelectorAll(".abc .styles")[3].querySelectorAll("input")[0].value;
            document.querySelectorAll(".abc .styles")[3].querySelectorAll("button")[0].style.display = "";
            document.querySelectorAll(".abc .styles")[3].querySelectorAll("button")[1].style.display = "none";
            document.querySelectorAll(".abc .styles")[3].querySelectorAll("input")[0].disabled = "true";
        };

    }

}

/*************************************/


function DownloadFile(name, value, blobs) {
    let DownloadName = name;
    let text = value;
    text = text.replace(/\n/g, "\r\n");
    let blob = new Blob([text], {
        type: blobs // text/plain
    });
    let anchor = document.createElement("a");
    anchor.download = DownloadName;
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = "_blank";
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}

document.querySelectorAll(".main .headbar .left button")[0].onclick = function () {
    DownloadFile("webshop-19032.html", document.querySelectorAll(".body")[0].innerHTML, "text/html");
}