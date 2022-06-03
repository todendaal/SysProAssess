using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SysProAssess.BLL.UserTask;
using SysProAssess.MODELS;

namespace SysProAssess.API.Controllers
{
    [Route("api/userworktask")]
    [ApiController]
    public class UserWorkTaskController : ControllerBase
    {
        private UserTaskLogic _logic = new UserTaskLogic();

        [Route("addnewusertask")]
        [HttpPost]
        public async Task<Boolean> addnewtask([FromBody] UserTask _new)
        {
            _new.Id = Guid.NewGuid();
            bool result = _logic.AddUserTask(_new).Result;
            return result;
        }

        [Route("allusertasks/{UID}/{selectedDate}")]
        [HttpGet]
        public async Task<List<UserTask>> allusertasks(Guid UID, DateTime selectedDate)
        {
            List<UserTask> result = _logic.GetAllUserTasks(UID, selectedDate).Result;
            return result;
        }
    }
}
