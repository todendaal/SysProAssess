using SysProAssess.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SysProAssess.DAL.Interfaces
{
    public interface IUserRole
    {
        Task<List<UserRole>> GetAllRoles();
        Task<UserRole> AddRole(UserRole newRole);
        Task<UserRole> UpdateRole(UserRole editRole);
        Task<UserRole> GetRole(Guid RoleID);
    }
}
