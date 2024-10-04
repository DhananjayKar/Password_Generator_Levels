let textarea = document.querySelector('textarea');

//class to generate passwords
class Generate {
    constructor(name,addition){
        this.name = name;
        this.addData = addition;
    }
    //easy password
    easy() {
        let more = "";
        let easyPassword = "";
        for (let i=1; i<=5; i++) more = more+this.addData[Math.floor(Math.random()*this.addData.length)];
        if (this.name.includes(" ")){
            const space = this.name.lastIndexOf(" ");
            easyPassword = this.name.slice(space+1) + this.name.slice(0, space) + more;
            easyPassword = easyPassword.replace(" ","");
        }
        else {
            let callIntraMethod = new Generate(this.name);
            easyPassword = callIntraMethod.jumble() + more;
        }
        textarea.innerHTML = easyPassword.trim();
    }
    //intermediate password
    inter() {
        let more = "";
        let more1 = "";
        let interPassword = "";
        let reverse = "";
        for (let i=1; i<=5; i++) {
            more = more+this.addData[Math.floor(Math.random()*this.addData.length)];
            more1 = more1+this.addData[Math.floor(Math.random()*this.addData.length)];
        }
        let arrS = this.name.split(" ");
        for (let i = arrS.length-1; i>=0; i--) {
           reverse = reverse + arrS[i];
        }
        interPassword = more + reverse + more1;
        textarea.innerHTML = interPassword.trim();
    }
    //strong password
    strong() {
        let more = "";
        let tempName = this.name.split("");
        let jumbleName = "";
        let strongPassword = "";
        for (let i=1; i<=16; i++) {
            jumbleName = jumbleName + tempName[Math.floor(Math.random()*tempName.length)];
            more = more+this.addData[Math.floor(Math.random()*this.addData.length)];
        }
        jumbleName = jumbleName.replaceAll(" ","@");
        let attach = jumbleName + more;
        attach = attach.split("");
        for (let i=1; i<=attach.length; i++) {
            strongPassword = strongPassword + attach[Math.floor(Math.random()*attach.length)];
        }
        textarea.innerHTML = strongPassword.trim().replaceAll(" ", "#");
    }
    //funny password
    fun() {
        let funnyPassword = "";
        funnyPassword = this.addData[Math.floor(Math.random()*this.addData.length)];
        textarea.innerHTML = funnyPassword;
    } 
    //to jumble the name
    jumble() {
        let password = this.name.split('').sort(() => 0.5 - Math.random()).join('');
        password = password.trim().replaceAll(" ","");
        textarea.innerHTML = password;
        return password;
    }
}

    // to CHECK the CHECKBOXES
const checkbox = () => {
    let char = "";
    if (document.getElementById('upper').checked)
    char += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (document.getElementById('lower').checked)
    char += 'abcdefghijklmnopqrstuvwxyz';
    if (document.getElementById('number').checked)
    char += '0123456789';
    if (document.getElementById('special').checked)
    char += '€¥@$%&^*?!-:#_/';
    return char;
}

// to disable the checkboxes
function funchange (change) {
    let valOfChange = change.options[change.selectedIndex].value;
    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    if (valOfChange === "Funny") {
        checkboxes.forEach((checkbox) => {
            checkbox.disabled = true;
        });
        document.getElementById("hide").style.display = "block";
        document.querySelectorAll("label").forEach((label) => {
            label.style.color = "darkgrey";
        });
    }
    if (valOfChange !== "Funny") {
        checkboxes.forEach((checkbox) => {
            checkbox.disabled = false;
        });
        document.getElementById("hide").style.display = "none";
        document.querySelectorAll("label").forEach((label) => {
            label.style.color = "black";
        });
    }
    }

//array of funny passwords
const funny = ["incorrect","password_is_wrong","123testing","youKnowIt","click_here_for_viruses","connectANDdie","takeItBegger","MyName","GetYourOwnLoser","404NetworkUnavaillable","Loading...","Searching...","Network_not_Found...","Guess"];
const level = document.getElementById('level');

//process after clicking the generate button
document.getElementById('enter').addEventListener('click' , (e) => {
    const userName = document.querySelector("input[type='text']").value. trim(); // getting username
    let checkBox = checkbox();
    e.preventDefault();
    //checking if username entered correctly
    if (userName === "") {
        alert("Please Enter A Valid UserName.");
        window.location.reload();
    }
    if (checkBox === "" || checkBox === undefined) {
        checkBox = " ";
    }
    if(level.value === "Easy") {
        let genPas = new Generate(userName, checkBox.split(''));
        //console.log(checkBox)
        if (checkBox !== " ")
        genPas.easy(); // calling easy method
        else genPas.jumble();
    }
    if(level.value === "Intermediate") {
        let genPas = new Generate(userName, checkBox.split(''));
        if (checkBox === " ")
        genPas.jumble(); // calling inter method
        else genPas.inter();
    }
    if(level.value === "Strong") {
        let genPas = new Generate(userName, checkBox.split(''));
        if (checkBox !== " ")
        genPas.strong(); // calling strong method
        else genPas.jumble();
    }
    if(level.value === "Funny") {
        let genPas = new Generate(userName, funny);
        genPas.fun(); // calling fun method
    }
})

//process after clicking the copy button
document.getElementById('copy').addEventListener('click', (e) => {
        e.preventDefault();
        textarea.select();
        document.execCommand("copy");
        document.getElementById('copy').innerText = "Copied to Clipboard";
        document.getElementById('copy').style.color = "#F7EED3";
    setTimeout(() => {
    document.getElementById('copy').innerText = "Copy Password";
        document.getElementById('copy').style.color = "#FFF8F3";
}, 2000)
    })
