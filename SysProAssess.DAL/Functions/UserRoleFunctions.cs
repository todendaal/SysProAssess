using Microsoft.EntityFrameworkCore;
using SysProAssess.DAL.DataConfig;
using SysProAssess.DAL.Interfaces;
using SysProAssess.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SysProAssess.DAL.Functions
{
    public class UserRoleFunctions : IUserRole
    {
        public async Task<List<UserRole>> GetAllRoles()
        {
            List<UserRole> roleList = new List<UserRole>();
            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                roleList = await context.Roles.ToListAsync();
            }
            return roleList;
        }

        public async Task<UserRole> AddRole(UserRole newRole)
        {
            //Validate Task

            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                await context.Roles.AddAsync(newRole);
                await context.SaveChangesAsync();
            }
            return newRole;
        }

        public async Task<UserRole> UpdateRole(UserRole editRole)
        {
            //validate USER
            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                var result = context.Roles.SingleOrDefault(b => b.Id == editRole.Id);
                result.RoleName = editRole.RoleName;
                result.RoleRate = editRole.RoleRate;
                context.SaveChanges();
            }
            return editRole;
        }

        public async Task<UserRole> GetRole(Guid RoleID)
        {
            UserRole roleSelected = new UserRole();
            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                roleSelected = context.Roles.First(itm => itm.Id == RoleID);
            }
            return roleSelected;
        }
    }
}
