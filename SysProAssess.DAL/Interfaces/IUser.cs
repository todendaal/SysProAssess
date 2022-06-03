using SysProAssess.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SysProAssess.DAL.Interfaces
{
    public interface IUser
    {
        Task<User> AddUser(User newUser);
        Task<List<User>> GetAllUsers();
        Task<User> UpdatetUser(User editUser);
        Task<User> DismissUser(User editUser);
        Task<User> GetUser(Guid UID);
    }
}
