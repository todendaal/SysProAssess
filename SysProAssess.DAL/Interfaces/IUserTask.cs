using SysProAssess.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SysProAssess.DAL.Interfaces
{
    public interface IUserTask
    {
        Task<UserTask> AddUserTask(UserTask newUserTask);
        Task<List<UserTask>> GetAllTasks(Guid UserID, DateTime SelectedDate);
        Task<List<UserTask>> GetAllTasks(DateTime startDate, DateTime endDate);
    }
}
