using SysProAssess.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SysProAssess.DAL.Interfaces
{
    public interface ITasks
    {
        Task<WorkTask> AddTask(WorkTask newTask);
        Task<List<WorkTask>> GetAllTasks();
        Task<WorkTask> UpdateTask(WorkTask editTask);
        Task<WorkTask> GetTask(Guid TaskID);
    }
}
