function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


function user(id, fname, lname, dob, Idnr) {
    this.Id = id;
    this.FirstName = fname;
    this.LastName = lname;
    this.DateOfBirth = dob;
    this.IDNumber = Idnr;
    this.ProfilePicURL = '';
    this.RoleID = '';
    this.StatusId = '';
    this.StatusDate = Date.now();
}

function role(id, rname, rrate) {
    this.Id = id;
    this.RoleName = rname;
    this.RoleRate = rrate;
    return this;
}

var listOfRoles = [];
var listOfStatus = [];
var listOfUsers = [];
var listOfTasks = [];

var UserInProgress;
var RoleInProgress;
var TaskInProgress;

function getAllTasks() {
    var ApiStr = '/api/worktasks/alltasks';
    $.getJSON(ApiStr, function (json) {
        for (var key in json) {
            var value = json[key];
            if (typeof value == 'object') {
                var objx = {};
                objx.id = value.id;
                objx.name = value.name;
                objx.UserTasks = "[]";
                listOfTasks.push(objx);
            }
        }
    });
}

function getAllRoles() {
    var ApiStr = '/api/userroles/allroles';
    $.getJSON(ApiStr, function (json) {
        for (var key in json) {
            var value = json[key];
            if (typeof value == 'object') {
                var objx = {};
                objx.id = value.id;
                objx.roleName = value.roleName;
                objx.roleRate = value.roleRate;
                objx.users = "[]";
                listOfRoles.push(objx);
            }
        }
    });
}

function getAllStatus() {
    var ApiStr = '/api/userstatus/allstatus';

    $.getJSON(ApiStr, function (json) {
        for (var key in json) {
            var value = json[key];
            if (typeof value == 'object') {
                var objx = {};
                objx.id = value.id;
                objx.name = value.name;
                objx.orderID = value.orderID;
                listOfStatus.push(objx);
            }
        }
    });
}

function getAllUsers() {
    var ApiStr = 'api/users/allusers';
    $.getJSON(ApiStr, function (json) {
        for (var key in json) {
            var value = json[key];
            if (typeof value == 'object') {
                var objx = { value };
                objx.id = value.id;
                objx.firstName = value.firstName;
                objx.lastName = value.lastName;
                objx.dateOfBirth = value.dateOfBirth;
                objx.idNumber = value.idNumber;
                objx.profilePicURL = value.profilePicURL;
                objx.roleID = value.roleID;
                objx.statusId = value.statusId;
                objx.statusDate = value.statusDate;
                objx.roleName = value.roleName;
                objx.statusName = value.statusName;
                objx.userTasks = "[]";
                listOfUsers.push(objx);
            }
        }
    });
}

getAllRoles();
getAllStatus();
getAllUsers();
getAllTasks();

var selectedUser = "";
var selectedRole = "";
var selectedTask = "";



//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------BEGIN USER FUNCTIONS--------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function resetUsersList_time() {
    $("#editUserForm").hide();
    $("#frmu-firstName").val("");
    $("#frmu-lastName").val("");
    $("#frmu-idNumber").val("");
    $("#frmu-dateOfBirth").val("");
    $("#frmu-statusId").val("");
    setTimeout(resetUsersList, 4000);
}

function resetUsersList() {
    selectedUser = "";
    listOfUsers = [];
    getAllUsers();
    listUsers();
}

function listUsers() {
    UserInProgress = null;
    selectedUser = "";
    var DeletedStatusID = "6c1c6d85-7413-4d8e-94a8-84a794b758c7";

    var ApiStr = '/api/users/allusers';
    $("#usertablist").html("");
    var RoleName = "";
    var StatusName = "";
    $.getJSON(ApiStr, function (json) {
        for (var key in json) {
            var bgClass = "bg-light";
            var value = json[key];
            if (typeof value == 'object') {
                RoleName = listOfRoles.filter(objx => objx.id == value.roleID);
                //StatusName = listOfStatus.filter(objx => objx.id == value.statusId);
                if (value.statusId == DeletedStatusID) { bgClass = "bg-danger text-white"; }
                var htmlContent = "<tr id='userrow-" + value.id + "' class='trUsers " + bgClass + " text-dark'>";
                htmlContent += "<td>" + value.firstName + "</td>";
                htmlContent += "<td>" + value.lastName + "</td>";
                htmlContent += "<td>" + value.dateOfBirth + "</td>";
                htmlContent += "<td>" + value.idNumber + "</td>";
                //htmlContent += "<td>" + RoleName[0].roleName + "-" + StatusName[0].name + "</td>";
                try {
                    htmlContent += "<td>" + RoleName[0].roleName + "</td>";
                }
                catch{
                    htmlContent += "<td>&nbsp;</td>";
                }
                if (value.statusId != DeletedStatusID) {
                    htmlContent += "<td class='text-center'><button type='button' class='btn btn-sm btn-primary'' onclick=\"setselectedUser('" + value.id + "')\"> <i class='fa fa-wrench'></i></button></td>";
                }
                else {
                    htmlContent += "<td class='text-center'><button type='button' class='btn btn-sm btn-light'' > <i class='fa fa-ban'></i></button></td>";
                }
                htmlContent += "</tr>";
                $("#usertablist").append(htmlContent);
            }
        }
    });
}



function setselectedUser(uID) {
    var selectedUser = listOfUsers.filter(objx => objx.id == uID);
    UserInProgress = selectedUser;
    $("#frmu-firstName").val(selectedUser[0].firstName);
    $("#frmu-lastName").val(selectedUser[0].lastName);
    $("#frmu-idNumber").val(selectedUser[0].idNumber);
    $("#frmu-dateOfBirth").val(formatDate(selectedUser[0].dateOfBirth));
    $("#frmu-statusId").val(selectedUser[0].statusId);
    $("#editUserForm").show();

    $("#frmu-roleID").html('');
    listOfRoles.forEach((itm) => {
        $("#frmu-roleID").append(
            $('<option></option>').val(itm.id).html(itm.roleName)
        );
    });

    $("#frmu-roleID").val(selectedUser[0].roleID);
    $(".trUsers").removeClass("bg-warning");
    var selectedrow = "#userrow-" + uID;
    $(selectedrow).removeClass("bg-light");
    $(selectedrow).addClass("bg-warning");
}

function upateSelectedUser(ChangeType) {
    UserInProgress.firstName = $("#frmu-firstName").val();
    UserInProgress.lastName = $("#frmu-lastName").val();
    UserInProgress.dateOfBirth = $("#frmu-dateOfBirth").val();
    UserInProgress.idNumber = $("#frmu-idNumber").val();
    UserInProgress.roleID = $("#frmu-roleID").val();
    UserInProgress.userTasks = [];

    UserInProgress[0].firstName = $("#frmu-firstName").val();
    UserInProgress[0].lastName = $("#frmu-lastName").val();
    UserInProgress[0].dateOfBirth = $("#frmu-dateOfBirth").val();
    UserInProgress[0].idNumber = $("#frmu-idNumber").val();
    UserInProgress[0].roleID = $("#frmu-roleID").val();
    UserInProgress[0].userTasks = [];


    var ApiStr = '/api/users/update';
    if (ChangeType == 100) {
        ApiStr = '/api/users/dismissuser';
    }
    else if (UserInProgress[0].id == "00000000-0000-0000-0000-000000000000") {
        ApiStr = '/api/users/addnewuser';
    }
    $.ajax({
        type: "POST",
        data: JSON.stringify(UserInProgress[0]),
        url: ApiStr,
        contentType: "application/json",
        success: resetUsersList_time()
    });
}

function cancelUserEdit() {
    resetUsersList_time();
}

function addNewUser() {
    var objx = {};
    objx.id = "00000000-0000-0000-0000-000000000000";
    objx.firstName = "";
    objx.lastName = "";
    objx.dateOfBirth = "";
    objx.idNumber = "";
    objx.profilePicURL = "";
    objx.roleID = "00000000-0000-0000-0000-000000000000";
    objx.statusId = "00000000-0000-0000-0000-000000000000";
    objx.statusDate = Date.now;
    objx.roleName = "";
    objx.statusName = "";
    objx.userTasks = "[]";
    listOfUsers.push(objx);
    setselectedUser(objx.id);
}

listUsers();

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------END USER FUNCTIONS--------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------




















//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------BEGIN ROLE FUNCTIONS--------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

function listRoles() {
    RoleInProgress = null;
    selectedRole = "";

    var DeletedStatusID = "6c1c6d85-7413-4d8e-94a8-84a794b758c7";
    var ApiStr = '/api/userroles/allroles';
    $("#roletablist").html("");
    var RoleName = "";
    var StatusName = "";
    $.getJSON(ApiStr, function (json) {
        for (var key in json) {
            var bgClass = "bg-light";
            var value = json[key];
            if (typeof value == 'object') {
                var htmlContent = "<tr id='rolerow-" + value.id + "' class='trRoles " + bgClass + " text-dark'>";
                htmlContent += "<td>" + value.roleName + "</td>";
                htmlContent += "<td>R " + value.roleRate + " / hour</td>";
                if (value.statusId != DeletedStatusID) {
                    htmlContent += "<td class='text-center'><button type='button' class='btn btn-sm btn-primary'' onclick=\"setselectedRole('" + value.id + "')\"> <i class='fa fa-wrench'></i></button></td></tr>";
                }
                else {
                    htmlContent += "<td class='text-center'><button type='button' class='btn btn-sm btn-light'' > <i class='fa fa-ban'></i></button></td></tr>";
                }
                $("#roletablist").append(htmlContent);
            }
        }
    });
}

function setselectedRole(rID) {
    var selectedRole = listOfRoles.filter(objx => objx.id == rID);
    console.log("listOfRoles");
    console.log(listOfRoles);
    console.log(selectedRole);
    RoleInProgress = selectedRole;
    $("#frmu-roleName").val(selectedRole[0].roleName);
    $("#frmu-roleRate").val(selectedRole[0].roleRate);
    $("#editRoleForm").show();
    $(".trRoles").removeClass("bg-warning");
    var selectedrow = "#rolerow-" + rID;
    $(selectedrow).removeClass("bg-light");
    $(selectedrow).addClass("bg-warning");
}

function upateSelectedRole(ChangeType) {
    RoleInProgress.roleName = $("#frmu-roleName").val();
    RoleInProgress.roleRate = $("#frmu-roleRate").val();
    RoleInProgress.users = [];

    RoleInProgress[0].roleName = $("#frmu-roleName").val();
    RoleInProgress[0].roleRate = $("#frmu-roleRate").val();
    RoleInProgress[0].users = [];


    var ApiStr = '/api/userroles/update';
    if (ChangeType == 100) {
        ApiStr = '/api/userroles/dismissrole';
    }
    else if (RoleInProgress[0].id == "00000000-0000-0000-0000-000000000000") {
        ApiStr = '/api/userroles/addnewrole';
    }

    console.log("RoleInProgress[0]");
    console.log(RoleInProgress[0]);

    $.ajax({
        type: "POST",
        data: JSON.stringify(RoleInProgress[0]),
        url: ApiStr,
        contentType: "application/json",
        success: resetRoleList_time()
    });
}

function resetRoleList_time() {
    $("#editRoleForm").hide();
    $("#frmu-roleName").val("");
    $("#frmu-roleRate").val("");
    setTimeout(resetRoleList, 4000);
}

function resetRoleList() {
    selectedUser = "";
    listOfRoles = [];
    getAllRoles();
    listRoles();
}

function addNewRole() {
    var objx = {};
    objx.id = "00000000-0000-0000-0000-000000000000";
    objx.roleName = "";
    objx.roleRate = "";
    objx.users = [];
    listOfRoles.push(objx);
    setselectedRole(objx.id);
}

function cancelRoleEdit() {
    resetRoleList_time();
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------END ROLE FUNCTIONS--------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------



















//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------BEGIN TASK FUNCTIONS--------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

function listTasks() {
    TaskInProgress = null;
    selectedTask = "";

    var DeletedStatusID = "6c1c6d85-7413-4d8e-94a8-84a794b758c7";
    var ApiStr = '/api/worktasks/alltasks';
    $("#tasktablist").html("");
    $.getJSON(ApiStr, function (json) {
        for (var key in json) {
            var bgClass = "bg-light";
            var value = json[key];
            if (typeof value == 'object') {
                var htmlContent = "<tr id='taskrow-" + value.id + "' class='trTasks " + bgClass + " text-dark'>";
                htmlContent += "<td>" + value.name + "</td>";
                if (value.statusId != DeletedStatusID) {
                    htmlContent += "<td class='text-center'><button type='button' class='btn btn-sm btn-primary'' onclick=\"setselectedTask('" + value.id + "')\"> <i class='fa fa-wrench'></i></button></td></tr>";
                }
                else {
                    htmlContent += "<td class='text-center'><button type='button' class='btn btn-sm btn-light'' > <i class='fa fa-ban'></i></button></td></tr>";
                }
                $("#tasktablist").append(htmlContent);
            }
        }
    });


}

function setselectedTask(tID) {
    var selectedTask = listOfTasks.filter(objx => objx.id == tID);
    TaskInProgress = selectedTask;
    $("#frmu-taskname").val(selectedTask[0].name);
    $("#editTaskForm").show();
    $(".trTasks").removeClass("bg-warning");
    var selectedrow = "#taskrow-" + tID;
    $(selectedrow).removeClass("bg-light");
    $(selectedrow).addClass("bg-warning");
}

function upateSelectedTask(ChangeType) {
    TaskInProgress.name = $("#frmu-taskname").val();
    TaskInProgress.UserTasks = [];

    TaskInProgress[0].name = $("#frmu-taskname").val();
    TaskInProgress[0].UserTasks = [];


    var ApiStr = '/api/worktasks/update';
    if (ChangeType == 100) {
        ApiStr = '/api/worktasks/dismissrole';
    }
    else if (TaskInProgress[0].id == "00000000-0000-0000-0000-000000000000") {
        ApiStr = '/api/worktasks/addnewtask';
    }

    $.ajax({
        type: "POST",
        data: JSON.stringify(TaskInProgress[0]),
        url: ApiStr,
        contentType: "application/json",
        success: resetTaskList_time()
    });
}

function resetTaskList_time() {
    $("#editTaskForm").hide();
    $("#frmu-name").val("");
    setTimeout(resetTaskList, 4000);
}

function resetTaskList() {
    selectedTask = "";
    listOfTasks = [];
    getAllTasks();
    listTasks();
}

function addNewTask() {
    var objx = {};
    objx.id = "00000000-0000-0000-0000-000000000000";
    objx.name = "";
    objx.UserTasks = [];
    listOfTasks.push(objx);
    setselectedTask(objx.id);
}

function cancelTaskEdit() {
    resetTaskList_time();
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------END TASKROLE FUNCTIONS--------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------





function listTasksCapture() {
    var DeletedStatusID = "6c1c6d85-7413-4d8e-94a8-84a794b758c7";
    $("#captureHours_error").val('');
    $("#captureHours_div").hide();

    $("#capte_User").html("<option value=''>Please select..</option>");
    listOfUsers.forEach((itm) => {
        if (itm.statusId != DeletedStatusID) {
            $("#capte_User").append(
                $('<option></option>').val(itm.id).html(itm.firstName + " " + itm.lastName)
            );
        }
    });

    $("#capte_Task").html("<option value=''>Please select..</option>");
    listOfTasks.forEach((itm) => {
        if (itm.statusId != DeletedStatusID) {
            $("#capte_Task").append(
                $('<option></option>').val(itm.id).html(itm.name)
            );
        }
    });

    $("#capte_Date").val(formatDate(Date.now()));
}

var MaxHours = 11;
var DaysHours = 0
function captureUserTask() {
    $("#captureHours_error").html('');
    $("#captureHours_div").hide();
    if ((DaysHours + parseInt($("#capte_Hours").val())) > MaxHours) {
        var errmsg = "Maximum of " + MaxHours + " hours allowed daily.<br> Only " + (MaxHours - DaysHours) + " left for this day";
        $("#captureHours_error").html(errmsg);
        $("#captureHours_div").show();
    }
    else {
        $("#userDailyTasks").html("<tr><td colspan='4'>No Intern Selected</td></tr>");
        var _selectedUser = $("#capte_User").val();
        var _selectedTask = $("#capte_Task").val();
        if (_selectedUser != "" && _selectedTask != "") {
            var objx = {};

            var _u = listOfUsers.filter(objx => objx.id == _selectedUser);
            var _r = listOfRoles.filter(objx => objx.id == _u.roleID);
            var _t = listOfTasks.filter(objx => objx.id == _selectedTask);

            objx.id = "00000000-0000-0000-0000-000000000000";
            objx.userID = _selectedUser;
            objx.userRoleID = "00000000-0000-0000-0000-000000000000";
            objx.userRoleName = "n/a";
            objx.taskID = $("#capte_Task").val();
            objx.taskName = "n/a";
            objx.taskDate = $("#capte_Date").val();
            objx.taskDuration = $("#capte_Hours").val();
            objx.hourlyRoleRate = _r.roleRate;

            var ApiStr = '/api/userworktask/addnewusertask';
            $.ajax({
                type: "POST",
                data: JSON.stringify(objx),
                url: ApiStr,
                contentType: "application/json",
                success: setTimeout(resetCaptureForm, 3000)
            });
        }
    }
}

function resetCaptureForm() {
    $("#capte_Task").val('');
    $("#capte_Hours").val('');
    //List Work Done For the day
    populateDaylyTasks();
}

;
function populateDaylyTasks() {
    var DailyHours = 0;
    var DailyTotals = 0;
    DaysHours = 0;

    $("#captureHours_error").html('');
    $("#captureHours_div").hide();

    var ApiStr = '/api/userworktask/allusertasks';
    ApiStr += "/" + $("#capte_User").val();
    ApiStr += "/" + $("#capte_Date").val();
    $("#userDailyTasks").html("");
    $.getJSON(ApiStr, function (json) {
        for (var key in json) {
            var bgClass = "bg-light";
            var value = json[key];
            if (typeof value == 'object') {
                var htmlContent = "<tr id='taskrow-" + value.id + "' class='trTasks " + bgClass + " text-dark'>";
                htmlContent += "<td>" + value.taskName + "</td>";
                htmlContent += "<td>" + value.userRoleName + "</td>";
                htmlContent += "<td>" + value.hourlyRoleRate + "</td>";
                htmlContent += "<td>" + value.taskDuration + "</td>";
                $("#userDailyTasks").append(htmlContent);
                DailyHours += value.taskDuration;
                DailyTotals = value.taskDuration * value.hourlyRoleRate;
            }
        }
        var htmlContent2 = "<tr class='bg-dark text-white border-bottom border-top'>";
        htmlContent2 += "<td colspan='3' class='text-end'><b>TOTAL: R " + DailyTotals + "</b></td>";
        htmlContent2 += "<td><b>(" + DailyHours + " hours)</b></td></tr>";
        DaysHours = DailyHours;
        $("#userDailyTasks").append(htmlContent2);
    });
}