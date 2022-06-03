using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SysProAssess.BLL.UserRoles;
using SysProAssess.BLL.UserStatus;
using SysProAssess.MODELS;

namespace SysProAssess.API.Controllers
{
    [Route("api/userstatus/")]
    [ApiController]
    public class UserStatusController : ControllerBase
    {
        private UserStatusLogic _logic = new UserStatusLogic();

        [Route("allstatus")]
        [HttpGet]
        public async Task<List<UserStatus>> GetAllStatus()
        {
            var _list = await _logic.GetAllStatus();
            return _list;
        }
    }
}
