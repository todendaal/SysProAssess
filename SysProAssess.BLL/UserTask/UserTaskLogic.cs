using SysProAssess.DAL.Interfaces;
using SysProAssess.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SysProAssess.BLL.UserTask
{
    public class UserTaskLogic
    {
        private IUser _userfunction = new SysProAssess.DAL.Functions.UserFunctions();
        private IUserRole _ROLEfunction = new SysProAssess.DAL.Functions.UserRoleFunctions();
        private ITasks _Taskfunction = new SysProAssess.DAL.Functions.TaskFunctions();
        private IUserTask _function = new SysProAssess.DAL.Functions.UserTaskFunction();

        public async Task<List<MODELS.UserTask>> GetAllUserTasks(Guid UID, DateTime SelectedDate)
        {
            List<MODELS.UserTask> _roles = await _function.GetAllTasks(UID, SelectedDate);
            return _roles;
        }

        public async Task<List<MODELS.UserTask>> GetAllUserTasks(DateTime startDate, DateTime endDate)
        {
            List<MODELS.UserTask> _list = await _function.GetAllTasks(startDate, endDate);
            return _list;
        }

        public async Task<Boolean> AddUserTask(MODELS.UserTask newTask)
        {
            newTask.Id = Guid.NewGuid();

            var UserSelected = await _userfunction.GetUser(newTask.UserID);
            newTask.UserRoleID = UserSelected.RoleID;

            var roleSelected = await _ROLEfunction.GetRole(UserSelected.RoleID);
            newTask.UserRoleName = roleSelected.RoleName;
            newTask.HourlyRoleRate = roleSelected.RoleRate;

            var taskSelected = await _Taskfunction.GetTask(newTask.TaskID);
            newTask.TaskName = taskSelected.Name;

            try
            {
                var result = await _function.AddUserTask(newTask);
                if (result.Id != Guid.Empty)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
