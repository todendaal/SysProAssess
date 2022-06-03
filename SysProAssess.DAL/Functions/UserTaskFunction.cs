using Microsoft.EntityFrameworkCore;
using SysProAssess.DAL.DataConfig;
using SysProAssess.DAL.Interfaces;
using SysProAssess.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SysProAssess.DAL.Functions
{
    public class UserTaskFunction : IUserTask
    {
        public async Task<UserTask> AddUserTask(UserTask newUserTask)
        {
            //Validate UserTask

            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                await context.UserTasks.AddAsync(newUserTask);
                await context.SaveChangesAsync();
            }
            return newUserTask;
        }

        public async Task<List<UserTask>> GetAllTasks(Guid UserID, DateTime SelectedDate)
        {
            List<UserTask> taskList = new List<UserTask>();
            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                taskList = await context.UserTasks.Where(itm => itm.UserID == UserID && itm.TaskDate== SelectedDate).ToListAsync(); ;
            } 
            return taskList;
        }

        public async Task<List<UserTask>> GetAllTasks(DateTime startDate, DateTime endDate)
        {
            List<UserTask> taskList = new List<UserTask>();
            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                taskList = await context.UserTasks.Where(itm => itm.TaskDate >= startDate && itm.TaskDate <= endDate).ToListAsync(); ;
            }
            return taskList;
        }
    }
}
