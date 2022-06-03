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
    public class TaskFunctions : ITasks
    {
        public async Task<WorkTask> AddTask(WorkTask newTask)
        {
            //Validate Task

            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                await context.Tasks.AddAsync(newTask);
                await context.SaveChangesAsync();
            }
            return newTask;
        }

        public async Task<List<WorkTask>> GetAllTasks()
        {
            List<WorkTask> taskList = new List<WorkTask>();
            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                taskList = await context.Tasks.ToListAsync();
            }
            return taskList;
        }

        public async Task<WorkTask> UpdateTask(WorkTask editTask)
        {
            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                var result = context.Tasks.SingleOrDefault(b => b.Id == editTask.Id);
                result.Name = editTask.Name;
                context.SaveChanges();
            }
            return editTask;
        }

        public async Task<WorkTask> GetTask(Guid TaskID)
        {
            WorkTask taskSelected = new WorkTask();
            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                taskSelected = context.Tasks.First(itm => itm.Id == TaskID);
            }
            return taskSelected;
        }
    }
}
