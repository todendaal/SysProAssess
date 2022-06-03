using Microsoft.EntityFrameworkCore;
using SysPro.DAL.DataConfig;
using SysProAssess.MODELS;

namespace SysProAssess.DAL.DataConfig
{
    public class DatabaseContext : DbContext
    {
        public class OptionsBuild
        {
            public OptionsBuild()
            {
                settings = new AppConfiguration();
                opsBuilder = new DbContextOptionsBuilder<DatabaseContext>();
                opsBuilder.UseSqlServer(settings.sqlConnectionString);
                dbOptions = opsBuilder.Options;
            }
            public DbContextOptionsBuilder<DatabaseContext> opsBuilder { get; set; }
            public DbContextOptions<DatabaseContext> dbOptions { get; set; }
            private AppConfiguration settings { get; set; }
        }
        public static OptionsBuild ops = new OptionsBuild();

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) {}

        
        public DbSet<UserRole> Roles { get; set; }
        public DbSet<UserStatus> Status { get; set; }
        public DbSet<WorkTask> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserTask> UserTasks { get; set; }
    }
}
