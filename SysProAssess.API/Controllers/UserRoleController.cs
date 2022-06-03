using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SysProAssess.BLL.UserRoles;
using SysProAssess.MODELS;

namespace SysProAssess.API.Controllers
{  
    [Route("api/userroles/")]
    [ApiController]
    public class UserRoleController : ControllerBase
    {
        private UserRoleLogic _logic = new UserRoleLogic();

        [Route("allroles")]
        [HttpGet]
        public async Task<List<UserRole>> GetAllRoles()
        {
            var _list = await _logic.GetAllRoles();
            return _list;
        }

        [Route("addnewrole")]
        [HttpPost]
        public async Task<Boolean> addnewrole([FromBody] UserRole _new)
        {
            _new.Id = Guid.NewGuid();
            bool result = _logic.AddRole(_new).Result;
            return result;
        }

        [Route("update")]
        [HttpPost]
        public async Task<Boolean> Update([FromBody] UserRole _newRole)
        {
            bool result = _logic.UpdateRole(_newRole).Result;
            return result;
        }
    }


   
}
