using SysProAssess.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SysProAssess.DAL.Interfaces
{
    public interface IUserStatus
    {
        Task<List<UserStatus>> GetAllStatus();
        Task<UserStatus> AddStatus(UserStatus newStatus);
    }
}
