using SysProAssess.DAL.Interfaces;
using SysProAssess.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SysProAssess.BLL.UserRoles
{
    public class UserRoleLogic
    {
        private IUserRole _function = new SysProAssess.DAL.Functions.UserRoleFunctions();

        public async Task<Boolean> AddRole(UserRole newRole)
        {
            try
            {
                var result = await _function.AddRole(newRole);
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

        public async Task<List<UserRole>> GetAllRoles()
        {
            List<UserRole> _roles = await _function.GetAllRoles();

            if (_roles.Count == 0)
            {
                UserRole role1 = new UserRole{Id = Guid.NewGuid(),RoleName = "Junior Intern",RoleRate = 100m};
                await _function.AddRole(role1);
                UserRole role2 = new UserRole{Id = Guid.NewGuid(),RoleName = "Intern",RoleRate = 150m};
                await _function.AddRole(role2);
                UserRole role3 = new UserRole { Id = Guid.NewGuid(), RoleName = "Senior Intern", RoleRate = 200m };
                await _function.AddRole(role3);
            }

            return _roles;
        }

        public async Task<Boolean> UpdateRole(UserRole newItem)
        {
            //try
            //{
                var result = await _function.UpdateRole(newItem);
                return true;
            //}
            //catch (Exception ex)
            //{
            //    return false;
            //}
        }
    }
}
