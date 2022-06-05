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

            //set the status to new user. With more logic this will be better to do dynamically but for now 
            newUser.StatusId = Guid.Parse("93E302D9-D8E9-4934-ADC1-A3C640762148");


            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                await context.Users.AddAsync(newUser);
                await context.SaveChangesAsync();
            }
            return newUser;
        }

        /// <summary>
        /// Get All the users 
        /// </summary>
        /// <returns>List<User></returns>
        public async Task<List<User>> GetAllUsers()
        {
            List<User> userList = new List<User>();
            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                userList = await context.Users.ToListAsync();
            }
            return userList;
        }

        /// <summary>
        /// Get a specific user by ID
        /// </summary>
        /// <param name="UID"></param>
        /// <returns>Return the correct user model</returns>
        public async Task<User> GetUser(Guid UID)
        {
            User userSelected = new User();
            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                userSelected = context.Users.First(itm => itm.Id == UID);
            }
            return userSelected;
        }

        /// <summary>
        /// Get a specific user by specific User Model. I use this as I inkect some models from the javascript
        /// </summary>
        /// <param name="editUser"></param>
        /// <returns>Return the correct complete user model</returns>
        public async Task<User> GetUser(User editUser)
        {
            User userSelected = new User();
            using (var context = new DatabaseContext(DatabaseContext.ops.dbOptions))
            {
                userSelected = context.Users.First(itm => itm.Id == editUser.Id);
            }
            return userSelected;
        }

        /// <summary>
        /// Update the User data
        /// </summary>
        /// <param name="editUser"></param>
        /// <returns>Return the correct complete user model</returns>
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

        /// <summary>
        /// This is used to dismiss a user
        /// </summary>
        /// <param name="editUser"></param>
        /// <returns></returns>
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
