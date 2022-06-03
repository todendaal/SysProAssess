using SysProAssess.DAL.Interfaces;
using SysProAssess.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SysProAssess.BLL.UserStatus
{
    public class UserStatusLogic
    {
        private IUserStatus _function = new SysProAssess.DAL.Functions.UserStatusFunction();

        public async Task<Boolean> AddStatus(MODELS.UserStatus newStatus)
        {
            try
            {
                var result = await _function.AddStatus(newStatus);
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

        public async Task<List<MODELS.UserStatus>> GetAllStatus()
        {
            List<MODELS.UserStatus> _status = await _function.GetAllStatus();

            if(_status.Count==0)
            {
                MODELS.UserStatus itm1 = new MODELS.UserStatus { Id = Guid.NewGuid(), Name = "New", OrderID = 1 };
                await _function.AddStatus(itm1);
                MODELS.UserStatus itm2 = new MODELS.UserStatus { Id = Guid.NewGuid(), Name = "Resigned", OrderID = 100 };
                await _function.AddStatus(itm2);
            }
            return _status;
        }
    }
}
