

var currentBlockID = 11;
var CurrentStructure = "";
var LastStructure = "";
var CurrentDirection = 90;
var LastAction = "";
var SMokeOn = false;
var startAction = true;
var makeclick = true;

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

    
    if (CurrentDirection < 0) {  CurrentDirection = 360 + CurrentDirection;  };
    if (CurrentDirection >= 360) { CurrentDirection = 360 - CurrentDirection; }
    if (CurrentDirection < 0) { CurrentDirection = CurrentDirection * -1; }

    

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
        $("#txtPath").val(CurrentStructure);
    }

    if (ActionID == 4) {
        if (!SMokeOn)
        {
            SMokeOn = true; $("#btnSmoke").removeClass("btn-primary");
            $("#btnSmoke").addClass("btn-success");
            if (CurrentStructure != "") {
                CurrentStructure += ",ON";
            }
            else {
                CurrentStructure += "ON";
            }
            $("#txtPath").html(CurrentStructure);
        }
        else
        {
            SMokeOn = false; $("#btnSmoke").addClass("btn-primary");
            $("#btnSmoke").removeClass("btn-success");
            if (CurrentStructure != "") {
                CurrentStructure += ",OFF";
            }
            else {
                CurrentStructure += "OFF";
            }
            $("#txtPath").html(CurrentStructure);
        }
    }

    var newPlace = "#b_" + currentBlockID;
    $(newPlace).addClass("currentPlace");
    if (SMokeOn) {
        $(newPlace).addClass("smokePlace");
    }
    
    //fixText_F();

    $("#txtCurrentBox").val(currentBlockID);
    $("#txtCurrentDirection").val(CurrentDirection);

    var imsrc = "/Images/arr" + CurrentDirection + ".png";
    $("#imgDirection").attr("src", imsrc);
}

function fixText_F() {
    var fixtext = $("#txtPath").html();
    for (var i = 0; i < 100; i++) {
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F28,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F27,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F26,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F25,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F24,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F23,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F22,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F21,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F20,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F19,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F18,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F17,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F16,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F15,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F14,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F13,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F12,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F11,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,", "F10,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,F1", "F9,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,F1,", "F8,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,F1,", "F7,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,F1,", "F6,");
        fixtext = fixtext.replace("F1,F1,F1,F1,F1,", "F5,");
        fixtext = fixtext.replace("F1,F1,F1,F1,", "F4,");
        fixtext = fixtext.replace("F1,F1,F1,", "F3,");
        fixtext = fixtext.replace("F1,F1,", "F2,");

        fixtext = fixtext.replace(",,", ",");

        fixtext = fixtext.replace("F2,F2,", "F4,");
        fixtext = fixtext.replace("F3,F3,", "F6,");
        fixtext = fixtext.replace("F4,F4,", "F8,");
        fixtext = fixtext.replace("F5,F5,", "F10,");
        fixtext = fixtext.replace("F6,F6,", "F12,");
        fixtext = fixtext.replace("F7,F7,", "F13,");
        fixtext = fixtext.replace("F8,F8", ",F16,");
        fixtext = fixtext.replace("F9,F9,", ",F18,");

        fixtext = fixtext.replace("F2,F2", "F4");
        fixtext = fixtext.replace("F3,F3", "F6");
        fixtext = fixtext.replace("F4,F4", "F8");
        fixtext = fixtext.replace("F5,F5", "F10");
        fixtext = fixtext.replace("F6,F6", "F12");
        fixtext = fixtext.replace("F7,F7", "F13");
        fixtext = fixtext.replace("F8,F8", ",F16");
        fixtext = fixtext.replace("F9,F9", ",F18");

        fixtext = fixtext.replace("F10,F9,", "F19,");
        fixtext = fixtext.replace("F6,F5,", "F11,");
        fixtext = fixtext.replace("F10,F6,", ",F16,");
        fixtext = fixtext.replace("F9,F4,", "F13,");
        fixtext = fixtext.replace("F11,F4,", "F15,");
        fixtext = fixtext.replace("F11,F2,", "F13,");
        fixtext = fixtext.replace("F15,F7,", "F22,");

        fixtext = fixtext.replace("F2,F1,", "F3,");
        fixtext = fixtext.replace("F3,F1,", "F4,");
        fixtext = fixtext.replace("F4,F1,", "F5,");
        fixtext = fixtext.replace("F5,F1,", "F6,");
        fixtext = fixtext.replace("F6,F1,", "F7,");
        fixtext = fixtext.replace("F7,F1,", "F8,");
        fixtext = fixtext.replace("F8,F1,", "F9,");
        fixtext = fixtext.replace("F9,F1,", "F10,");
        fixtext = fixtext.replace("F10,F1,", "F11,");

        fixtext = fixtext.replace("F2,F1", "F3");
        fixtext = fixtext.replace("F3,F1", "F4");
        fixtext = fixtext.replace("F4,F1", "F5");
        fixtext = fixtext.replace("F5,F1", "F6");
        fixtext = fixtext.replace("F6,F1", "F7");
        fixtext = fixtext.replace("F7,F1", "F8");
        fixtext = fixtext.replace("F8,F1", "F9");
        fixtext = fixtext.replace("F9,F1", "F10");
        fixtext = fixtext.replace("F10,F1", "F11");

        fixtext = fixtext.replace("F2,F1", "F3");
        fixtext = fixtext.replace("F3,F1", "F4");
        fixtext = fixtext.replace("F4,F1", "F5");
        fixtext = fixtext.replace("F5,F1", "F6");
        fixtext = fixtext.replace("F6,F1", "F7");
        fixtext = fixtext.replace("F7,F1", "F8");
        fixtext = fixtext.replace("F8,F1", "F9");
        fixtext = fixtext.replace("F9,F1", "F10");
        fixtext = fixtext.replace("F10,F1", "F11");

        fixtext = fixtext.replace("90R45R,", "135R,");
        fixtext = fixtext.replace("90L45L,", "135L,");
        fixtext = fixtext.replace("45R45R,", "90R,");
        fixtext = fixtext.replace("45L45L,", "90L,");
    }
    $("#txtPath").html(fixtext);
    $("#txtPath").val(fixtext);
    var counterofChars = fixtext.length;
    $("#charcounter").html("Chars=" + counterofChars);
}

if (startAction) {
    $("#b_11").addClass("currentPlace");
    startAction = false;
}







function startAgain() {
    //CurrentStructure
    SMokeOn = false;
    currentBlockID = 11;
    CurrentDirection = 90;
    if (redrawTable())
    {
        $(".stanBox").removeClass("currentPlace");
        $(".stanBox").removeClass("smokePlace");
        $(".currentPlace").removeClass("currentPlace");
        $(".smokePlace").removeClass("smokePlace");
    }
    if (resetCurrentStructure()) {
        const arr = CurrentStructure.split(',');
        setTimeout(loopAgain(arr), 4000);
    }
}

function resetCurrentStructure() {
    //alert(" #txtPath= " + $("#txtPath").val());
    CurrentStructure = $("#txtPath").val();
    var fixtext = $("#txtPath").val();
    var fixtext = CurrentStructure;
    if (clearText()) {
        for (var i = 0; i < 100; i++) {
            fixtext = fixtext.replace("F28,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F27,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F26,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F25,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F24,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F23,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F22,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F21,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F20,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F19,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F18,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F17,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F16,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F15,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F14,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F13,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F12,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F11,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F10,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F9,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F8,", "F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F7,", "F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F6,", "F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F5,", "F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F4,", "F1,F1,F1,F1,");
            fixtext = fixtext.replace("F3,", "F1,F1,F1,");
            fixtext = fixtext.replace("F2,", "F1,F1,");

            fixtext = fixtext.replace("F28,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F27,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F26,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F25,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F24,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F23,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F22,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F21,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F20,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F19,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F18,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F17,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F16,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F15,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F14,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F13,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F12,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F11,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F10,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F9,", "F1,F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F8,", "F1,F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F7,", "F1,F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F6,", "F1,F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F5,", "F1,F1,F1,F1,F1,");
            fixtext = fixtext.replace("F4,", "F1,F1,F1,F1,");
            fixtext = fixtext.replace("F3,", "F1,F1,F1,");
            fixtext = fixtext.replace("F2,", "F1,F1,");
        }
        $("#txtPath").html(fixtext);
        $("#txtPath").val(fixtext);
        CurrentStructure = fixtext;
        var counterofChars = fixtext.length;
        $("#charcounter").html("Chars=" + counterofChars);
        return true;
    }
}

function clearText() {
    $("#txtPath").html('');
    $("#txtPath").val('');
    return true;
}

function redrawTable() {
    alert("redrawTable");
    $("#tableBlocks").html('');
    var htmlContent = "";
    for(var iline = 1; iline <= 90; iline = iline + 3) {
        htmlContent += "<tr class=''>";
            for (var icol = 1; icol <= 30; icol++)
            {
                var itemNr = (iline * 10) + icol;
                var itemID = "b_" +  itemNr;
                if(itemNr==11)
                {
                    htmlContent += "<td class='stanBox currentPlace border-1 border-top border-start m-0 p-0 border-dark' style='font-size:9px;' id='" + itemID + "'>&nbsp;" + itemNr + "</td>";
                }
                else
                {
                    htmlContent += "<td class='stanBox border-1 border-top border-start m-0 p-0 border-dark' style='font-size:9px;' id='" + itemID + "'>&nbsp;" + itemNr + "</td>";
                }                    
            }
        htmlContent += "</tr>";
    }
    $("#tableBlocks").html(htmlContent);
    return true;
}

function loopAgain(arr) {
    CurrentStructure = "";

    //CurrentStructure = "";
    $("#txtPath").html('');
    $("#txtPath").val('');

    $(".stanBox").removeClass("currentPlace");
    $(".stanBox").removeClass("smokePlace");
    $(".currentPlace").removeClass("currentPlace");
    $(".smokePlace").removeClass("smokePlace");

    currentBlockID = 11;
    var newPlace = "#b_" + currentBlockID;
    $(newPlace).addClass("currentPlace");

    //while ($(newPlace).hasClass("currentPlace")==false) {
        $(".stanBox").removeClass("smokePlace");
        $(".smokePlace").removeClass("smokePlace");
    //}
    //alert("CurrentStructure=" + CurrentStructure);
    //alert("$(#txtPath).html()=" + $("#txtPath").html());
    for (var i = 0; i <= arr.length; i++) {
        //alert(arr[i]);
        setAction(arr[i]);
    }
    //$(newPlace).addClass("currentPlace");
    //for (var i = 0; i < arr.length; i++) {
    //    alert(arr[i]);
    //}
}

function setAction(ActionName) {
    switch (ActionName) {
        case "45L":
            brnClick(0); break;
        case "F1":
            brnClick(1); break;
        case "45R":
            brnClick(2); break;
        case "90L":
            brnClick(3); break;
        case "90R":
            brnClick(5); break;
        case "135L":
            brnClick(6); break;
        case "180":
            brnClick(7); break;
        case "135R":
            brnClick(8); break;
        case "ON":
            brnClick(4); break;
        case "OFF":
            brnClick(4); break;

    }
}


function colorClick(ItemID)
{
    if (makeclick)
    {
        var newPlace = "#" + ItemID;
        if ($(newPlace).hasClass('testPlace'))
        {
            $(newPlace).removeClass("testPlace");
        }
        else {
            $(newPlace).addClass("testPlace");
        }
    }

}