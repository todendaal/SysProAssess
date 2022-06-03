using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SysProAssess.BLL.UserLogic;
using SysProAssess.MODELS;

namespace SysProAssess.API.Controllers
{
    [Route("api/users/")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserLogic _userlogic = new UserLogic();

        [Route("add")]
        [HttpGet]
        public async Task<Boolean> AddUser(User _newUser)
        {
            bool result = _userlogic.AddUser(_newUser).Result;
            return result;
        }

        [Route("addnewuser")]
        [HttpPost]
        public async Task<Boolean> addnewuser([FromBody] User _newUser)
        {
            _newUser.Id = Guid.NewGuid();
            bool result = _userlogic.AddUser(_newUser).Result;
            return result;
        }

        [Route("update")]
        [HttpPost]
        public async Task<Boolean> Update([FromBody] User _newUser)
        {
            bool result = _userlogic.UpdateUser(_newUser).Result;
            return result;
        }

        [Route("allusers")]
        [HttpGet]
        public async Task<List<User>> GetAllUsers()
        {
            var _users = await _userlogic.GetAllUsers();
            return _users;
        }

        [Route("dismissuser")]
        [HttpPost]
        public async Task<Boolean> DismissUser(User _newUser)
        {
            bool result = _userlogic.DismissUser(_newUser).Result;
            return result;
        }
    }
}
