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
    public class UserFunctions : IUser
    {
        public async Task<User> AddUser(User newUser)
        {
            //Validate USER

            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                await context.Users.AddAsync(newUser);
                await context.SaveChangesAsync();
            }
            return newUser;
        }

        public async Task<List<User>> GetAllUsers()
        {
            List<User> userList = new List<User>();
            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                userList = await context.Users.ToListAsync();
            }
            return userList;
        }

        public async Task<User> GetUser(Guid UID)
        {
            User userSelected = new User();
            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                userSelected = context.Users.First(itm => itm.Id == UID);
            }
            return userSelected;
        }

        public async Task<User> GetUser(User editUser)
        {
            User userSelected = new User();
            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                userSelected = context.Users.First(itm => itm.Id == editUser.Id);
            }
            return userSelected;
        }

        public async Task<User> UpdatetUser(User editUser)
        {
            //validate USER
            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                var result = context.Users.SingleOrDefault(b => b.Id == editUser.Id);
                result.FirstName = editUser.FirstName;
                result.LastName = editUser.LastName;
                result.RoleID = editUser.RoleID;
                result.IDNumber = editUser.IDNumber;
                result.DateOfBirth = editUser.DateOfBirth;
                context.SaveChanges();
            }
            return editUser;
        }

        public async Task<User> DismissUser(User editUser)
        {
            //validate USER
            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                var result = context.Users.SingleOrDefault(b => b.Id == editUser.Id);
                result.StatusDate = editUser.StatusDate;
                result.StatusId = editUser.StatusId;
                context.SaveChanges();
            }
            return editUser;
        }
    }
}
