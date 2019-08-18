function matchLunchEvent(input) {
    const startNikki = input[0].start;
    const endNikki = input[0].end;
    let maxOverlap = 0;
    let matchIndex = 0;
    for (let i = 1; i < input.length; i++) {
        let overlap = 0;
        let start = input[i].start;
        let end = input[i].end;
        if (input[i].start > endNikki || input[i].end < startNikki) {
            continue;
        }
        input[i].overlap = 1;
        if (startNikki > start) {
            start = startNikki;
        }
        if (endNikki < end) {
            end = endNikki;
        }
        overlap = end - start;
        if (overlap >= 30) {
            if (overlap == maxOverlap && input[i].start < input[matchIndex].start) {
                matchIndex = i;
            } else if (overlap > maxOverlap) {
                maxOverlap = overlap;
                matchIndex = i;
            }
        }
    }
    input[0].color = matchIndex ? 'green' : 'black';
    input[0].text = "Me";
    for (let i = 1; i < input.length; i++) {
        input[i].text = "Brilliant Lunch";
        input[i].color = (i == matchIndex) ? 'green' : 'cadetblue';
    }
    for (let i = 0; i < input.length; i++) {
        input[i].isColliding = isColliding(i, input);
    }
    let newArr = [...input];
    let newInput = [];
    let output = [];
    while (newArr.length > 0) {
        newInput.push(newArr[0]);
        newArr.splice(0, 1);
        let l = newInput.length - 1;
        for (let i = 0; i < newArr.length; i++) {
            if (newInput[l].end == newArr[i].start) {
                newInput.push(newArr[i]);
                newArr.splice(i, 1);
                l++;
                i = -1;
            }
        }
        output.push(newInput);
        newInput = [];
    }
    output.reverse();
    let text = "";
    for (let i = 0; i < output.length; i++) {
        let ele = output[i].some(x => x.isColliding);
        text += ele ? "<div class='colliding_div' style='margin-top:" + output[i][0].start + "px;'>" :
            "<div class='non_colliding_div' style='margin-top:" + output[i][0].start + "px;'>";
        for (let j = 0; j < output[i].length; j++) {
            text += "<span class='memberName' ><span style='width: 10px;background-color:" + output[i][j].color + "'></span><span class='text' style='color: " + output[i][j].color + "'>" + output[i][j].text + " </span></span>"
        }
        text += "</div>"
    }
    document.getElementById("main_div").innerHTML = text;
}

function isColliding(index, input) {
    let start = input[index].start;
    let end = input[index].end;
    for (let i = 0; i < input.length; i++) {
        if (index != i && start < input[i].end && end > input[i].start) {
            return true;
        }
    }
    return false;
}