using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SysProAssess.BLL.Tasks;
using SysProAssess.MODELS;

namespace SysProAssess.API.Controllers
{
    [Route("api/worktasks")]
    [ApiController]
    public class WorkTaskController : ControllerBase
    {
        private TasksLogic _logic = new TasksLogic();

        [Route("alltasks")]
        [HttpGet]
        public async Task<List<WorkTask>> GetAllTasks()
        {
            var _list = await _logic.GetAllWorkTasks();
            return _list;
        }

        [Route("addnewtask")]
        [HttpPost]
        public async Task<Boolean> addnewtask([FromBody] WorkTask _new)
        {
            _new.Id = Guid.NewGuid();
            bool result = _logic.AddWorkTask(_new).Result;
            return result;
        }

        [Route("update")]
        [HttpPost]
        public async Task<Boolean> Update([FromBody] WorkTask _new)
        {
            bool result = _logic.UpdateWorkTask(_new).Result;
            return result;
        }
    }
}
