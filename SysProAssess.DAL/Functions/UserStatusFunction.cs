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
    public class UserStatusFunction : IUserStatus
    {
        public async Task<List<UserStatus>> GetAllStatus()
        {
            List<UserStatus> statusList = new List<UserStatus>();
            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                statusList = await context.Status.ToListAsync();
            }
            return statusList;
        }

        public async Task<UserStatus> AddStatus(UserStatus newStatus)
        {
            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                await context.Status.AddAsync(newStatus);
                await context.SaveChangesAsync();
            }
            return newStatus;
        }

       
    }
}
