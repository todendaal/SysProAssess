using SysProAssess.DAL.Interfaces;
using SysProAssess.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SysProAssess.BLL.UserLogic
{
    public class UserLogic
    {
        private IUser _user = new SysProAssess.DAL.Functions.UserFunctions();
        private IUserRole _userrole = new SysProAssess.DAL.Functions.UserRoleFunctions();
        private IUserStatus _userstatus = new SysProAssess.DAL.Functions.UserStatusFunction();



        public async Task<Boolean> AddUser(User newUser)
        {
            try
            {
                var allroles = await _userrole.GetAllRoles();
                var allStatus = await _userstatus.GetAllStatus();

                //newUser.RoleID = allroles.FirstOrDefault().Id;
                newUser.StatusId = allStatus.FirstOrDefault().Id;

                if (newUser.RoleID != Guid.Empty)
                {
                    newUser.RoleName = allroles.Where(itm => itm.Id== newUser.RoleID).FirstOrDefault().RoleName;
                }

                if (newUser.StatusId != Guid.Empty)
                {
                    newUser.StatusName = allStatus.Where(itm => itm.Id == newUser.StatusId).FirstOrDefault().Name;
                }

                var result = await _user.AddUser(newUser);
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

        public async Task<Boolean> UpdateUser(User newUser)
        {
            try
            {
                var result = await _user.UpdatetUser(newUser);
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public async Task<User> getUser(Guid UID)
        {
            User selectedUser = new User();
            try
            {
                selectedUser = await _user.GetUser(UID);
                return selectedUser;
            }
            catch (Exception ex)
            {
                return selectedUser;
            }
        }

        public async Task<Boolean> DismissUser(User newUser)
        {
            try
            {
                IUserStatus _function2 = new SysProAssess.DAL.Functions.UserStatusFunction();
                List<MODELS.UserStatus> statuslist = await _function2.GetAllStatus();

                newUser.StatusId = statuslist.Where(itm => itm.OrderID == 100).FirstOrDefault().Id;
                newUser.StatusDate = DateTime.Now;

                var result = await _user.DismissUser(newUser);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

            public async Task<List<User>> GetAllUsers()
        {
            List<User> _users = await _user.GetAllUsers();
            if (_users.Count == 0)
            {
                IUserRole _function = new SysProAssess.DAL.Functions.UserRoleFunctions();
                List<UserRole> rolelist = await _function.GetAllRoles();
                IUserStatus _function2 = new SysProAssess.DAL.Functions.UserStatusFunction();
                List<MODELS.UserStatus> statuslist = await _function2.GetAllStatus();
                User u1 = new User
                {
                    Id = Guid.NewGuid(),
                    FirstName = "John",
                    LastName = "Smith",
                    IDNumber = "8656271625345",
                    StatusDate = DateTime.Now,
                    DateOfBirth = DateTime.Parse("5/23/1986"),
                    ProfilePicURL = "",
                    RoleID = rolelist.First().Id,
                    StatusId = statuslist.Where(itm => itm.OrderID == 1).First().Id
                };
                await _user.AddUser(u1);
                User u2 = new User
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Sam",
                    LastName = "Mayer",
                    IDNumber = "8936524364321",
                    StatusDate = DateTime.Now,
                    DateOfBirth = DateTime.Parse("2/13/1989"),
                    ProfilePicURL = "",
                    RoleID = rolelist.First().Id,
                    StatusId = statuslist.Where(itm => itm.OrderID == 1).First().Id
                };
                await _user.AddUser(u2);
                User u3 = new User
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Tiaan",
                    LastName = "Odendaal",
                    IDNumber = "7212305059085",
                    StatusDate = DateTime.Now,
                    DateOfBirth = DateTime.Parse("12/30/1972"),
                    ProfilePicURL = "",
                    RoleID = rolelist.First().Id,
                    StatusId = statuslist.Where(itm => itm.OrderID == 1).First().Id
                };
                await _user.AddUser(u3);
            }
            return _users.OrderBy(itm => itm.LastName).ToList();
        }
    }
}
