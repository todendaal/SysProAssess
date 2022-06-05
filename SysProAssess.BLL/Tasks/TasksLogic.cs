using SysProAssess.DAL.Interfaces;
using SysProAssess.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SysProAssess.BLL.Tasks
{
    public class TasksLogic
    {
        private ITasks _function = new SysProAssess.DAL.Functions.TaskFunctions();

        /// <summary>
        /// Add a new Work Task
        /// </summary>
        /// <param name="newWorkTask"></param>
        /// <returns></returns>
        public async Task<Boolean> AddWorkTask(WorkTask newWorkTask)
        {
            try
            {
                var result = await _function.AddTask(newWorkTask);
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

        /// <summary>
        /// Get every work task in database. Also populates database with items if enpty
        /// </summary>
        /// <returns>List<WorkTask></returns>
        public async Task<List<WorkTask>> GetAllWorkTasks()
        {
            List<WorkTask> _WorkTasks = await _function.GetAllTasks();

            if (_WorkTasks.Count == 0)
            {
                WorkTask WorkTask1 = new WorkTask { Id = Guid.NewGuid(), Name = "Cooking" };
                await _function.AddTask(WorkTask1);
                WorkTask WorkTask2 = new WorkTask { Id = Guid.NewGuid(), Name = "Gardening" };
                await _function.AddTask(WorkTask2);
                WorkTask WorkTask3 = new WorkTask { Id = Guid.NewGuid(), Name = "Accounting" };
                await _function.AddTask(WorkTask3);
                WorkTask WorkTask4 = new WorkTask { Id = Guid.NewGuid(), Name = "Developing" };
                await _function.AddTask(WorkTask4);
            }

            return _WorkTasks;
        }

        public async Task<Boolean> UpdateWorkTask(WorkTask newItem)
        {
            try
            {
            var result = await _function.UpdateTask(newItem);
            return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
