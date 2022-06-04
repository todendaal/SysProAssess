

var currentBlockID = 11;
var CurrentStructure = "";
var LastStructure = "";
var CurrentDirection = 90;
var LastAction = "";
var SMokeOn = false;
var startAction = true; 

var ActionLst = new Array();
ActionLst[0] = "45L";
ActionLst[1] = "F1";
ActionLst[2] = "45R";
ActionLst[3] = "90L";
ActionLst[4] = "";
ActionLst[5] = "90R";
ActionLst[6] = "135L";
ActionLst[7] = "180";
ActionLst[8] = "135R";
ActionLst[9] = "ON";
ActionLst[10] = "OFF";

function brnClick(ActionID) {
    LastStructure = CurrentStructure;
    txtPath += "," + ActionLst[ActionID];
    if (ActionID == 0) {CurrentDirection = CurrentDirection - 45;}
    if (ActionID == 2) { CurrentDirection = CurrentDirection + 45; }
    if (ActionID == 3) { CurrentDirection = CurrentDirection - 90; }
    if (ActionID == 5) { CurrentDirection = CurrentDirection + 90; }
    if (ActionID == 6) { CurrentDirection = CurrentDirection - 135; }
    if (ActionID == 7) { CurrentDirection = CurrentDirection - 180; }
    if (ActionID == 8) { CurrentDirection = CurrentDirection + 135; }

    if (CurrentDirection < 0) { CurrentDirection = 360 + CurrentDirection; };
    if (CurrentDirection >= 360) { CurrentDirection = 360 - CurrentDirection; }
    //CurrentStructure += "," + ActionLst[ActionID]; LastAction = 0;

    

    if (ActionID == 1) {
        if (CurrentDirection == 0) { currentBlockID = currentBlockID  - 30; }
        if (CurrentDirection == 90) { currentBlockID = currentBlockID + 1; }
        if (CurrentDirection == 180) { currentBlockID = currentBlockID + 30; }
        if (CurrentDirection == 270) { currentBlockID = currentBlockID - 1; }

        if (CurrentDirection == 45) { currentBlockID = currentBlockID - 30 + 1; }
        if (CurrentDirection == 135) { currentBlockID = currentBlockID + 30 + 1; }
        if (CurrentDirection == 225) { currentBlockID = currentBlockID + 30 - 1; }
        if (CurrentDirection == 315) { currentBlockID = currentBlockID - 30 - 1; }

        $(".stanBox").removeClass("currentPlace");
        

        LastAction = 1;
    }

    if (ActionID != 4) {
        if (CurrentStructure != "") {
            CurrentStructure += "," + ActionLst[ActionID];
        }
        else {
            CurrentStructure += ActionLst[ActionID];
        }
        
        $("#txtPath").html(CurrentStructure);
    }

    if (ActionID == 4) {
        if (!SMokeOn)
        {
            SMokeOn = true; $("#btnSmoke").removeClass("btn-primary");
            $("#btnSmoke").addClass("btn-success"); CurrentStructure += ",ON";
            $("#txtPath").html(CurrentStructure);
        }
        else
        {
            SMokeOn = false; $("#btnSmoke").addClass("btn-primary");
            $("#btnSmoke").removeClass("btn-success"); CurrentStructure += ",OFF";
            $("#txtPath").html(CurrentStructure);
        }
    }

    var newPlace = "#b_" + currentBlockID;
    $(newPlace).addClass("currentPlace");
    if (SMokeOn) {
        $(newPlace).addClass("smokePlace");
    }
    
    fixText_F();

    $("#txtCurrentBox").val(currentBlockID);
    $("#txtCurrentDirection").val(CurrentDirection);
}

function fixText_F() {
    var fixtext = $("#txtPath").html();
    for (var i = 0; i < 100; i++) {
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F10,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1", "F9,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,", "F8,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,", "F7,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,", "F6,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,", "F5,");
        fixtext = fixtext.replace("F1,F1,F1,F1,", "F4,");
        fixtext = fixtext.replace("F1,F1,F1,", "F3,");
        fixtext = fixtext.replace("F1,F1,", "F2,");
    }
    $("#txtPath").html(fixtext);
    var counterofChars = fixtext.length;
    $("#charcounter").html("Chars=" + counterofChars);
}

if (startAction) {
    $("#b_11").addClass("currentPlace");
    startAction = false;
}